import storedAuth from "../lib/auth/storedAuth";
import SpotifyApi from "./spotifyApi";

export default class SpotifyApiSingleton {
  static #instance: SpotifyApi;

  static #createInstance() {
    const accessToken = storedAuth.get()?.accessToken ?? null;

    if (accessToken === null) {
      throw Error('No access token');
    }
    SpotifyApiSingleton.#instance = new SpotifyApi(accessToken);
  }

  static getInstance() {
    if (SpotifyApiSingleton.#instance === undefined) {
      SpotifyApiSingleton.#createInstance();
    }
    return SpotifyApiSingleton.#instance;
  }
}