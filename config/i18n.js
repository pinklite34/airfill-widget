const isProd = process.env.NODE_ENV === 'production';

const defaultLngKey = 'en';
const defaultNamespace = 'widget';
const namespaces = [defaultNamespace];

const supportedLanguages = [
  { lng: 'en', name: 'English' },
  { lng: 'ru', name: 'Russian' },
  { lng: 'fr', name: 'French' },
  { lng: 'es', name: 'Spanish' },
  { lng: 'de', name: 'German' },
];

const supportedLanguageKeys = supportedLanguages.map(function(x) {
  return x.lng;
});

function createI18nConfig(resources, lng) {
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
