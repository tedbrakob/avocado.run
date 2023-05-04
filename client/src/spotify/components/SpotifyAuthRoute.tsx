// import { Navigate, Route, RouteProps, useSearchParams } from "react-router-dom";
// import useLocalStorage from "../hooks/useLocalStorage";

// interface KeyValueStore {
//   get: {
//     <T>(key: string): T | null;
//     <T>(key: string, defaultValue: T): T;
//   },
//   set: (key: string, value: any) => void,
//   remove: (key: string) => void,
// }

// type SpotifyAuth = {
//   accessToken: string;
//   expiresAt: number;
//   refreshToken: string;
// };

// const refreshTokenIfNeeded = (keyValueStore: KeyValueStore) => {
//   const auth = getAuthFromLocalStorage(keyValueStore) as SpotifyAuth;

//   if (auth !== null && Date.now() >= Number(auth.expiresAt)) {
    
//   }
// }

//   // const refreshAccessToken = async (): Promise<SpotifyAuth | null> => {
//   //   const storedAuth = getStoredAuth();
//   //   if (storedAuth === null) {
//   //     return null;
//   //   }

//   //   const refreshTokenResonse = await axios.post(
//   //     `/api/spotify/get-auth-token`,
//   //     {
//   //       clientId: spotify.clientId,
//   //       refreshToken: storedAuth.refreshToken,
//   //     }
//   //   );

//   //   const expiresAt = Date.now() + refreshTokenResonse.data.expires_in * 1000;

//   //   const auth = {
//   //     ...storedAuth,
//   //     accessToken: refreshTokenResonse.data.access_token,
//   //     expiresAt,
//   //   }
//   //   storeAuthToBrowser(auth);
//   //   return auth;
//   // };

// const getAuthFromLocalStorage = (keyValueStore: KeyValueStore) => {
//   return keyValueStore.get("spotify-auth-token");
// }

// export default function SpotifyAuthRoute(props: RouteProps) {
//   const localObjectStorage = useLocalStorage();

//   const [searchParams] = useSearchParams();
  
//   refreshTokenIfNeeded(localObjectStorage)

//   const auth = null;
//   if (!auth.valid() && auth.canRefresh()) {
//     auth.refresh();
//   }

//   if (!auth.valid()) {
//     return (
//       <Navigate to="/login" replace />
//     );
//   }
  
//   return (props.children);
// }

export {};