import Source from "./sourceInterface";
import Track from '../track';
import SpotifyApiSingleton from '@src/spotify/api/spotifyApiSingleton';


class TargetPlaylist implements Source {
  id: string;
  name: string;
  creating: boolean;

  constructor(attributes: {
    id: string,
    name: string,
    creating: boolean,
  }) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.creating = attributes.creating;
  }

  async getTracks(): Promise<Track[]> {
    if (this.creating) {
      return new Promise(() => []);
    }

    const SpotifyApi = SpotifyApiSingleton.getInstance();
    const tracks = await (SpotifyApi.playlists.getPlaylistItems(this.id));
    const builderTracks = tracks.map(track => new Track(track.id, track.uri));
    return builderTracks;
  }
}

export default TargetPlaylist;