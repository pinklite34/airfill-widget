import { fromWindow } from './globals';
import i18n from '../../config/i18n';

export function getLocation() {
  const location = fromWindow('location');

  const host = location ? location.host : '';
  const pathname = location ? location.pathname : '';
  const search = location ? location.search : '';

  const sub = host.split('.').length > 2 ? host.split('.')[0] : '';
  const domain = sub ? host.split('.').slice(1) : host;

  const firstSub = sub.split('-').length > 1 ? sub.split('-')[0] : sub;
  const hostEnv = i18n.supportedLanguageKeys.includes(firstSub) ? '' : firstSub;
  const hostLng = hostEnv ? sub.split('-')[1] : firstSub;

  return {
    location,
    host,
    pathname,
    search,
    sub,
    domain,
    hostEnv,
    hostLng,
  };
}
