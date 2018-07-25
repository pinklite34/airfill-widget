import i18n from 'i18next';
import LocizeBackend from 'i18next-locize-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import { getLanguage } from './web-globals';

const envLng = getLanguage();

i18n
  .use(LocizeBackend)
  .use(envLng ? () => {} : LanguageDetector)
  .init({
    fallbackLng: 'en',
    lng: envLng,
    preload: [envLng || 'en'],

    appendNamespaceToCIMode: true,
    saveMissing: process.env.NODE_ENV === 'production',

    ns: ['widget', 'website'],
    defaultNS: 'widget',

    debug: process.env.NODE_ENV === 'development',
    keySeparator: '### not used ###',

    backend: {
      projectId: '3a082193-3b75-4cdb-9be4-018cee014baa',
      apiKey: '4c7cd672-bbe4-4575-a9bf-5292fe8c4c75',
      referenceLng: 'en',
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      wait: true,
    },
  });

export default i18n;
