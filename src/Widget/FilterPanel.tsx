import { useState } from "react";
import { TextField } from "../Components/FilterInput/TextField";
import { Selector } from "../Components/Selector/Selector";

interface IFiltersValue {
  name: string;
  species: string | null;
  gender: string | null;
  status: string | null;
}
interface IFiltersProps {
  onChange: (filters: IFiltersValue) => void;
}

export const FilterPanel = ({ onChange }: IFiltersProps) => {
  const [filters, setFilters] = useState<IFiltersValue>({
    name: "",

    species: null,
    gender: null,
    status: null,
  });

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

  const handleNameChange = (value: string) => {
    const newFilters = { ...filters, name: value };
    setFilters(newFilters);
    onChange(newFilters);
  };
  const createHandler =
    (key: "species" | "gender" | "status") => (value: string | null) => {
      const newFilters = { ...filters, [key]: value };
      setFilters(newFilters);
      onChange(newFilters);
    };

  return (
    <div className="filter-panel">
      <TextField
        value={filters.name}
        onChange={handleNameChange}
        placeholder="Filter by name"
        variant="default"
      />
      <Selector
        options={speciesOptions}
        value={filters.species}
        onChange={createHandler("species")}
        placeholder="Species"
        size="large"
      />
      <Selector
        options={genderOptions}
        value={filters.gender}
        onChange={createHandler("gender")}
        placeholder="Gender"
        size="large"
      />
      <Selector
        options={statusOptions}
        value={filters.status}
        onChange={createHandler("status")}
        placeholder="Status"
        size="large"
      />
    </div>
  );
};
