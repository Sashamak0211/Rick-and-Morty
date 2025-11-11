import { useCallback, useEffect, useTransition } from 'react';

import { useNavigate } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/app/hooks';
import {
  addCharacters,
  clearCharacters,
  setCharacters,
  setFilters,
  setHasMore,
  setPage,
} from '@/app/store/characterSlice';
import { RootState } from '@/app/store/store';
import { useGetAllCharactersQuery } from '@/app/store/useCharactersStore';
import { CharacterCard } from '@/entities';
import { FilterPanel, IFiltersValue } from '@/features';
import { Loader, TitleLogo } from '@/shared';

export const CharacterList = () => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const dispatch = useAppDispatch();

  const { filters, currentPage, characters, hasMore } = useSelector(
    (state: RootState) => state.characters
  );

  const { data, isFetching, isLoading } = useGetAllCharactersQuery({
    page: currentPage,
    name: filters.name,
    status: filters.status,
    species: filters.species,
    gender: filters.gender,
  });
  useEffect(() => {
    if (data?.results) {
      if (currentPage === 1) {
        dispatch(setCharacters(data.results));
      } else {
        dispatch(addCharacters(data.results));
      }
      dispatch(setHasMore(Boolean(data.info.next)));
    }
  }, [data, currentPage, dispatch]);

  const handleFilterChange = useCallback(
    (newFilter: IFiltersValue) => {
      startTransition(() => {
        dispatch(setFilters(newFilter));
        dispatch(clearCharacters());
      });
    },
    [dispatch]
  );


  const loadMore = () => {
    if (isFetching || !hasMore) return;
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
            endMessage={<p>Все персонажи загружены.</p>}
            style={{ overflow: 'hidden' }}
          >
            <div className="cards-container">
              {characters.map((char) => (
                <CharacterCard
                  key={char.id}
                  character={char}
                  onClick={() => navigate(`/character/${char.id}`)}
                   onSave={() => {}}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};
