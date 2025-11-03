import { memo, useState } from 'react';

import {
  ActionButton,
  Selector,
  SelectorDot,
  type StatusesType,
  TextField,
} from '@/Components';
import type { ICharacterCardProps } from '@/shared';

const statusOptions = [
  { value: 'Alive', label: 'Alive' },
  { value: 'Dead', label: 'Dead' },
  { value: 'Unknown', label: 'Unknown' },
];

const getStatusLabel = (value: string) => {
  return (
    statusOptions.find(
      (status) => status.value.toLowerCase() === value.toLowerCase()
    ) || {
      label: value,
    }
  );
};

export const CharacterCard = memo(
  ({
    character,

    onSave,

    onClick,
  }: ICharacterCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentName, setCurrentName] = useState(character.name);
    const [currentLocation, setCurrentLocation] = useState(character.location);
    const [currentStatus, setCurrentStatus] = useState(character.status);

    const handleNameClick = () => {
      if (!isEditing) {
        onClick?.();
      }
    };

    const handleChangeName = (value: string) => {
      setCurrentName(value);
    };
    const handleChangeLocation = (value: string) => {
      setCurrentLocation(value);
    };
    const handleChangeStatus = (value: string) => {
      setCurrentStatus(value);
    };
    const handleEdit = () => {
      setIsEditing(true);
    };
    const handleSave = () => {
      onSave(character.id, currentName, currentLocation, currentStatus);
      setIsEditing(false);
    };
    const handleCancel = () => {
      setCurrentName(character.name);
      setCurrentLocation(character.location);
      setCurrentStatus(character.status);
      setIsEditing(false);
    };

    return (
      <div
        className={`character-card ${isEditing ? 'editing' : ''}`}
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
                variant={isEditing ? 'compact-editable' : 'compact'}
                value={currentName}
                onChange={handleChangeName}
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
                    value={currentLocation}
                    onChange={handleChangeLocation}
                    id={`character-location-${character.id}`}
                    className="character-card__location-input"
                  />
                ) : (
                  currentLocation
                )}
              </dd>
            </div>

            <div className="character-card__row character-card__row--status">
              <dt>Status</dt>
              <dd className="character-card__value">
                {isEditing ? (
                  <Selector
                    options={statusOptions}
                    value={currentStatus}
                    onChange={handleChangeStatus}
                    placeholder={currentStatus}
                    size="small"
                    OptionContentComponent={(props) => (
                      <>
                        {props.value}
                        <SelectorDot status={props.value as StatusesType} />
                      </>
                    )}
                  />
                ) : (
                  <>
                    {getStatusLabel(currentStatus).label}
                    <SelectorDot status={currentStatus as StatusesType} />
                  </>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    );
  }
);
