import { Link } from "react-router-dom";
import "../Components/Content/Content.css";

export const CharacterPage = () => {
  return (
    <div className="cardBox">
      <h1>Информация о персонаже</h1>
      <Link to="/" className="card-box__back">
        ← GO BACK
      </Link>
    </div>
  );
};
