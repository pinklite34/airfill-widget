import { fromWindow } from './globals';
import * as i18n from '../../config/i18n';
import { includes } from './string';

const isProd = process.env.NODE_ENV === 'production';

export function getLocation() {
  const location = fromWindow('location');

  const host = location ? location.host : '';
  const pathname = location ? location.pathname : '';
  const search = location ? location.search : '';

  const sub = host.split('.').length > 2 ? host.split('.')[0] : '';
  const domain = sub ? host.split('.').slice(1) : host;

  const useLngQuery = !isProd || includes(host, 'herokuapp');
  const firstSub = sub.split('-').length > 1 ? sub.split('-')[0] : sub;
  const hostEnv = (i18n.supportedLanguageKeys as any).includes(firstSub) ? '' : firstSub;
  const hostLng = useLngQuery ? '' : hostEnv ? sub.split('-')[1] : firstSub;

  return {
    location,
    host,
    pathname,
    search,
    sub,
    domain,
    hostEnv,
    hostLng,
    useLngQuery,
  };
}
