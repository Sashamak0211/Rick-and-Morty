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
    setFiltersAndPage: (state, action: PayloadAction<IFiltersValue>) => {
      state.filters = action.payload;
      state.currentPage = 1;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
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
  extraReducers: (builder) => {
    builder
      .addCase(loadCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
        state.hasMore = false;
      })
      .addCase(loadCharacters.fulfilled, (state, action) => {
        state.loading = false;
        const { characters, page } = action.payload;

        if (page === 1) {
          state.characters = characters;
        } else {
          state.characters.push(...characters);
        }
        state.hasMore = characters.length === 20;
        state.currentPage = page;
      });
  },
});

export const {
  setCharacters,
  addCharacters,
  setHasMore,
  setLoading,
  setFiltersAndPage,
  updateCharacter,
} = charactersSlice.actions;
export default charactersSlice.reducer;
