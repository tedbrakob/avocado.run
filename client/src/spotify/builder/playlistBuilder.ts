import SpotifyApiSingleton from "../api/spotifyApiSingleton";
import TrackFilter from "./filters/trackFilterInterface";
import Source from "./sources/sourceInterface";
import Track from "./track";

class PlaylistBuilder {
  sources: Source[];
  filters: TrackFilter[];
  name: string;

  constructor(sources: Source[], filters: TrackFilter[], name: string) {
    this.sources = sources;
    this.filters = filters;
    this.name = name;
  }

  async build() {
    //get all source tracks
    let tracks: Track[] = [];
    for (const source of this.sources) {
      tracks.push(...await source.getTracks());
    }

    //add audiofeatures to each track
    const spotifyApi = SpotifyApiSingleton.getInstance();
    const audioFeatures = await spotifyApi
      .tracks
      .getAudioFeaturesBulk(tracks.map(track => track.id));
    
    for (const [i, track] of tracks.entries()) {
      track.addAudioFeatures(audioFeatures[i]);
    }

    //filter
    for (const filter of this.filters) {
      tracks = tracks.filter((track) => filter.filter(track));
    }

    //create new playlist
    const playlist = await spotifyApi.playlists.createPlaylist(this.name);

    //add filtered tracks to playlist
    const snapshotId = await spotifyApi.playlists.addItemsToPlaylist(playlist.id, tracks.map(track => track.uri));
    if (snapshotId.length > 0) {
      alert('Playlist Created!');
    } else {
      alert ('Error');
    }
  }
}

export default PlaylistBuilder;