import { Link } from "react-router-dom";
import "./Header.css"
import headerLogo from "/src/assets/image/headerLogo.png"

export const Header = () => {
  return (
    <header className="header">
      <Link to="/" >
        <img
          src={headerLogo}
          alt="Rick and Morty"
           className="header__logo-image"
        />
      </Link>
    </header>
  );
};
