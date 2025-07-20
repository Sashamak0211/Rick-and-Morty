import { useEffect, useState } from "react";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

export const CharacterPage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          "https://rickandmortyapi.com/api/character"
        );
        const data = await response.json();
        setCharacters(data.results);
      } catch (error) {
        setError("Ошибка загрузки данных");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCharacters();
  }, []);

  return <div className="characters-page-box"></div>;
};
