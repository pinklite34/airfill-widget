export function startsWith(str, prefix) {
  return str ? str.lastIndexOf(prefix, 0) === 0 : '';
}

export function endsWith(str, suffix) {
  return str ? str.indexOf(suffix, str.length - suffix.length) !== -1 : '';
}

export function includes(str, substring) {
  return str ? str.indexOf(substring) !== -1 : false;
}

export function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}
