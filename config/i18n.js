const isProd = process.env.NODE_ENV === 'production';
const LOCIZE_PROJECT_ID = process.env.LOCIZE_PROJECT_ID;
const LOCIZE_API_KEY = process.env.LOCIZE_API_KEY;

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
    // debug: !isProd,

    fallbackLng: defaultLngKey,
    lng: lng,
    preload: [lng || defaultLngKey],
    whitelist: supportedLanguageKeys,

    appendNamespaceToCIMode: true,
    saveMissing: LOCIZE_API_KEY && isProd,
    updateMissing: LOCIZE_API_KEY && isProd,

    ns: namespaces,
    defaultNS: defaultNamespace,

    backend: {
      loadPath: '/translations/{{lng}}/{{ns}}.json',
      addPath: 'https://api.locize.io/missing/' + LOCIZE_PROJECT_ID + '/latest/{{lng}}/{{ns}}',
    },

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
