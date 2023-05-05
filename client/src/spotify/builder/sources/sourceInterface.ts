import Track from "../track";

interface Source {
  getTracks(): Promise<Track[]>,
}

export default Source;