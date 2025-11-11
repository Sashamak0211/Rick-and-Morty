import { Link } from 'react-router-dom';

import headerLogo from '@/shared/assets/image/headerLogo.png';

import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/">
          <img
            src={headerLogo}
            alt="Rick and Morty"
            className="header__logo-image"
          />
        </Link>
      </div>
    </header>
  );
};
