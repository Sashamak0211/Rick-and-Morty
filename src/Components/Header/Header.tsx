import { Link } from "react-router-dom";
import "./Header.css"

export const Header = () => {
  return (
    <header className="header">
      <Link to="/" >
        <img
          src="/images/headerLogo.png"
          alt="Rick and Morty"
           className="header__logo-image"
        />
      </Link>
    </header>
  );
};
