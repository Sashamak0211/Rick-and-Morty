import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { ICharacter } from '@/entities';
import { IFiltersValue } from '@/features';

export interface CharacterState {
  characters: ICharacter[];
  filters: IFiltersValue;
  currentPage: number;
  hasMore: boolean;
}

const initialState: CharacterState = {
  characters: [],
  filters: { name: '', species: null, gender: null, status: null },
  currentPage: 1,
  hasMore: true,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<ICharacter[]>) => {
      state.characters = action.payload;
    },
    addCharacters: (state, action: PayloadAction<ICharacter[]>) => {
      const ids = new Set(state.characters.map((c) => c.id));
      const merged = action.payload.filter((c) => !ids.has(c.id));
      state.characters.push(...merged);
    },
    clearCharacters: (state) => {
      state.characters = [];
      state.currentPage = 1;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    updateCharacter: (
      state,
      action: PayloadAction<{
        id: number;
        name: string;
        location: string;
        status: string;
      }>
    ) => {
      const { id, name, location, status } = action.payload;
      const character = state.characters.find((char) => char.id === id);

      if (character) {
        character.name = name;
        character.location = location;
        character.status = status;
      }
    },
  },
});

export const {
  setCharacters,
  addCharacters,
  clearCharacters,
  setPage,
  setHasMore,
  updateCharacter,
} = charactersSlice.actions;

export default charactersSlice.reducer;
