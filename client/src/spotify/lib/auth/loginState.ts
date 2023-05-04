import browserLocalStorage from "@src/lib/browserLocalStorage";

const key = 'spotify-login-state';

const randomHexChars = (length: number) => {
  var numberArray = new Uint8Array(length / 2);
  window.crypto.getRandomValues(numberArray);
  return Array.from(
    numberArray,
    (x) => x.toString(16).padStart(2, "0")
  ).join("");
};

const generate = (): string => {
  const state = randomHexChars(16);
  browserLocalStorage.set(key, state);
  return state;
};

const get = (): string | null => {
  return browserLocalStorage.get(key);
};

const remove = ():void => {
  browserLocalStorage.remove(key);
};

export default {
  generate,
  get,
  remove,
};