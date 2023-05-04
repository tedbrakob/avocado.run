type Playlist = {
  collaborative: boolean,
  description: string,
  external_urls: {
      spotify: string
  },
  href: string,
  id: string,
  images: {
    "height": null,
    "url": string,
    "width": null,
  }[],
  name: string,
  owner: {
      "display_name": string,
      "external_urls": {
          "spotify": string,
      },
      "href": string,
      "id": string,
      "type": string,
      "uri": string,
  },
  primary_color: null,
  public: boolean,
  snapshot_id:  string,
  tracks: {
      "href":  string,
      "total": number
  },
  type: "playlist",
  uri: string,
};

export default Playlist;