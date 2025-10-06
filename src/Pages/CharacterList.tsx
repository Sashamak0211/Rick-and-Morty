import { useCallback, useEffect, useTransition } from "react";

import { useNavigate } from "react-router-dom";

import { Loader } from "@Components/Loader/Loader";
import { TitleLogo } from "@Components/TitleLogo/TitleLogo";
import { CharacterCard } from "@Widget/CharactersCard";
import { FilterPanel } from "@Widget/FilterPanel";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

import { useAppDispatch } from "@/app/hooks/dispatch";
import {
  loadCharacters,
  setFiltersAndPage,
  updateCharacter,
} from "@/app/store/characterSlice";
import type { RootState } from "@/app/store/store";

export interface IFiltersValue {
  name: string;
  species: string | null;
  gender: string | null;
  status: string | null;
}
export interface ICharacterListProps {
  id: number;
  name: string;
  gender: string;
  species: string;
  location: string;
  origin?: {
    name: string;
  };
  status: string;
  imageSrc: string;
  imageAlt: string;
  type?: string;
}

export const CharacterList = () => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const dispatch = useAppDispatch();
  const { characters, hasMore, filters, loading, currentPage } = useSelector(
    (state: RootState) => state.characters
  );

  const handleFilterChange = useCallback(
    (newFilter: IFiltersValue) => {
      startTransition(() => {
        dispatch(setFiltersAndPage(newFilter));
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

  const loadMore = async () => {
    if (!hasMore || loading) return;

    dispatch(loadCharacters({ filters, page: currentPage + 1 }));
  };

  useEffect(() => {
    dispatch(loadCharacters({ filters, page: 1 }));
  }, [filters, dispatch]);

  return (
    <>
      <TitleLogo />
      <div className="character-list-container">
        <FilterPanel filters={filters} onChange={handleFilterChange} />
        {isPending ? (
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
