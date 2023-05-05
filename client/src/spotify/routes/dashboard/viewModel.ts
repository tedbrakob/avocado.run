import SpotifyPlaylist from "@src/spotify/api/types/playlist"
import SpotifyApiSingleton from "@spotify/api/spotifyApiSingleton";
import Tempo from "@spotify/builder/filters/tempo";
import PlaylistBuilder from "@spotify/builder/playlistBuilder";
import Playlist from "@spotify/builder/sources/playlist";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function viewModel() {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [minTempo, setMinTempo] = useState("");
  const [maxTempo, setMaxTempo] = useState("");
  const [sources, setSources] = useState<SpotifyPlaylist[]>([]);

  const spotifyApi = SpotifyApiSingleton.getInstance();

  const userPlaylistsQuery = useQuery(
    ['spotify-playlists'], () => spotifyApi.playlists.getCurrentUsersPlaylists()
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

    const builder = new PlaylistBuilder(playlists, [tempoFilter], newPlaylistName);
    builder.build();
  }

  return {
    userPlaylistsQuery,
    newPlaylistName, setNewPlaylistName,
    minTempo, setMinTempo,
    maxTempo, setMaxTempo,
    sourceCheckboxToggled,
    submit,
  };
}