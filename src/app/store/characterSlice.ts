import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getCharacters } from "@/shared/api/characterApi";
import type { ICharacter } from "@/shared/types/character";
import type { IFiltersValue } from "@/shared/types/filters";

export interface CharacterState {
  characters: ICharacter[];
  filters: IFiltersValue;
  loading: boolean;
  hasMore: boolean;
  currentPage: number;
  error: string | null;
}

const initialState: CharacterState = {
  characters: [],
  filters: { name: "", species: null, gender: null, status: null },
  loading: false,
  hasMore: true,
  currentPage: 1,
  error: null,
};

export const loadCharacters = createAsyncThunk(
  "characters/loadCharacters",
  async ({ filters, page }: { filters: IFiltersValue; page: number }) => {
    const characters = await getCharacters({ ...filters, page });
    return { characters, page };
  }
);

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<ICharacter[]>) => {
      state.characters = action.payload;
    },
    addCharacters: (state, action: PayloadAction<ICharacter[]>) => {
      state.characters.push(...action.payload);
    },
    setFilters: (state, action: PayloadAction<IFiltersValue>) => {
      state.filters = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
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
  setHasMore,
  setLoading,
  setFilters,
  setPage,
  updateCharacter,
} = charactersSlice.actions;
export default charactersSlice.reducer;
