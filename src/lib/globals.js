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
