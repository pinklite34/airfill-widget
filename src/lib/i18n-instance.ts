import i18n from 'i18next';
import * as LanguageDetector from 'i18next-browser-languagedetector';
import * as XHR from 'i18next-xhr-backend';

import * as i18nConfig from '../../config/i18n';

import { getLanguage } from './globals';
import { getLocation } from './route-helpers';

declare const window: any;

const lng = process.env.LNG || getLanguage() || getLocation().hostLng;

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init(i18nConfig.createI18nConfig(lng));

if (window) {
  window.BITREFILL__WIDGET_I18N = i18n;
  window.BITREFILL__WIDGET_LNG = lng;
}

export default i18n;
