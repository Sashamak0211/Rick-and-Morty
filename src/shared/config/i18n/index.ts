import en from '@shared/config/i18n/locales/en/translation.json';
import ru from '@shared/config/i18n/locales/ru/translation.json';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  fallbackLng: 'en',
  detection: {
    order: ['localStorage'],
    caches: ['localStorage'],
  },
});
export default i18next;
