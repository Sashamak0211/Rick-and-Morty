import { Link } from 'react-router-dom';

import { HeaderLogo } from '@/shared/assets';

import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/">
          <img
            src={HeaderLogo}
            alt="Rick and Morty"
            className="header__logo-image"
          />
        </Link>
      </div>
    </header>
  );
};
