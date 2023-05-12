import SpotifyApiSingleton from "@src/spotify/api/spotifyApiSingleton";
import Track from "../track";
import Source from "./sourceInterface";
import {Playlist as SpotifyPlaylist} from "@src/spotify/api/types/playlist";

class Playlist implements Source {
  id: string;
  name: string;
  totalTracks: number;

  constructor(spotifyPlaylist: SpotifyPlaylist) {
    this.id = spotifyPlaylist.id;
    this.name = spotifyPlaylist.name;
    this.totalTracks = spotifyPlaylist.tracks.total;
  }

  async getTracks(): Promise<Track[]> {
    const SpotifyApi = SpotifyApiSingleton.getInstance();
    const tracks = await (SpotifyApi.playlists.getPlaylistItems(this.id));
    const builderTracks = tracks.map(track => new Track(track.id, track.uri));
    return builderTracks;
  }
}

export default Playlist;