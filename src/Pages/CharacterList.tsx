import { useCallback, useTransition } from "react";

import { useNavigate } from "react-router-dom";

import { Loader } from "@Components/Loader/Loader";
import { TitleLogo } from "@Components/TitleLogo/TitleLogo";
import { CharacterCard } from "@Widget/CharactersCard";
import { FilterPanel } from "@Widget/FilterPanel";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

import { useAppDispatch } from "@/app/hooks/dispatch";
import {
  setFilters,
  setPage,
  updateCharacter,
} from "@/app/store/characterSlice";
import type { RootState } from "@/app/store/store";
import { useGetAllCharactersQuery } from "@/app/store/useCharactersStore";
import { mapperCallback } from "@/shared/api/characterApi";
import type { IFiltersValue } from "@/shared/types/filters";

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
            style={{ overflow: "hidden" }}
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
