import { Link } from 'react-router-dom';

import { HeaderLogo } from '@/shared/assets';

import { LanguageToggleButton } from '../language-button';
import { ThemeToggleButton } from '../toggle-button';

import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/">
          <HeaderLogo className="header__logo-image" />
        </Link>
        <div className="buttons">
          <ThemeToggleButton />
          <LanguageToggleButton />
        </div>
      </div>
    </header>
  );
};
