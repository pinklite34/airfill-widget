import i18n from 'i18next';
import LocizeBackend from 'i18next-locize-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

i18n
  .use(LocizeBackend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',
    appendNamespaceToCIMode: true,
    saveMissing: process.env.NODE_ENV === 'production',

    ns: ['widget'],
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
      formatSeparator: ',',
      format: function(value, format, lng) {
        if (format === 'uppercase') return value.toUpperCase();
        return value;
      },
    },

    react: {
      wait: true,
    },
  });

export default i18n;
