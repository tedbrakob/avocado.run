import SpotifyApiSingleton from "@spotify/api/spotifyApiSingleton";
import TrackFilter from "./filters/trackFilterInterface";
import Source from "./sources/sourceInterface";
import Track from "./track";
import TargetPlaylist from "./sources/targetPlaylist";
import removeDuplicateItems from "./removeDuplicateItems";

type PlaylistBuilderOptions = {
  overwrite: boolean,
  ignoreDuplicates: boolean,
};

class PlaylistBuilder {
  sources: Source[];
  filters: TrackFilter[];
  targetPlaylist: TargetPlaylist;
  overwrite: boolean;
  ignoreDuplicates: boolean;

  constructor (sources: Source[], filters: TrackFilter[], targetPlaylist: TargetPlaylist, options?: PlaylistBuilderOptions) {
    this.sources = sources;
    this.filters = filters;
    this.targetPlaylist = targetPlaylist;
    this.overwrite = options?.overwrite ?? false;
    this.ignoreDuplicates = options?.ignoreDuplicates ?? false;
  }

  async build () {
    const tracks = await this.#getSourceTracks();
    const filteredTracks = this.#filterTracks(tracks);
    const playlistId = await this.#getTargetPlaylistId();

    let snapshotId = '';

    let trackUris = filteredTracks.map(track => track.uri);
    trackUris = await this.#removeDuplicateTracks(trackUris);

    const spotifyApi = SpotifyApiSingleton.getInstance();

    //add filtered tracks to playlist
    if (this.overwrite) {
      snapshotId = await spotifyApi.playlists.replacePlaylistItems(playlistId, trackUris);
    } else {
      snapshotId = await spotifyApi.playlists.addItemsToPlaylist(playlistId, trackUris);
    }

    if (snapshotId.length > 0) {
      alert('Playlist Created!');
    } else {
      alert ('Error');
    }
  }

  async #getSourceTracks (): Promise<Track[]> {
    //get all source tracks
    const tracks: Track[] = [];
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

    return tracks;
  }

  #filterTracks (tracks: Track[]): Track[] {
    for (const filter of this.filters) {
      tracks = tracks.filter((track) => filter.filter(track));
    }

    return tracks;
  }

  async #getTargetPlaylistId (): Promise<string> {
    let playlistId = this.targetPlaylist.id;

    if (this.targetPlaylist.creating) {
      const spotifyApi = SpotifyApiSingleton.getInstance();
      const playlist = await spotifyApi.playlists.createPlaylist({name: this.targetPlaylist.name});
      playlistId = playlist.id;
    }

    return playlistId;
  }

  async #removeDuplicateTracks (trackUris: string[]): Promise<string[]> {
    const additionalLists = (
      this.overwrite ? [] : [(await this.targetPlaylist.getTracks()).map(track => track.uri)]
    );
    
    const deduplicatedTrackUris = removeDuplicateItems({
      sourceList: trackUris,
      additionalLists,
    });

    return deduplicatedTrackUris;
  }
}

export default PlaylistBuilder;