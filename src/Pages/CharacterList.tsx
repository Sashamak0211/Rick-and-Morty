import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Selector } from "../Components/Selector/Selector";
import { TextField } from "../Components/FilterInput/TextField";
import { FilterPanel } from "../Widget/FilterPanel";
import classNames from "classnames";
import { ActionButton } from "../Components/ActionButton/ActionButton";

interface IFiltersValue {
  name: string;
  species: string | null;
  gender: string | null;
  status: string | null;
}

export const CharacterList = () => {
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentLocation, setCurrentLocation] = useState("Earth");
  const [currentStatus, setCurrentStatus] = useState("alive");
  const [gender, setGender] = useState("Male");
  const [species, setSpecies] = useState("Human");

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

  const cardIds = [1, 2, 3, 4];

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleSave = () => {
    setEditingId(null);
  };

  const handleNameClick = (id: number) => {
    if (editingId !== id) {
      navigate(`/character/${id}`);
    }
  };

  const getStatusLabel = (value: string) => {
    return (
      statusOptions.find((status) => status.value === value) || {
        label: value,
        color: "#999",
      }
    );
  };
  const handleFiltersChange = (newFilters: IFiltersValue) => {
    setFilters(newFilters);
  };

  return (
    <div className="character-list-container">
      <FilterPanel filters={filters} onChange={handleFiltersChange} />
      <div className="cards-container">
        {cardIds.map((id) => (
          <div
            key={id}
            className={classNames("card", {
              editing: editingId === id,
            })}
          >
            <img
              src="/images/Rick.jpg"
              alt="Rick мать его Санчез"
              className="card-image"
            />

            <div className="card-content">
              <div className="character-list">
                <ul>
                  <li className="character-list__name">
                    <div className="field-actions-group">
                      <TextField
                        variant={
                          editingId === id ? "compact-editable" : "compact"
                        }
                        value={`Rick Motry`}
                        onChange={() => {}}
                        readOnly={editingId !== id}
                        onClick={() => handleNameClick(id)}
                      />
                      <ActionButton
                        isEditing={editingId === id}
                        onEdit={() => handleEdit(id)}
                        onSave={handleSave}
                        onCancel={() => setEditingId(null)}
                      />
                    </div>
                  </li>

                  <li className="character-list__gender">
                    <p className="character-list__title">Gender</p>
                    <p className="character-list__value">{gender}</p>
                  </li>

                  <li className="character-list__species">
                    <p className="character-list__title">Species</p>
                    <p className="character-list__value">{species}</p>
                  </li>

                  <li className="character-list__location">
                    <p className="character-list__title">Location</p>
                    {editingId ? (
                      <div className="character-list__value">
                        <TextField
                          id={`location-text-field-${id}`}
                          variant={
                            editingId === id ? "compact-editable" : "compact"
                          }
                          value={currentLocation}
                          onChange={() => {}}
                          readOnly={editingId !== id}
                          onClick={() => handleNameClick(id)}
                          className="character-list__location-input"
                        />
                      </div>
                    ) : (
                      <p className="character-list__value">{currentLocation}</p>
                    )}
                  </li>

                  <li className="character-list__status">
                    <p className="character-list__title">Status</p>
                    {editingId === id ? (
                      <div className="character-list__value">
                        <Selector
                          options={statusOptions}
                          value={currentStatus}
                          onChange={(value) => setCurrentStatus(String(value))}
                          placeholder="Status"
                          size="small"
                          disabled={editingId !== id}
                        />
                      </div>
                    ) : (
                      <p className="character-list__value">
                        {getStatusLabel(currentStatus).label}
                        <span
                          className="dot"
                          style={{
                            backgroundColor:
                              getStatusLabel(currentStatus).color,
                          }}
                        />
                      </p>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
