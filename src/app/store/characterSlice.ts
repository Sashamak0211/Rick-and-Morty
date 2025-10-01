import type { ICharacterListProps, IFiltersValue } from "@/Pages/CharacterList";
import { getCharacters } from "@/shared/api/characterApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface CharacterState {
  characters: ICharacterListProps[];
  filters: IFiltersValue
  loading: boolean
  hasMore: boolean
  currentPage: number
  error: string | null
}

const initialState: CharacterState {
  characters: [],
  filters: {name: "", species: null, gender: null, status: null},
  loading: false,
  hasMore: true,
  currentPage: 1,
  error: null,
}

export const loadCharacters = createAsyncThunk(
  "characters/loadCharacters",
  async ({ filters, page}: {filters: IFiltersValue; page: number}, { dispatch }) => {
    dispatch(setLoading(true))
    try {
      const data = await getCharacters({...filters, page})

      if(page === 1) {
        dispatch(setCharacters(data))
      }else {
        dispatch(addCharacters(data))
      }

      dispatch(setHasMore(info.next !== null))
      return data
    } catch(error) {
      console.error("Ошибка при загрузке персонажей", error)
      dispatch(setHasMore(false))
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }
)