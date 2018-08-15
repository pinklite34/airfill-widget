const { LOCIZE_PROJECT_ID } = require('../constants');

const isProd = process.env.NODE_ENV === 'production';
const defaultLngKey = 'en';
const defaultNamespace = 'widget';
const namespaces = [defaultNamespace, 'website'];

const supportedLanguages = [
  { lng: 'en', name: 'English' },
  { lng: 'ru', name: 'Русский' },
  { lng: 'fr', name: 'Français' },
  { lng: 'es', name: 'Español' },
  { lng: 'de', name: 'Deutsch' },
];

const supportedLanguageKeys = supportedLanguages.map(function(x) {
  return x.lng;
});

function createI18nConfig(lng) {
  return {
    fallbackLng: defaultLngKey,
    lng: lng,
    preload: [lng || defaultLngKey],
    whitelist: supportedLanguageKeys,

    appendNamespaceToCIMode: true,
    saveMissing: isProd,
    updateMissing: isProd,

    ns: namespaces,
    defaultNS: defaultNamespace,

    backend: {
      loadPath: '/translations/{{lng}}/{{ns}}.json',
      addPath: `https://api.locize.io/missing/${LOCIZE_PROJECT_ID}/latest/{{lng}}/{{ns}}`,
    },

    debug: !isProd,
    keySeparator: '### not used ###',

    interpolation: {
      escapeValue: false,
    },

    react: {
      wait: true,
    },
  };
}

module.exports = {
  defaultLngKey: defaultLngKey,
  defaultNamespace: defaultNamespace,
  namespaces: namespaces,
  createI18nConfig: createI18nConfig,
  supportedLanguages: supportedLanguages,
  supportedLanguageKeys: supportedLanguageKeys,
};
