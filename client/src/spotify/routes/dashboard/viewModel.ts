import SpotifyApiSingleton from "@spotify/api/spotifyApiSingleton";
import Tempo from "@spotify/builder/filters/tempo";
import PlaylistBuilder from "@spotify/builder/playlistBuilder";
import Playlist from "@spotify/builder/sources/playlist";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Playlist as SpotifyPlaylist } from "@spotify/api/types/playlist";
import TargetPlaylist from "@src/spotify/builder/types/targetPlaylist";

export default function viewModel() {
  const [targetPlaylist, setTargetPlaylist] = useState<TargetPlaylist>();
  const [overwriteExistingPlaylist, setOverwriteExistingPlaylist] = useState(false)
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
    const tempoFilter = new Tempo(Number(minTempo), Number(maxTempo));

    if (targetPlaylist === undefined) {
      throw Error('Select a target playlist');
    }

    const builder = new PlaylistBuilder(playlists, [tempoFilter], targetPlaylist, {overwrite: overwriteExistingPlaylist});
    builder.build();
  }

  const optionsPanelProps = {
    targetPlaylist, setTargetPlaylist,
    overwriteExistingPlaylist, setOverwriteExistingPlaylist,
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