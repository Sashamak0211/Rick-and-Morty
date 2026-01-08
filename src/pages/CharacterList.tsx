import { useCallback, useEffect, useTransition } from 'react';

import { useNavigate } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useShallow } from 'zustand/react/shallow';

import { useGetAllCharactersQuery } from '@/app';
import { useCharacterZustand } from '@/app/storeZustand/useCharacterZustand';
import { useFilterStore } from '@/app/storeZustand/useFilterStore';
import { CharacterCard } from '@/entities';
import { FilterPanel, IFiltersValue } from '@/features';
import { Loader, TitleLogo } from '@/shared';

export const CharacterList = () => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const filters = useFilterStore(
    useShallow((state) => ({
      name: state.name,
      gender: state.gender,
      status: state.status,
      species: state.species,
    }))
  );
  const setFilters = useFilterStore((state) => state.setFilters);
  const {
    currentPage,
    characters,
    hasMore,
    setCharacters,
    addCharacters,
    clearCharacter,
    setHasMore,
    setPage,
    updateCharacter,
  } = useCharacterZustand(
    useShallow((state) => ({
      currentPage: state.currentPage,
      characters: state.characters,
      hasMore: state.hasMore,
      setCharacters: state.setCharacters,
      addCharacters: state.addCharacters,
      clearCharacter: state.clearCharacter,
      setHasMore: state.setHasMore,
      setPage: state.setPage,
      updateCharacter: state.updateCharacter,
    }))
  );
  const { data, isFetching, isLoading } = useGetAllCharactersQuery({
    page: currentPage,
    name: filters.name,
    status: filters.status,
    species: filters.species,
    gender: filters.gender,
  });

  useEffect(() => {
    if (!data?.results) return;
    if (currentPage == 1) setCharacters(data.results);
    else addCharacters(data.results);
    setHasMore(Boolean(data.info?.next));
  }, [data, currentPage, setCharacters, addCharacters, setHasMore]);

  const handleFilterChange = useCallback(
    (newFilter: IFiltersValue) => {
      startTransition(() => {
        setFilters(newFilter);
        clearCharacter();
        setPage(1);
        setHasMore(true);
      });
    },

    [setFilters, clearCharacter, setHasMore, setPage]
  );

  const loadMore = () => {
    if (isFetching || !hasMore) return;
    setPage(currentPage + 1);
  };

  const handleUpdateCharacter = (
    id: number,
    name: string,
    location: string,
    status: string
  ) => {
    updateCharacter({ id, name, location, status });
  };

  return (
    <>
      <TitleLogo />
      <div className="character-list-container">
        <FilterPanel filters={filters} onChange={handleFilterChange} />

        {isPending || isLoading ? (
          <Loader />
        ) : (
          <InfiniteScroll
            dataLength={characters.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<Loader size="small" />}
            endMessage={<p>Все персонажи загружены.</p>}
            style={{ overflow: 'hidden' }}
          >
            <div className="cards-container">
              {characters.map((char) => (
                <CharacterCard
                  key={char.id}
                  character={char}
                  onClick={() => navigate(`/character/${char.id}`)}
                  onSave={handleUpdateCharacter}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};
