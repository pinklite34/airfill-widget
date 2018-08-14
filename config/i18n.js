const isProd = process.env.NODE_ENV === 'production';

const defaultLngKey = 'en';
const defaultNamespace = 'widget';
const namespaces = [defaultNamespace, 'website'];

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

const resources = supportedLanguageKeys.reduce(
  (acc, lng) => ({
    ...acc,
    [lng]: namespaces.reduce(
      (acc2, ns) => ({
        ...acc2,
        [ns]: require(`../src/translations/${lng}/${ns}.json`),
      }),
      {}
    ),
  }),
  {}
);

function createI18nConfig(lng) {
  return {
    fallbackLng: defaultLngKey,
    lng: lng,
    preload: [lng || defaultLngKey],
    whitelist: supportedLanguageKeys,

    appendNamespaceToCIMode: true,
    saveMissing: isProd,
    updateMissing: isProd,

    defaultNS: defaultNamespace,
    ns: namespaces,
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
  createI18nConfig: createI18nConfig,
  defaultLngKey: defaultLngKey,
  defaultNamespace: defaultNamespace,
  namespaces: namespaces,
  supportedLanguageKeys: supportedLanguageKeys,
  supportedLanguages: supportedLanguages,
};
