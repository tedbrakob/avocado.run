import Track from "../track";
import TrackFilter from "./trackFilterInterface";

class Tempo implements TrackFilter {
  min: number;
  max: number;

  constructor(min?: number, max?: number) {
    this.min = min ?? 0;
    this.max = max ?? Infinity;
  }

  filter(track: Track): boolean {
    if (track.audioFeatures === undefined) {
      return false;
    }
    
    return this.min <= track.audioFeatures.tempo && track.audioFeatures.tempo <= this.max;
  }
}

export default Tempo;