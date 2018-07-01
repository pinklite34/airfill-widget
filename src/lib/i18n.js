import i18n from 'i18next';
import LocizeBackend from 'i18next-locize-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LocizeBackend)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    appendNamespaceToCIMode: true,
    // saveMissing: true,

    ns: ['widget'],
    defaultNS: 'widget',

    debug: process.env.NODE_ENV === 'development',

    backend: {
      projectId: 'a83885d2-6afa-4605-a751-8949e8c0a47a',
      apiKey: '542d30db-78f0-456c-8be9-6454c0bc9995',
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
  });

export default i18n;
