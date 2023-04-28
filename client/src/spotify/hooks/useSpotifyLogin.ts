import { useCallback } from "react";
import { spotify as config } from "@config";

export default function useSpotifyLogin() {
  const login = useCallback(() => {
    const randomHexChars = (length: number) => {
      var numberArray = new Uint8Array(length / 2);
      window.crypto.getRandomValues(numberArray);
      return Array.from(
        numberArray,
        (x) => x.toString(16).padStart(2, "0")
      ).join("");
    };
    
    const state = randomHexChars(16);
    localStorage.setItem('spotify-login-state', state);

    const url = new URL('https://accounts.spotify.com/authorize');
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('client_id',  config.clientId);
    url.searchParams.set('scope', config.scopes.join(' '));
    url.searchParams.set('redirect_uri', config.redirectUri);
    url.searchParams.set('state', state);

    window.location.assign(url.href);
    window.open(url.href, "_self");
  }, []);

  return login;
}