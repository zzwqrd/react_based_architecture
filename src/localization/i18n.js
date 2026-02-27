import i18n from 'i18next';
import { initReactI18next } from '../../node_modules/react-i18next';
import ar from './ar.json';
import en from './en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: ar },
      en: { translation: en },
    },
    lng: 'ar', // Default language = Arabic (same as Flutter: startLocale: Locale('ar'))
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    supportedLngs: ['ar', 'en'],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    startI18n: true,
    detection: {
      order: ['path', 'querystring', 'cookie', 'localStorage', 'subdomain', 'navigator', 'htmlTag', 'host'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
// عادة يتم استيراده مرة واحدة في بداية التطبيق في App.js أو index.js
import './localization/i18n';
import { useTranslation } from 'react-i18next';

const TranslateText = () => {
  const { t } = useTranslation();
  return <Text>{t('LOGIN')}</Text>;
};
*/
