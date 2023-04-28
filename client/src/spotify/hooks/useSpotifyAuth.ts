import { useCallback, useEffect, useState } from "react";
import { spotify } from "@config";
import axios from "axios";
import useLocalStorage from "@spotify/hooks/useLocalStorage";
import { useNavigate, useSearchParams } from "react-router-dom";

type SpotifyAuth = {
  accessToken: string;
  expiresAt: number;
  refreshToken: string;
};

export default function useSpotifyAuth(code: string | null, state: string | null) {
  const {
    get: getLocalStorage,
    set: setLocalStorage
  } = useLocalStorage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [validAccessToken, setValidAccessToken] = useState<string | null>();

  const storeAuthToBrowser = useCallback((auth: SpotifyAuth) => {
    setLocalStorage("spotify-auth-token", auth);
  }, [setLocalStorage]);

  const getStoredAuth = (): SpotifyAuth | null => {
    return getLocalStorage("spotify-auth-token");
  };

  const getValidStoredAuth = (): SpotifyAuth | null => {
    const auth = getStoredAuth();

    if (auth === null || Date.now() >= Number(auth.expiresAt)) {
      return null;
    }

    return auth;
  };

  const canRefresh = (): boolean => {
    const auth = getStoredAuth();
    return auth !== null;
  };

  const requestAccessToken = async (code: string, state: string): Promise<SpotifyAuth> => {
    if (code === null || state === null) {
      throw new Error("missing params");
    }

    const redirectUri = spotify.redirectUri;
    const clientId = spotify.clientId;

    const savedState = localStorage.getItem("spotify-login-state");
    localStorage.removeItem("spotify-login-state");

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
    storeAuthToBrowser(auth);
    return auth;
  };

  const refreshAccessToken = async (): Promise<SpotifyAuth | null> => {
    const storedAuth = getStoredAuth();
    if (storedAuth === null) {
      return null;
    }

    const refreshTokenResonse = await axios.post(
      `/api/spotify/get-auth-token`,
      {
        clientId: spotify.clientId,
        refreshToken: storedAuth.refreshToken,
      }
    );

    const expiresAt = Date.now() + refreshTokenResonse.data.expires_in * 1000;

    const auth = {
      ...storedAuth,
      accessToken: refreshTokenResonse.data.access_token,
      expiresAt,
    }
    storeAuthToBrowser(auth);
    return auth;
  };

  const spotifyAuthProcess = async (): Promise<string | null> => {
    const storedAuth = getValidStoredAuth();

    if (storedAuth !== null) {
      return storedAuth.accessToken;
    }

    if (canRefresh()) {
      const refreshedAuth = await refreshAccessToken();
      if (refreshedAuth !== null) {
        return refreshedAuth.accessToken;
      }
    }

    navigate("../login")
    return null;
  }

  useEffect(() => {
    const validAccessToken = await spotifyAuthProcess();
    setValidAccessToken(validAccessToken);
    
  });
}