import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilterPanel } from "../Widget/FilterPanel";
import { getCharacters } from "../shared/api/characterApi";
import type { ICharacterListProps } from "../shared/api/types/types";
import { Loader } from "../Components/Loader/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { CharacterCard } from "../Widget/CharactersCard";

interface IFiltersValue {
  name: string;
  species: string | null;
  gender: string | null;
  status: string | null;
}

export const CharacterList = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState<IFiltersValue>({
    name: "",
    species: null,
    gender: null,
    status: null,
  });

  const [characters, setCharacters] = useState<ICharacterListProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const data = await getCharacters({
        ...filters,
        page,
      });
      const mapped = data;
      setCharacters((prev) => [...prev, ...mapped]);
      setHasMore(mapped.length > 0);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Ошибка при подгрузке", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      try {
        const data = await getCharacters({ ...filters, page: 1 });
        setCharacters(data);
        setHasMore(data.length > 0);
        setPage(2);
      } catch (error) {
        console.error("Не удалось загрузить персонажей", error);
        setCharacters([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, [filters]);

  return (
    <div className="character-list-container">
      <FilterPanel filters={filters} onChange={setFilters} />
      <InfiniteScroll
        dataLength={characters.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={<p>Все персонажи загруженны.</p>}
        style={{ overflow: "hidden" }}
      >
        <div className="cards-container">
          {characters.map((char) => (
            <CharacterCard
              key={char.id}
              character={char}
              onSave={() => {}}
              onClick={(id) => navigate(`/character/${id}`)}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
