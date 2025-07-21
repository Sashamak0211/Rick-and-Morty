import { Link } from "react-router-dom";

export const CharacterCard = () => {
  return (
    <div className="characters-card-box">
      <h1>Информация о персонаже</h1>
      <Link to='/'>
      ← Назад к списку
      </Link>
    </div>
  );
};
