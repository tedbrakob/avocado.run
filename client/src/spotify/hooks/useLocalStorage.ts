import { useCallback } from "react";

export default function useLocalStorage() {
  function get<T>(key: string): T | null;
  function get<T>(key: string, defaultValue: T): T;
  function get<T>(key: string, defaultValue?: T): T | null {
    const value = localStorage.getItem(key);

    if (value !== null) {
      return JSON.parse(value);
    }

    if (defaultValue !== undefined) {
      return defaultValue;
    }

    return null;
  }

  function set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function remove(key: string): void {
    localStorage.removeItem(key);
  }

  return {
    get: useCallback(get, [get]),
    set: useCallback(set, [set]),
    remove: useCallback(remove, [remove]),
  };
}