import SpotifyAuth from "../../types/SpotifyAuth";
import browserLocalStorage from "@src/lib/browserLocalStorage";

const key = 'spotify-auth-token';

const get = (): SpotifyAuth | null => {
  return browserLocalStorage.get(key);
};

const set = (auth: SpotifyAuth): void => {
  browserLocalStorage.set(key, auth);
};

export default {
  get,
  set,
};