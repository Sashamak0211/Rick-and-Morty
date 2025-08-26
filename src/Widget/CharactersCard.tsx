import { TextField } from "../Components/FilterInput/TextField";
import { Selector } from "../Components/Selector/Selector";
import { ActionButton } from "../Components/ActionButton/ActionButton";
import type {
  ICharacterCardProps,
  ICharacterEditableField,
} from "../shared/api/types/types";

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

export const CharacterCard = ({
  character,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onClick,
  onFieldChange,
}: ICharacterCardProps) => {
  const handleNameClick = () => {
    if (!isEditing) {
      onClick?.();
    }
  };

  const handleChange = (field: ICharacterEditableField) => (value: string) => {
    if (isEditing && onFieldChange) {
      onFieldChange(field, value);
    }
  };

  const handleStatus = (value: string | null) => {
    if (value !== null) {
      onFieldChange?.("status", value);
    }
  };
  const handleEdit = () => {
    onEdit(character.id);
  };
  const handleSave = () => {
    onSave();
  };
  const handleCancel = () => {
    onCancel();
  };

  return (
    <div
      className={`character-card ${isEditing ? "editing" : ""}`}
      data-id={character.id}
    >
      <img
        src={character.imageSrc}
        alt={character.imageAlt}
        className="character-card__image"
      />

      <div className="character-card__content">
        <dl className="character-card__details">
          <div className="character-card__field-group">
            <TextField
              variant={isEditing ? "compact-editable" : "compact"}
              value={character.name}
              onChange={handleChange("name")}
              readOnly={!isEditing}
              onClick={handleNameClick}
              id={`character-name-${character.id}`}
            />
            <ActionButton
              isEditing={isEditing}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>

          <div className="character-card__row">
            <dt>Gender</dt>
            <dd className="character-card__value">{character.gender}</dd>
          </div>

          <div className="character-card__row">
            <dt>Species</dt>
            <dd className="character-card__value">{character.species}</dd>
          </div>

          <div className="character-card__row">
            <dt>Location</dt>
            <dd className="character-card__value">
              {isEditing ? (
                <TextField
                  variant="compact-editable"
                  value={character.location}
                  onChange={handleChange("location")}
                  id={`character-location-${character.id}`}
                  className="character-card__location-input"
                />
              ) : (
                character.location
              )}
            </dd>
          </div>

          <div className="character-card__row character-card__row--status">
            <dt>Status</dt>
            <dd className="character-card__value">
              {isEditing ? (
                <Selector
                  options={statusOptions}
                  value={character.status}
                  onChange={handleStatus}
                  placeholder={character.status}
                  size="small"
                />
              ) : (
                <>
                  {getStatusLabel(character.status).label}
                  <span
                    className="character-card__dot"
                    style={{
                      backgroundColor: getStatusLabel(character.status).color,
                    }}
                  />
                </>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
