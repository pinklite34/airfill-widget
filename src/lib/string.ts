export function startsWith(str?: string, prefix?: string): boolean {
  return str ? str.lastIndexOf(prefix, 0) === 0 : false;
}

export function endsWith(str?: string, suffix?: string): boolean {
  return str ? str.indexOf(suffix, str.length - suffix.length) !== -1 : false;
}

export function includes(str?: string, substring?: string): boolean {
  return str ? str.indexOf(substring) !== -1 : false;
}

export function capitalize(str?: string): string {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}
