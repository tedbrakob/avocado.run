import { api, spotify } from "@config";
import axios from "axios";
import SpotifyCallbackRequest from "@src/spotify/types/SpotifyCallbackRequest";
import storedAuth from "./storedAuth";
import loginState from "./loginState";

const requestAccessToken = async (callbackRequest: SpotifyCallbackRequest): Promise<string> => {
  const {code, state} = callbackRequest;
  if (code === null || state === null) {
    throw new Error("missing params");
  }

  const redirectUri = spotify.redirectUri;
  const clientId = spotify.clientId;

  const savedState = loginState.get();

  if (state !== savedState) {
    throw new Error("state mismatch");
  }
  loginState.remove();

  const tokenResponse = await axios.post(
    `${api.apiUrl}/spotify/get-auth-token`,
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
  
  storedAuth.set(auth);
  
  return accessToken;
};

export default requestAccessToken;