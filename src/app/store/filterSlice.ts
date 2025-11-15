import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { IFiltersValue } from '@/features';

const initialState: IFiltersValue = {
  name: '',
  species: null,
  gender: null,
  status: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<IFiltersValue>) => {
      state.name = action.payload.name;
      state.species = action.payload.species;
      state.gender = action.payload.gender;
      state.status = action.payload.status;
    },
  },
});

export const { setFilters } = filterSlice.actions;

export default filterSlice.reducer;
