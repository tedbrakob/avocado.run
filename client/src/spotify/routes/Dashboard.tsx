import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import ErrorScreen from "@components/ErrorScreen";
import useSpotifyAuth from "@spotify/hooks/useSpotifyAuth";

export default function Dashboard() {
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');
  const state = searchParams.get('state');
  
  const spotifyAccessToken = useSpotifyAuth(code, state);

  const {mutate, data} = useMutation({
    mutationFn: async () => {

      // if (code === null || state === null) {
      //   throw new Error('Missing Param');
      // }

      // const {accessToken, expiresAt, refreshToken} = await useSpotifyAuth(code, state);

      // localStorage.setItem('spotify-access-token', accessToken);
      // localStorage.setItem('spotify-access-token-expires-at', expiresAt.toString());
      // localStorage.setItem('spotify-refresh-token', refreshToken);

      // return accessToken;
      return 'example'
    }
  });
  
  useEffect(() => {
    mutate();
  }, [mutate]);

  if (data === undefined) {
    return <ErrorScreen
      message="loading"
    ></ErrorScreen>
  }

  return (
    <div>
      {data}
    </div>
  );
}