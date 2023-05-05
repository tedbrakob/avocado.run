import { spotify as config } from "@config";
import loginState from "./loginState";

const redirect = () => {
  const state = loginState.generate();

  const url = new URL('https://accounts.spotify.com/authorize');
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id',  config.clientId);
  url.searchParams.set('scope', config.scopes.join(' '));
  url.searchParams.set('redirect_uri', config.redirectUri);
  url.searchParams.set('state', state);

  window.location.assign(url.href);
  window.open(url.href, "_self");
};

export default {
  redirect,
};