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

const set = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
}

const remove = (key: string): void => {
  localStorage.removeItem(key);
}

export default {
  get,
  set,
  remove,
};