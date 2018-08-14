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

const resources = supportedLanguageKeys.reduce((acc, lng) => {
  acc[lng] = namespaces.reduce((acc, ns) => {
    acc[ns] = require(`../src/translations/${lng}/${ns}.json`);
    return acc;
  }, {});
  return acc;
}, {});

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
    resources: resources,

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
