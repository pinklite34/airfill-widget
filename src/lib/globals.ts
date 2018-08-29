import { includes } from './string';

declare const window: object;

export const constants = {
  I18N: 'BITREFILL__I18N',
  LNG: 'BITREFILL__LNG',
  IS_MOBILE: 'BITREFILL__IS_MOBILE',
  SOURCE: 'BITREFILL__SOURCE',
  PLATFORM: 'BITREFILL__PLATFORM',
};

export function fromWindow(prop: string): any | void {
  try {
    return window && window[prop];
  } catch (e) {
    console.error(e);
  }
}

export function getLanguage(): string | void {
  return fromWindow(constants.LNG);
}

export function getSource(): 'app' | 'web' {
  return fromWindow(constants.SOURCE) || 'web';
}

export function getPlatform(): 'ios' | 'android' | 'browser' {
  return fromWindow(constants.PLATFORM) || 'browser';
}

export function isMobileApp(): boolean {
  const host = fromWindow('location') && fromWindow('location').host;

  const isMobile =
    (host && includes(host, 'mobile')) || // (dev-)mobile.bitrefill.com
    /* remove the below once all mobile apps are pointing to mobile.bitrefill.com */
    getSource() === 'app' ||
    fromWindow(constants.IS_MOBILE) ||
    Boolean(fromWindow('originalPostMessage'));

  return Boolean(isMobile);
}
