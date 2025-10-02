import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { ICharacterListProps, IFiltersValue } from "@/Pages/CharacterList";
import { getCharacters } from "@/shared/api/characterApi";

interface CharacterState {
  characters: ICharacterListProps[];
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
  async (
    { filters, page }: { filters: IFiltersValue; page: number },
    { dispatch }
  ) => {
    dispatch(setLoading(true));
    try {
      const characters = await getCharacters({
        ...filters,
        page,
      });

      if (page === 1) {
        dispatch(setCharacters(characters));
      } else {
        dispatch(addCharacters(characters));
      }

      dispatch(setHasMore(characters.length === 20));
      return characters;
    } catch (error) {
      console.error("Ошибка при загрузке персонажей", error);
      dispatch(setHasMore(false));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<ICharacterListProps[]>) => {
      state.characters = action.payload;
    },
    addCharacters: (state, action: PayloadAction<ICharacterListProps[]>) => {
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
  setPage,
  setFilters,
  updateCharacter,
} = charactersSlice.actions;
export default charactersSlice.reducer;
