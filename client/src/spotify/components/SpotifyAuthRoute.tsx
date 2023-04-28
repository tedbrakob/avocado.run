import { Navigate, Route, RouteProps, useSearchParams } from "react-router-dom";
import useSpotifyAuth from "@spotify/hooks/useSpotifyAuth";
import { spotify } from "@config";
import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";

interface KeyValueStore {
  get: {
    <T>(key: string): T | null;
    <T>(key: string, defaultValue: T): T;
  },
  set: (key: string, value: any) => void,
  remove: (key: string) => void,
}

const requestAccessToken = async (code: string, state: string, keyValueStore: KeyValueStore) => {
  const redirectUri = spotify.redirectUri;
  const clientId = spotify.clientId;

  const savedState = localStorage.getItem("spotify-login-state");
  keyValueStore.remove("spotify-login-state");

  if (state !== savedState) {
    throw new Error("state mismatch");
  }

  const tokenResponse = await axios.post(
    `/api/spotify/get-auth-token`,
    {
      code,
      redirectUri,
      clientId,
    }
  );

  if (tokenResponse.status !== 200) {
    throw new Error("bad response");
  }

  const accessToken = tokenResponse.data.access_token;
  const refreshToken = tokenResponse.data.refresh_token;

  const expiresAt = Date.now() + tokenResponse.data.expires_in * 1000;

  const auth = {
    accessToken,
    expiresAt,
    refreshToken,
  };

  keyValueStore.set("spotify-auth-token", auth);
  return auth;
}

const handleSearchParams = (searchParams: URLSearchParams, keyValueStore: KeyValueStore) => {
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (code !== null && state !== null) {
    requestAccessToken(code, state, keyValueStore);
  }
}

type SpotifyAuth = {
  accessToken: string;
  expiresAt: number;
  refreshToken: string;
};

const refreshTokenIfNeeded = (keyValueStore: KeyValueStore) => {
  const auth = getAuthFromLocalStorage(keyValueStore) as SpotifyAuth;

  if (auth !== null && Date.now() >= Number(auth.expiresAt)) {
    
  }
}

const getAuthFromLocalStorage = (keyValueStore: KeyValueStore) => {
  return keyValueStore.get("spotify-auth-token");
}

export default function SpotifyAuthRoute(props: RouteProps) {
  const localObjectStorage = useLocalStorage();

  const [searchParams] = useSearchParams();
  
  handleSearchParams(searchParams, localObjectStorage);
  refreshTokenIfNeeded(localObjectStorage)

  const auth = null;
  if (!auth.valid() && auth.canRefresh()) {
    auth.refresh();
  }

  if (!auth.valid()) {
    return (
      <Navigate to="/login" replace />
    );
  }
  
  return (props.children);
}