import { useTranslation } from 'react-i18next';

import { EnLang, RuLang } from '@/shared/assets';

import { ToggleButton } from '../toggle-button';

export const LanguageToggleButton = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };
  const lngRu = i18n.language === 'ru';
  return (
    <ToggleButton
      onClick={toggleLanguage}
      icon={lngRu ? <RuLang /> : <EnLang />}
    />
  );
};
