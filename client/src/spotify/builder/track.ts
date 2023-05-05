import { AudioFeatures } from "spotify-api.js";

class Track {
  id: string;
  uri: string;
  audioFeatures?: AudioFeatures;

  constructor(id: string, uri: string) {
    this.id = id;
    this.uri = uri;
  }

  addAudioFeatures(audioFeatures: AudioFeatures) {
    this.audioFeatures = audioFeatures;
  }
}

export default Track;