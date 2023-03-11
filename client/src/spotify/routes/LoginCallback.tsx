import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import {spotify, react} from "../../config/config";
import { useEffect } from "react";

export default function LoginCallback() {
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const savedState = localStorage.getItem('spotify-login-state');

  const {mutate, data} = useMutation({
    mutationFn: async () => {
      const redirectUri = spotify.redirectUri;
      const clientId = spotify.clientId;

      const tokenResponse = await axios.post(
        `${react.serverUrl}/spotify/get-auth-token`,
        {
          code,
          redirectUri,
          clientId,
        }
      );
      return tokenResponse.data;
    }
  })
  useEffect(() => {
    if (code === null) {
      return;
    }

    if (state === null || state !== savedState) {
      return;
    }

    mutate();
  }, [mutate, code, state, savedState]);

  return (
    <div>
      <p>
        code: { code }
      </p>
      <p>
        state: {state}
      </p>
      <p>
        savedState: {savedState}
      </p>
      <p>
        {JSON.stringify(data)}
      </p>
    </div>
  );
}