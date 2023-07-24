import Track from "../track";
import TrackFilter from "./trackFilterInterface";

class Tempo implements TrackFilter {
  minTempo: number;
  maxTempo: number;

  constructor(params: {minTempo: string, maxTempo: string}) {
    this.minTempo = Number(params.minTempo);
    this.maxTempo = Number(params.maxTempo);

    if (isNaN(this.minTempo) || (params.minTempo.length === 0)) {
      this.minTempo = 0;
    }
    if (isNaN(this.maxTempo) || (params.maxTempo.length === 0)) {
      this.maxTempo = Infinity;
    }
  }

  filter = (track: Track): boolean => {
    if (track.audioFeatures === undefined) {
      return false;
    }
    
    return this.minTempo <= track.audioFeatures.tempo && track.audioFeatures.tempo <= this.maxTempo;
  }
}

export default Tempo;