import axios from "axios";
import Playlists from "./libraries/playlists";
import PaginationOptions from "./types/paginationOptions";
import Tracks from "./libraries/tracks";
import Users from "./libraries/users";

type FetchOptions = {
  pagination?: PaginationOptions
  ids?: string[];
  body?: object;
};

class SpotifyApi {
  token: string;

  playlists: Playlists;
  tracks: Tracks;
  users: Users;

  constructor(token: string) {
    this.token = token;
    
    this.playlists = new Playlists(this);
    this.tracks = new Tracks(this);
    this.users = new Users(this);
  }

  async fetch(method: string, endpoint: string, options?: FetchOptions) {
    const url = new URL(`https://api.spotify.com/v1/${endpoint}`);

    //TODO: Find a better way to organize options
    const limit = options?.pagination?.limit ?? null;
    if (limit !== null) {
      url.searchParams.set('limit', limit.toString());
    }

    const offset = options?.pagination?.offset ?? null;
    if (offset !== null) {
      url.searchParams.set('offset', offset.toString());
    }

    const ids = options?.ids ?? null;
    if (ids !== null) {
      url.searchParams.set('ids', ids.join(','));
    }

    const body = options?.body ?? null;

    return await axios.request({
      method,
      url: url.href,
      headers: {Authorization: `Bearer ${this.token}`},
      data: body,
    });
  }
}

export default SpotifyApi;