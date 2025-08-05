import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Components/Content/Content.css";
import { Selector } from "../Components/Selector/Selector";
import { TextField } from "../Components/FilterInput/TextField";

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

  const handleCardClick = (id: number) => {
    if (editingId !== id) {
      navigate(`/character/${id}`);
    }
  };

  return (
    <div className="cards-container">
      {cardIds.map((id) => (
        <div key={id} className="card" onClick={() => handleCardClick(id)}>
          <div className="card-content">
            <div onClick={(e) => e.stopPropagation()}>
              <TextField
                variant={editingId === id ? "compact-editable" : "compact"}
                value={`Rick Motry`}
                onChange={() => {}}
                readOnly={editingId !== id}
                onEditClick={() => handleEdit(id)}
                onSaveClick={handleSave}
              />
            </div>

            <div onClick={(e) => e.stopPropagation()}>
              <Selector
                options={statusOptions}
                value={null}
                onChange={() => {}}
                placeholder="Status"
                size="small"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
