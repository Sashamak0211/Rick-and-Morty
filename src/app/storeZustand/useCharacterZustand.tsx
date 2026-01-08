import { create } from 'zustand';

import { ICharacter } from '@/entities';
import { IFiltersValue } from '@/features';

interface CharacterState {
  characters: ICharacter[];
  filters: IFiltersValue;
  currentPage: number;
  hasMore: boolean;
}

type CharacterAction = {
  setCharacters: (list: ICharacter[]) => void;
  addCharacters: (list: ICharacter[]) => void;
  clearCharacter: () => void;
  setPage: (page: number) => void;
  setHasMore: (value: boolean) => void;
  updateCharacter: (payload: {
    id: number;
    name: string;
    location: string;
    status: string;
  }) => void;
};

export type CharacterStore = CharacterState & CharacterAction;

const initialState: CharacterState = {
  characters: [],
  filters: { name: '', species: null, status: null, gender: null },
  currentPage: 1,
  hasMore: true,
};

export const useCharacterZustand = create<CharacterStore>((set) => ({
  ...initialState,
  setCharacters: (list) => set({ characters: list }),

  addCharacters: (list) =>
    set((state) => {
      const ids = new Set(state.characters.map((c) => c.id));
      const merged = list.filter((c) => !ids.has(c.id));
      return { characters: [...state.characters, ...merged] };
    }),
  clearCharacter: () =>
    set((state) => ({
      ...state,
      characters: [],
      currentPage: 1,
    })),
  setPage: (page) => set({ currentPage: page }),
  setHasMore: (value) => set({ hasMore: value }),
  updateCharacter: ({ id, name, location, status }) =>
    set((state) => ({
      characters: state.characters.map((character) =>
        character.id === id
          ? { ...character, name, location, status }
          : character
      ),
    })),
}));
