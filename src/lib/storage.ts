import * as Cookies from 'js-cookie';
import { fromWindow } from './globals';

const localStorage = fromWindow('localStorage');

export function getStorageItem(key: string) {
  return (localStorage && localStorage.getItem(key)) || Cookies.get(key);
}

export function setStorageItem(key: string, value: any) {
  Cookies.set(key, value);
  return localStorage && localStorage.setItem(key, value);
}

export function removeStorageItem(key: string) {
  Cookies.remove(key);
  return localStorage && localStorage.removeItem(key);
}

export enum StorageKey {
  EMAIL = 'email',
}
