import { AxiosResponse } from "axios";
import AudioFeatures from "../types/audioFeatures";
import ApiLibrary from "./apiLibrary";

class Tracks extends ApiLibrary {
  async getAudioFeaturesBulk(trackIds: string[]): Promise<AudioFeatures[]> {
    const maxTracksPerRequest = 100;
    const promises: Promise<AxiosResponse>[] = [];
    
    for (let i = 0; i < trackIds.length; i += maxTracksPerRequest) {
      const requestTrackIds = trackIds.slice(i, i + maxTracksPerRequest);
      promises.push(this.client.fetch('GET', 'audio-features', {ids: requestTrackIds}));
    }

    const responses = await Promise.all(promises);
    const result: AudioFeatures[] = [];

    for (const response of responses) {
      result.push(...response.data.audio_features)
    }

    return result;
  }
}

export default Tracks;