import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <img
          src="/public/images/headerLogo.png"
          alt="Header_Logo"
          width={49}
          height={49}
        />
      </Link>
    </header>
  );
};
