import { Navigate, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import ErrorScreen from "@components/ErrorScreen";
import requestAccessToken from "../lib/auth/requestAccessToken";

export default function Callback() {
  const [accessToken, setAccessToken] = useState<string>();
  const [searchParams] = useSearchParams();

  const requestAndFillAccessToken = useCallback(() => {
    if (!!accessToken) {
      return;
    }

    const code = searchParams.get('code');
    const state = searchParams.get('state');

    searchParams.delete('code');
    searchParams.delete('state');

    if (code === null || state === null) {
      return;
    }

    requestAccessToken({ code, state }).then(
      (accessToken) => { setAccessToken(accessToken) }
    );
  }, [searchParams, accessToken]);

  useEffect(() => {
    requestAndFillAccessToken();
  }, [requestAndFillAccessToken]);

  if (!accessToken) {
    return (
      <ErrorScreen
        message="loading"
      ></ErrorScreen>
    );
  }

  return (
    <Navigate to="/spotify-thing/dashboard" replace />
  );
}