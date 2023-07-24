import SpotifyApiSingleton from "@spotify/api/spotifyApiSingleton";
import PlaylistBuilder from "@spotify/builder/playlistBuilder";
import Playlist from "@spotify/builder/sources/playlist";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Playlist as SpotifyPlaylist } from "@spotify/api/types/playlist";
import TargetPlaylist from "@src/spotify/builder/sources/targetPlaylist";
import FilterSummary from '@src/spotify/types/FilterSummary';

export default function viewModel() {
  const [targetPlaylist, setTargetPlaylist] = useState<TargetPlaylist>();
  const [overwriteExistingPlaylist, setOverwriteExistingPlaylist] = useState(false);
  const [ignoreDuplicates, setIgnoreDuplicates] = useState(false);
  const [filters, setFilters] = useState<Map<string, FilterSummary>>(new Map([["12345", {type: 'tempo', params: {minTempo: '', maxTempo: ''}}]]));
  const [sources, setSources] = useState<SpotifyPlaylist[]>([]);

  const spotifyApi = SpotifyApiSingleton.getInstance();

  const userPlaylistsQuery = useQuery(
    ['spotify-current-users-playlists'], () => spotifyApi.playlists.getCurrentUsersPlaylists()
  );
  const userProfileQuery = useQuery(
    ['spotify-get-current-users-profile'], () => spotifyApi.users.getCurrentUsersProfile()
  );

  const sourceCheckboxToggled = (checked: boolean, playlist: SpotifyPlaylist) => {
    if (checked) {
      setSources([...sources, playlist]);
    } else {
      setSources(sources.filter((value) => value !== playlist));
    }
  };

  const submit = () => {
    const playlists = sources.map((source) => new Playlist(source));

    if (targetPlaylist === undefined) {
      throw Error('Select a target playlist');
    }

    const builder = new PlaylistBuilder({
      sources: playlists, 
      filters: Array.from(filters.values()),
      targetPlaylist, 
      options: {
        overwrite: overwriteExistingPlaylist,
        ignoreDuplicates,
      }
  });
    builder.build();
  }

  const optionsPanelProps = {
    targetPlaylist, setTargetPlaylist,
    overwriteExistingPlaylist, setOverwriteExistingPlaylist,
    ignoreDuplicates, setIgnoreDuplicates,
  };

  const filtersPanelProps = {
    filters, setFilters,
  }

  return {
    optionsPanelProps: optionsPanelProps,
    userPlaylists: userPlaylistsQuery.data,
    userProfile: userProfileQuery.data,
    filtersPanelProps,
    sourceCheckboxToggled,
    submit,
  };
}