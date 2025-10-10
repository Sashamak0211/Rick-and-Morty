import { useEffect } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { ArrowLeft } from "@assets/icon/ArrowLeft";
import { Loader } from "@Components/Loader/Loader";

import { useGetCharacterByIdQuery } from "@/app/store/useCharactersStore";

import "@Components/Content/Content.css";

export const CharacterPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: character,
    isLoading,
    error,
  } = useGetCharacterByIdQuery(id);

  useEffect(() => {
    if (error) {
      navigate("/404");
    }
  }, [error, navigate]);

  if (isLoading) {
    return <Loader size="large" label="Загружаю персонажа." />;
  }

  return (
    <div className="cardBox">
      <Link to="/" className="card-box__back">
        <ArrowLeft /> <span className="card-box__back-text">GO BACK</span>
      </Link>

      <img
        src={character?.image}
        alt={character?.name}
        className="card-character__img"
      />

      <div className="card-character__name">{character?.name}</div>
      <h2 className="card-character__title">Information</h2>
      <dl className="card-character-information">
        <div className="card-character-information__row">
          <dt className="card-character-information__term">Gender:</dt>
          <dd className="card-character-information__value">
            {character?.gender}
          </dd>
        </div>
        <div className="card-character-information__row">
          <dt className="card-character-information__term">Status:</dt>
          <dd className="card-character-information__value">
            {character?.status}
          </dd>
        </div>
        <div className="card-character-information__row">
          <dt className="card-character-information__term">Species:</dt>
          <dd className="card-character-information__value">
            {character?.species}
          </dd>
        </div>
        <div className="card-character-information__row">
          <dt className="card-character-information__term">Origin:</dt>
          <dd className="card-character-information__value">
            {character?.origin?.name}
          </dd>
        </div>
        <div className="card-character-information__row">
          <dt className="card-character-information__term">Type:</dt>
          <dd className="card-character-information__value">
            {character?.type || "Unknown"}
          </dd>
        </div>
        <div className="card-character-information__row">
          <dt className="card-character-information__term">Location:</dt>
          <dd className="card-character-information__value">
            {character?.location?.name}
          </dd>
        </div>
      </dl>
    </div>
  );
};
