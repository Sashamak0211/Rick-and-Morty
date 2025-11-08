import { useCallback, useTransition } from 'react';

import { useNavigate } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';

import {
  type RootState,
  setFilters,
  setPage,
  updateCharacter,
  useAppDispatch,
  useGetAllCharactersQuery,
} from '@/app';
import { CharacterCard } from '@/entities';
import { FilterPanel, type IFiltersValue } from '@/features';
import { Loader, mapperCallback, TitleLogo } from '@/shared';

export const CharacterList = () => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const dispatch = useAppDispatch();
  const { filters, currentPage } = useSelector(
    (state: RootState) => state.characters
  );

  const { data, isLoading } = useGetAllCharactersQuery({
    page: currentPage,
    name: filters.name,
    status: filters.status,
    species: filters.species,
    gender: filters.gender,
  });

  const characters = data ? mapperCallback(data.results) : [];
  const hasMore = !!data?.info.next;

  const handleFilterChange = useCallback(
    (newFilter: IFiltersValue) => {
      startTransition(() => {
        dispatch(setFilters(newFilter));
      });
    },
    [dispatch]
  );

  const handleSaveEdit = useCallback(
    (id: number, newName: string, newLocation: string, newStatus: string) => {
      dispatch(
        updateCharacter({
          id,
          name: newName,
          location: newLocation,
          status: newStatus,
        })
      );
    },
    [dispatch]
  );

  const loadMore = () => {
    if (isLoading || !hasMore) return;

    dispatch(setPage(currentPage + 1));
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
            endMessage={<p>Все персонажи загруженны.</p>}
            style={{ overflow: 'hidden' }}
          >
            <div className="cards-container">
              {characters.map((char) => (
                <CharacterCard
                  key={char.id}
                  character={char}
                  onSave={handleSaveEdit}
                  onClick={() => navigate(`/character/${char.id}`)}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};
