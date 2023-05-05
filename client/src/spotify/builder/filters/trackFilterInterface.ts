import Track from "@spotify/builder/track";

interface TrackFilter {
  filter(value: Track): boolean;
}

export default TrackFilter;