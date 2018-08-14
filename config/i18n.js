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

    debug: !isProd,
    keySeparator: '### not used ###',

    backend: {
      loadPath: '/translations/{{lng}}/{{ns}}.json',
    },

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
