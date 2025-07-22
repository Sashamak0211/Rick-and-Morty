import { Link } from "react-router-dom";

export const CharacterList = () => {
  return (
    <div className="character-list">
      <h1>Список персонажей</h1>
      <div className="">
        <Link to="/character/1">Персонаж 1</Link>
      </div>
    </div>
  );
};
