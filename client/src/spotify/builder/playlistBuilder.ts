import SpotifyApiSingleton from "@spotify/api/spotifyApiSingleton";
import TrackFilter from "./filters/trackFilterInterface";
import Source from "./sources/sourceInterface";
import Track from "./track";
import TargetPlaylist from "./types/targetPlaylist";

type PlaylistBuilderOptions = {
  overwrite: boolean
};

class PlaylistBuilder {
  sources: Source[];
  filters: TrackFilter[];
  targetPlaylist: TargetPlaylist;
  overwrite: boolean;

  constructor(sources: Source[], filters: TrackFilter[], targetPlaylist: TargetPlaylist, options?: PlaylistBuilderOptions) {
    this.sources = sources;
    this.filters = filters;
    this.targetPlaylist = targetPlaylist;
    this.overwrite = options?.overwrite ?? false;
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
    let playlistId = this.targetPlaylist.id;
    if (this.targetPlaylist.creating) {
      const playlist = await spotifyApi.playlists.createPlaylist({name: this.targetPlaylist.name});
      playlistId = playlist.id;
    }

    let snapshotId = '';
    //add filtered tracks to playlist
    if (this.overwrite) {
      snapshotId = await spotifyApi.playlists.replacePlaylistItems(playlistId, tracks.map(track => track.uri));
    } else {
      snapshotId = await spotifyApi.playlists.addItemsToPlaylist(playlistId, tracks.map(track => track.uri));
    }

    if (snapshotId.length > 0) {
      alert('Playlist Created!');
    } else {
      alert ('Error');
    }
  }
}

export default PlaylistBuilder;