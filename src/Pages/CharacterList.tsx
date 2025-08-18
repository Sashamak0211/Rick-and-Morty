import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Selector } from "../Components/Selector/Selector";
import { TextField } from "../Components/FilterInput/TextField";
import { FilterPanel } from "../Widget/FilterPanel";
import { getCharacters } from "../shared/api/characterApi";
import classNames from "classnames";
import { ActionButton } from "../Components/ActionButton/ActionButton";
import type { ICharacterCardProps } from "../shared/api/types/types";
import { Loader } from "../Components/Loader/Loader";

interface IFiltersValue {
  name: string;
  species: string | null;
  gender: string | null;
  status: string | null;
}

export const CharacterList = () => {
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedFields, setEditedFields] = useState<{
    name: string;
    location: string;
    status: string;
  } | null>(null);

  const [filters, setFilters] = useState<IFiltersValue>({
    name: "",
    species: null,
    gender: null,
    status: null,
  });

  const [characters, setCharacters] = useState<ICharacterCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  const statusOptions = [
    { value: "Alive", label: "Alive", color: "#12B800" },
    { value: "Dead", label: "Dead", color: "#DF0000" },
    { value: "Unknown", label: "Unknown", color: "#FF9900" },
  ];

  const getStatusLabel = (value: string) => {
    return (
      statusOptions.find(
        (status) => status.value.toLowerCase() === value.toLowerCase()
      ) || {
        label: value,
        color: "#999",
      }
    );
  };

  const handleFiltersChange = (newFilters: IFiltersValue) => {
    setFilters(newFilters);
  };
  const handleEdit = (id: number) => {
    const character = characters.find((c) => c.id === id);
    if (character) {
      setEditedFields({
        name: character.name,
        location: character.location,
        status: character.status,
      });
      setEditingId(id);
    }
  };
  const handleSave = () => {
    if (editedFields && editingId) {
      setCharacters((prev) =>
        prev.map((char) =>
          char.id === editingId ? { ...char, ...editedFields } : char
        )
      );
    }
    setEditingId(null);
    setEditedFields(null);
  };
  const handleNameClick = (id: number) => {
    if (editingId !== id) {
      navigate(`/character/${id}`);
    }
  };
  const handleStatusChange = (value: string | null) => {
    setEditedFields((prev) =>
      prev ? { ...prev, status: String(value) } : null
    );
  };
  useEffect(() => {
    const loadCharacter = async () => {
      setLoading(true);
      try {
        const data = await getCharacters(filters);
        setCharacters(data);
      } catch (error) {
        console.error("Не удалось загрузить персонажей", error);
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    loadCharacter();
  }, [filters]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="character-list-container">
      <FilterPanel filters={filters} onChange={handleFiltersChange} />
      <div className="cards-container">
        {characters.map((char) => (
          <div
            key={char.id}
            className={classNames("card", {
              editing: editingId === char.id,
            })}
          >
            <img
              src={char.imageSrc}
              alt={char.imageAlt}
              className="card-image"
            />

            <div className="card-content">
              <div className="character-list">
                <ul>
                  <li className="character-list__name">
                    <div className="field-actions-group">
                      <TextField
                        variant={
                          editingId === char.id ? "compact-editable" : "compact"
                        }
                        value={char.name}
                        onChange={() => {}}
                        readOnly={editingId !== char.id}
                        onClick={() => handleNameClick(char.id)}
                      />
                      <ActionButton
                        isEditing={editingId === char.id}
                        onEdit={() => handleEdit(char.id)}
                        onSave={handleSave}
                        onCancel={() => setEditingId(null)}
                      />
                    </div>
                  </li>

                  <li className="character-list__gender">
                    <p className="character-list__title">Gender</p>
                    <p className="character-list__value">{char.gender}</p>
                  </li>

                  <li className="character-list__species">
                    <p className="character-list__title">Species</p>
                    <p className="character-list__value">{char.species}</p>
                  </li>

                  <li className="character-list__location">
                    <p className="character-list__title">Location</p>
                    {editingId === char.id ? (
                      <div className="character-list__value">
                        <TextField
                          id={`location-text-field-${char.id}`}
                          variant={
                            editingId === char.id
                              ? "compact-editable"
                              : "compact"
                          }
                          value={char.location}
                          onChange={() => {}}
                          readOnly={editingId !== char.id}
                          onClick={() => handleNameClick(char.id)}
                          className="character-list__location-input"
                        />
                      </div>
                    ) : (
                      <p className="character-list__value">{char.location}</p>
                    )}
                  </li>

                  <li className="character-list__status">
                    <p className="character-list__title">Status</p>
                    {editingId === char.id ? (
                      <div className="character-list__value">
                        <Selector
                          options={statusOptions}
                          value={editedFields?.status || ""}
                          onChange={handleStatusChange}
                          placeholder="Status"
                          size="small"
                        />
                      </div>
                    ) : (
                      <p className="character-list__value">
                        {getStatusLabel(char.status).label}
                        <span
                          className="dot"
                          style={{
                            backgroundColor: getStatusLabel(char.status).color,
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
