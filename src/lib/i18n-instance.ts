import i18n from 'i18next';
import * as LanguageDetector from 'i18next-browser-languagedetector';

import * as i18nConfig from '../../config/i18n';

// @ts-ignore
import resources from '@alienfast/i18next-loader?basenameAsNamespace=true!../translations';
import { getLocation } from './route-helpers';
import { getLanguage } from './globals';

declare const window: any;

const lng = process.env.LNG || getLanguage() || getLocation().hostLng;

i18n.use(LanguageDetector).init(i18nConfig.createI18nConfig(resources, lng));

if (window) {
  window.BITREFILL__WIDGET_I18N = i18n;
  window.BITREFILL__WIDGET_LNG = lng;
}

export default i18n;
