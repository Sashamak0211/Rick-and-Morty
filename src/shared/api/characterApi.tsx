import apiClient from "./apiClient";
import type { CharacterStatus, ICharacterListProps } from "./types/types";

export interface IApiCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  location: { name: string; url: string };
  image: string;
}

export interface IApiCharacterResponse {
  results: IApiCharacter[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}

export const mapperCallback = (
  characters: IApiCharacter[]
): ICharacterListProps[] => {
  return characters.map((character) => ({
    id: character.id,
    name: character.name,
    gender: character.gender,
    species: character.species,
    location: character.location.name,
    status: character.status as CharacterStatus,
    imageSrc: character.image,
    imageAlt: character.name,
  }));
};

export const getCharacters = async (
  params = {}
): Promise<ICharacterListProps[]> => {
  try {
    const response = await apiClient.get<IApiCharacterResponse>("/character", {
      params,
    });
    return mapperCallback(response.data.results);
  } catch (error) {
    console.error("Данные не получены", error);
    return [];
  }
};
