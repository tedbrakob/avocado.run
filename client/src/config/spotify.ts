const config = {
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID ?? "",
  redirectUri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI ?? "",
  scopes: [
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",
    "user-library-read",
    "user-read-private",
  ],
};

export default config;