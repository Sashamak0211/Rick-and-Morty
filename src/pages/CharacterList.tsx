import { useCallback, useTransition } from 'react';

import { useNavigate } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useShallow } from 'zustand/react/shallow';

import { useCharacterInfinityQuery } from '@/app/query/useCharactersInfinityQuery';
import { useCharacterZustand } from '@/app/storeZustand/useCharacterZustand';
import { useFilterStore } from '@/app/storeZustand/useFilterStore';
import { CharacterCard, ICharacter } from '@/entities';
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
  const { updateCharacter } = useCharacterZustand(
    useShallow((state) => ({
      updateCharacter: state.updateCharacter,
    }))
  );

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCharacterInfinityQuery(filters);
  const characters =
    data?.pages.reduce<ICharacter[]>((acc, page) => {
      acc.push(...page);
      return acc;
    }, []) ?? [];
  const hasMore = Boolean(hasNextPage);
  const loadMore = () => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }
    fetchNextPage();
  };

  const handleFilterChange = useCallback(
    (newFilter: IFiltersValue) => {
      startTransition(() => {
        setFilters(newFilter);
      });
    },

    [setFilters]
  );

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
