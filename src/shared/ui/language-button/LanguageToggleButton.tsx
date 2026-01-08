import { useTranslation } from 'react-i18next';

import { EnLang, RuLang } from '@/shared/assets';

import { ToggleButton } from '../toggle-button';

export const LanguageToggleButton = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'ru' ? 'en' : 'ru';

    i18n.changeLanguage(newLanguage);
  };

  const isRussianLanguage = i18n.language === 'ru';
  return (
    <ToggleButton
      onClick={toggleLanguage}
      icon={isRussianLanguage ? <RuLang /> : <EnLang />}
    />
  );
};
