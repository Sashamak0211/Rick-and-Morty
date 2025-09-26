import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { ArrowLeft } from "@assets/icon/ArrowLeft";
import { Loader } from "@Components/Loader/Loader";
import { getCharacter, type IApiCharacter } from "@shared/api/characterApi";
import axios from "axios";

import "@Components/Content/Content.css";

export const CharacterPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<IApiCharacter | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const data = await getCharacter(Number(id));

        setCharacter(data);
      } catch (err) {
        console.error("Ошибка загрузки персонажа.", err);
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            navigate("/404");
          }
        }
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id, navigate]);

  if (loading) {
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
