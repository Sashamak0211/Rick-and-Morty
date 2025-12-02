import { memo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import {
  ActionButton,
  Selector,
  SelectorDot,
  type StatusesType,
  TextField,
} from '@/shared';

import type { ICharacterCardProps } from '../types';

import './character-card.css';

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
    const { t } = useTranslation();

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
              <dt>{t('Gender')}</dt>
              <dd className="character-card__value">{t(character.gender)}</dd>
            </div>

            <div className="character-card__row">
              <dt>Species</dt>
              <dd className="character-card__value">{t(character.species)}</dd>
            </div>

            <div className="character-card__row">
              <dt>{t('Location')}</dt>
              <dd className="character-card__value">
                {isEditing ? (
                  <TextField
                    variant="compact-editable"
                    value={t(currentLocation)}
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
              <dt>{t('Status')}</dt>
              <dd className="character-card__value">
                {isEditing ? (
                  <Selector
                    options={statusOptions}
                    value={t(currentStatus)}
                    onChange={handleChangeStatus}
                    placeholder={t(currentStatus)}
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
                    {getStatusLabel(t(currentStatus)).label}
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
