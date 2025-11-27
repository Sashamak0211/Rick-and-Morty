import { RootState } from '@app';
import { useDispatch, useSelector } from 'react-redux';

import { toggleTheme } from '../../../app/store/themeSlice';
import { DarkTheme, LightTheme } from '../../assets';

import './ToggleButton.css';

export const ToggleButton = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <button onClick={handleToggleTheme} className="toggle-button">
      {isDark ? <DarkTheme /> : <LightTheme />}
    </button>
  );
};
