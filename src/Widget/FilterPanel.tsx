import { TextField } from "../Components/FilterInput/TextField";
import { Selector } from "../Components/Selector/Selector";

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

type TFilterKey = "species" | "gender" | "status";

export const FilterPanel = ({ filters, onChange }: IFiltersProps) => {
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

  const onChangeField = (key: TFilterKey, value: string | null) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="filter-panel">
      <TextField
        value={filters.name}
        onChange={(value) => onChange({ ...filters, name: value })}
        placeholder="Filter by name"
        variant="default"
      />
      <Selector
        options={speciesOptions}
        value={filters.species}
        onChange={(value) => onChangeField("species", value)}
        placeholder="Species"
        size="large"
      />
      <Selector
        options={genderOptions}
        value={filters.gender}
        onChange={(value) => onChangeField("gender", value)}
        placeholder="Gender"
        size="large"
      />
      <Selector
        options={statusOptions}
        value={filters.status}
        onChange={(value) => onChangeField("status", value)}
        placeholder="Status"
        size="large"
      />
    </div>
  );
};
