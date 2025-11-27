import { Link } from 'react-router-dom';

import { RootState } from '@app/store/store';
import { useSelector } from 'react-redux';

import { HeaderLogo, HeaderLogoDark } from '../../assets';
import { ToggleButton } from '../toggle-button';

import './Header.css';

export const Header = () => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/">
          <img
            src={isDark ? HeaderLogoDark : HeaderLogo}
            alt="Rick and Morty"
            className="header__logo-image"
          />
        </Link>
        <ToggleButton />
      </div>
    </header>
  );
};
