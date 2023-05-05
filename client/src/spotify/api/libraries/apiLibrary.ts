import SpotifyApi from "../spotifyApi";

class ApiLibrary {
  client: SpotifyApi;

  constructor(client: SpotifyApi) {
    this.client = client;
  }
}

export default ApiLibrary;