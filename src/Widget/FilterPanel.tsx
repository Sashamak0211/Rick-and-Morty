import { useEffect, useState } from "react";

import { TextField } from "@Components/FilterInput/TextField";
import { Selector } from "@Components/Selector/Selector";
import {
  SelectorDot,
  type StatusesType,
} from "@Components/Selector/Selector_dot";

interface IFiltersValue {
  name: string;
  species: string | null;
  gender: string | null;
  status: string | null;
}
interface IFiltersProps {
  filters: IFiltersValue;
  onChange: (filters: IFiltersValue) => void;
}

export const FilterPanel = ({ filters, onChange }: IFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<IFiltersValue>(filters);

  useEffect(() => {
    if (
      localFilters.name !== filters.name ||
      localFilters.species !== filters.species ||
      localFilters.gender !== filters.gender ||
      localFilters.status !== filters.status
    ) {
      onChange(localFilters);
    }
  }, [localFilters, filters, onChange]);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const changeLocalFilters = (update: Partial<IFiltersValue>) => {
    setLocalFilters((prev) => ({ ...prev, ...update }));
  };

  const statusOptions = [
    { value: "alive", label: "Alive", color: "#12B800" },
    { value: "dead", label: "Dead", color: "#DF0000" },
    { value: "unknown", label: "Unknown", color: "#FF9900" },
  ];

  const speciesOptions = [
    { value: "Human", label: "Human" },
    { value: "Alien", label: "Alien" },
    { value: "Humanoid", label: "Humanoid" },
    { value: "Animal", label: "Animal" },
    { value: "Robot", label: "Robot" },
    { value: "Cronenberg", label: "Cronenberg" },
    { value: "Mythology", label: "Mythology" },
    { value: "Disease", label: "Disease" },
    { value: "Unknown", label: "Unknown" },
  ];

  const genderOptions = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "genderless", label: "Genderless" },
    { value: "unknown", label: "Unknown" },
  ];

  return (
    <div className="filter-panel">
      <TextField
        value={localFilters.name}
        onChange={(value) => changeLocalFilters({ name: value })}
        placeholder="Filter by name"
        variant="default"
      />
      <Selector
        options={speciesOptions}
        value={localFilters.species}
        onChange={(value) => changeLocalFilters({ species: value })}
        placeholder="Species"
        size="large"
      />
      <Selector
        options={genderOptions}
        value={localFilters.gender}
        onChange={(value) => changeLocalFilters({ gender: value })}
        placeholder="Gender"
        size="large"
      />
      <Selector
        options={statusOptions}
        value={localFilters.status}
        onChange={(value) => changeLocalFilters({ status: value })}
        placeholder="Status"
        size="large"
        OptionContentComponent={({ value }) => (
          <>
            {value}
            <SelectorDot status={value as StatusesType} />
          </>
        )}
      />
    </div>
  );
};
