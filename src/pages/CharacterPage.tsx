import { useEffect } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { useCharacterByIdQuery } from '@/app/query/useCharactersQuery';
import { ArrowLeft, Loader } from '@/shared';
import {
  genderMap,
  speciesMap,
  statusMap,
} from '@/shared/config/i18n/valueMap';

import './character-page.css';

export const CharacterPage = () => {
  const { id } = useParams<{ id: string }>();
  const characterId = Number(id);
  const navigate = useNavigate();
  const {
    data: character,
    isLoading,
    error,
  } = useCharacterByIdQuery(characterId);
  const { t } = useTranslation();

  useEffect(() => {
    if (error) {
      navigate('/404');
    }
  }, [error, navigate]);

  if (isLoading) {
    return <Loader size="large" label="Загружаю персонажа." />;
  }
  if (!character) {
    return null;
  }
  return (
    <div className="cardBox">
      <Link to="/" className="card-box__back">
        <ArrowLeft />{' '}
        <span className="card-box__back-text">{t('buttons.back')}</span>
      </Link>

      <img
        src={character?.image}
        alt={character?.name}
        className="card-character__img"
      />

      <div className="card-character__name">{character?.name}</div>
      <h2 className="card-character__title">{t('character.info')}</h2>
      <dl className="card-character-information">
        <div className="card-character-information__row">
          <dt className="card-character-information__term">
            {t('filters.gender')}:
          </dt>
          <dd className="card-character-information__value">
            {t(genderMap[character.gender])}
          </dd>
        </div>
        <div className="card-character-information__row">
          <dt className="card-character-information__term">
            {t('filters.status')}:
          </dt>
          <dd className="card-character-information__value">
            {t(statusMap[character.status])}
          </dd>
        </div>
        <div className="card-character-information__row">
          <dt className="card-character-information__term">
            {t('filters.species')}:
          </dt>
          <dd className="card-character-information__value">
            {t(speciesMap[character.species])}
          </dd>
        </div>
        <div className="card-character-information__row">
          <dt className="card-character-information__term">
            {t('character.origin')}:
          </dt>
          <dd className="card-character-information__value">
            {t(character?.origin?.name)}
          </dd>
        </div>
        <div className="card-character-information__row">
          <dt className="card-character-information__term">
            {t('character.type')}:
          </dt>
          <dd className="card-character-information__value">
            {t(character?.type || 'status.unknown')}
          </dd>
        </div>
        <div className="card-character-information__row">
          <dt className="card-character-information__term">
            {t('character.location')}:
          </dt>
          <dd className="card-character-information__value">
            {t(character?.location?.name || 'status.unknown')}
          </dd>
        </div>
      </dl>
    </div>
  );
};
