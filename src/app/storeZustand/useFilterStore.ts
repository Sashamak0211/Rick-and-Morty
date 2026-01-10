import { create } from 'zustand';

import { IFiltersValue } from '@/features';

type FilterStore = IFiltersValue & {
  setFilters: (value: IFiltersValue) => void;
};

const initial: IFiltersValue = {
  name: '',
  species: null,
  gender: null,
  status: null,
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...initial,
  setFilters: (value) => set(value),
}));
