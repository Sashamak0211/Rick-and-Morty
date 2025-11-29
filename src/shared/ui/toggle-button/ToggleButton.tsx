import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/app';
import { toggleTheme } from '@/app/store/themeSlice';
import { DarkTheme, LightTheme } from '@/shared/assets';

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
