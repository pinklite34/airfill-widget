declare const window: any;

export function fromWindow(prop) {
  try {
    return window && window[prop];
  } catch (e) {
    console.error(e);
  }
}

export function getLanguage() {
  return fromWindow('BITREFILL__LNG');
}

export function getSource() {
  return fromWindow('BITREFILL__SOURCE') || 'web';
}

export function getPlatform() {
  return fromWindow('BITREFILL__PLATFORM') || 'browser';
}

export function isMobileApp() {
  return getSource() === 'app' || Boolean(window && window.originalPostMessage);
}

export function isIos() {
  const navigator = fromWindow('navigator');
  const userAgent = navigator && navigator.userAgent;
  return (
    getPlatform() === 'ios' ||
    (userAgent && userAgent.match(/iPhone|iPad|iPod/))
  );
}
