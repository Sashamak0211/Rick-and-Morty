import { useThemeStore } from '@/app/storeZustand/useThemeStore';
import { DarkTheme, LightTheme } from '@/shared/assets';

import { ToggleButton } from './ToggleButton';

export const ThemeToggleButton = () => {
  const isDark = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <ToggleButton
      onClick={toggleTheme}
      icon={isDark ? <DarkTheme /> : <LightTheme />}
    />
  );
};
