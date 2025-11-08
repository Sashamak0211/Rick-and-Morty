export interface IFiltersValue {
  name: string;
  species: string | null;
  gender: string | null;
  status: string | null;
}

export interface IFiltersProps {
  filters: IFiltersValue;
  onChange: (filters: IFiltersValue) => void;
}
