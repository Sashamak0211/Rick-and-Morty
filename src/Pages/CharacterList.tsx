import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Components/Content/Content.css";
import { Selector } from "../Components/Selector/Selector";
import { TextField } from "../Components/FilterInput/TextField";
import { IconButton } from "../Widget/IconButton";
import { EditIcon } from "../assets/icon/EditIcon";
import { CloseIcon } from "../assets/icon/CloseIcon";
import { CheckIcon } from "../assets/icon/CheckIcon";
import classNames from "classnames";

export const CharacterList = () => {
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<number | null>(null);

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
            <div className="field-actions-group">
              <TextField
                variant={editingId === id ? "compact-editable" : "compact"}
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

            <div className="selector-container">
              <Selector
                options={statusOptions}
                value={null}
                onChange={() => {}}
                placeholder="Status"
                size="small"
                disabled={editingId !== id}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
