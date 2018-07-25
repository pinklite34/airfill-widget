export function startsWith(str, prefix) {
  return str ? str.lastIndexOf(prefix, 0) === 0 : '';
}

export function endsWith(str, suffix) {
  return str ? str.indexOf(suffix, str.length - suffix.length) !== -1 : '';
}

export function capitalizeFirst(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}
