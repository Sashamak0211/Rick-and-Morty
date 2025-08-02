import { Link } from "react-router-dom";
import headerLogo from "/src/assets/image/headerLogo.png";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <img
          src={headerLogo}
          alt="Rick and Morty"
          className="header__logo-image"
        />
      </Link>
    </header>
  );
};
