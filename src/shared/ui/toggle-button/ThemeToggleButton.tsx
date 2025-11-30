import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/app';
import { toggleTheme } from '@/app/store/themeSlice';
import { DarkTheme, LightTheme } from '@/shared/assets';

import { ToggleButton } from './ToggleButton';

export const ThemeToggleButton = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <ToggleButton
      onClick={handleToggleTheme}
      icon={isDark ? <DarkTheme /> : <LightTheme />}
    />
  );
};
