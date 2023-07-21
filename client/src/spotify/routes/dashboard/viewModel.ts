import SpotifyApiSingleton from "@spotify/api/spotifyApiSingleton";
import PlaylistBuilder from "@spotify/builder/playlistBuilder";
import Playlist from "@spotify/builder/sources/playlist";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Playlist as SpotifyPlaylist } from "@spotify/api/types/playlist";
import TargetPlaylist from "@src/spotify/builder/sources/targetPlaylist";

export default function viewModel() {
  const [targetPlaylist, setTargetPlaylist] = useState<TargetPlaylist>();
  const [overwriteExistingPlaylist, setOverwriteExistingPlaylist] = useState(false);
  const [ignoreDuplicates, setIgnoreDuplicates] = useState(false);
  const [minTempo, setMinTempo] = useState("");
  const [maxTempo, setMaxTempo] = useState("");
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

    let min: number | null = Number(minTempo);
    let max: number | null = Number(maxTempo);

    if (isNaN(min) || (minTempo.length === 0)) {
      min = null;
    }
    if (isNaN(max) || (maxTempo.length === 0)) {
      max = null;
    }

    const builder = new PlaylistBuilder(
      playlists, 
      [{type: "tempo", params: {min, max}}], 
      targetPlaylist, 
      {
        overwrite: overwriteExistingPlaylist,
        ignoreDuplicates,
      }
    );
    builder.build();
  }

  const optionsPanelProps = {
    targetPlaylist, setTargetPlaylist,
    overwriteExistingPlaylist, setOverwriteExistingPlaylist,
    ignoreDuplicates, setIgnoreDuplicates,
  };

  return {
    optionsPanelProps: optionsPanelProps,
    userPlaylists: userPlaylistsQuery.data,
    userProfile: userProfileQuery.data,
    minTempo, setMinTempo,
    maxTempo, setMaxTempo,
    sourceCheckboxToggled,
    submit,
  };
}