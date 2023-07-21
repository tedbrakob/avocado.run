import Track from "../track";
import TrackFilter from "./trackFilterInterface";

class Tempo implements TrackFilter {
  min: number;
  max: number;

  constructor(params: {min?: number, max?: number}) {
    console.log(params);

    this.min = params.min ?? 0;
    this.max = params.max ?? Infinity;
  }

  filter = (track: Track): boolean => {
    if (track.audioFeatures === undefined) {
      return false;
    }
    
    return this.min <= track.audioFeatures.tempo && track.audioFeatures.tempo <= this.max;
  }
}

export default Tempo;