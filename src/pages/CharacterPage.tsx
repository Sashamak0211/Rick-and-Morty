import { useEffect } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { useGetCharacterByIdQuery } from '@/app';
import { ArrowLeft, Loader } from '@/shared';

import './character-page.css';

export const CharacterPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: character, isLoading, error } = useGetCharacterByIdQuery(id);
  const { t } = useTranslation();

  useEffect(() => {
    if (error) {
      navigate('/404');
    }
  }, [error, navigate]);

  if (isLoading) {
    return <Loader size="large" label="Загружаю персонажа." />;
  }

  return (
    <div className="cardBox">
      <Link to="/" className="card-box__back">
        <ArrowLeft />{' '}
        <span className="card-box__back-text">{t('GO BACK')}</span>
      </Link>

      <img
        src={character?.image}
        alt={character?.name}
        className="card-character__img"
      />

      <div className="card-character__name">{character?.name}</div>
      <h2 className="card-character__title">{t('Information')}</h2>
      <dl className="card-character-information">
        <div className="card-character-information__row">
          <dt className="card-character-information__term">{t('Gender')}:</dt>
          <dd className="card-character-information__value">
            {t(character?.gender ?? "Unknown")}
          </dd>
        </div>
        <div className="card-character-information__row">
          <dt className="card-character-information__term">{t('Status')}:</dt>
          <dd className="card-character-information__value">
            {t(character?.status ?? "Unknown")}
          </dd>
        </div>
        <div className="card-character-information__row">
          <dt className="card-character-information__term">{t('Species')}:</dt>
          <dd className="card-character-information__value">
            {t(character?.species?? "Unknown")}
          </dd>
        </div>
        <div className="card-character-information__row">
          <dt className="card-character-information__term">{t('Origin')}:</dt>
          <dd className="card-character-information__value">
            {t(character?.origin?.name ?? "Unknown")}
          </dd>
        </div>
        <div className="card-character-information__row">
          <dt className="card-character-information__term">{t('Type')}:</dt>
          <dd className="card-character-information__value">
            {t(character?.type || 'Unknown')}
          </dd>
        </div>
        <div className="card-character-information__row">
          <dt className="card-character-information__term">{t('Location')}:</dt>
          <dd className="card-character-information__value">
            {t(character?.location?.name?? "Unknown")}
          </dd>
        </div>
      </dl>
    </div>
  );
};
