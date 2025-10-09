import type { ICharacter } from "../types/character";

import apiClient from "./apiClient";

export type CharacterStatus = "Alive" | "Dead" | "Unknown";
export type CharacterGender = "Female" | "Male" | "Genderless" | "Unknown";
export type CharacterSpecies =
  | "Human"
  | "Alien"
  | "Humanoid"
  | "Robot"
  | "Cronenberg"
  | "Animal"
  | "Disease"
  | "Mythology"
  | "Unknown";

export interface IApiCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  type: string;
  origin: { name: string; url: string };
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

export const mapperCallback = (characters: IApiCharacter[]): ICharacter[] => {
  return characters.map((character) => ({
    id: character.id,
    name: character.name,
    gender: character.gender,
    species: character.species,
    location: character.location.name,
    status: character.status as CharacterStatus,
    imageSrc: character.image,
    imageAlt: character.name,
    origin: { name: character.origin.name },
    type: character.type,
  }));
};

export const getCharacters = async (params = {}): Promise<ICharacter[]> => {
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

export const getCharacter = async (id: number): Promise<IApiCharacter> => {
  try {
    const response = await apiClient.get<IApiCharacter>(`/character/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Данных с id=${id} нет.`, error);
    throw error;
  }
};
