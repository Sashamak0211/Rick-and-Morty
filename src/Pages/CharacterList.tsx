import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Selector } from "../Components/Selector/Selector";
import { TextField } from "../Components/FilterInput/TextField";
import { IconButton } from "../Widget/IconButton";
import { EditIcon } from "../assets/icon/EditIcon";
import { CloseIcon } from "../assets/icon/CloseIcon";
import { CheckIcon } from "../assets/icon/CheckIcon";
import classNames from "classnames";

interface ICharacterFilter {
  gender: string;
  species: string;
  location: string;
}

export const CharacterList = () => {
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentLocation, setCurrentLocation] = useState("Earth");
  const [currentStatus, setCurrentStatus] = useState("alive");

  const [gender, setGender] = useState("Male");
  const [species, setSpecies] = useState("Human");

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

  return (
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
                    <div className="icon-button-container">
                      {editingId !== id ? (
                        <>
                          <IconButton
                            className="icon-button__close"
                            onClick={() => setEditingId(null)}
                          >
                            <CloseIcon />
                          </IconButton>
                          <IconButton
                            className="icon-button__edit"
                            onClick={() => handleEdit(id)}
                          >
                            <EditIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton
                            className="icon-button__close"
                            onClick={() => setEditingId(null)}
                          >
                            <CloseIcon />
                          </IconButton>
                          <IconButton
                            className="icon-button__check"
                            onClick={handleSave}
                          >
                            <CheckIcon />
                          </IconButton>
                        </>
                      )}
                    </div>
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
                          backgroundColor: getStatusLabel(currentStatus).color,
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
  );
};
