import { AxiosResponse } from "axios";
import PaginationOptions from "../types/paginationOptions";
import ApiLibrary from "./apiLibrary";

class Playlists extends ApiLibrary {
  //TODO add other options (market, fields)
  getPlaylistItems = async (id: string, options?: PaginationOptions) => {
    const endpoint = `playlists/${id}/tracks`;
    const responses = await this.fetchItems(endpoint, options);
    const tracks = <any>[];

    for (const response of responses) {
      tracks.push(...response.data.items);
    }
    
    return tracks.map(track => track.track);
  }

  addItemsToPlaylist = async (playlistId: string, uris: string[]) => {
    const itemsPerRequest = 100;
    let snapshotId = '';

    //insert chunks synchronously to preserve ordering
    for (let i = 0; i < uris.length; i += itemsPerRequest) {
      const urisChunk = uris.slice(i, i + itemsPerRequest);
      const response = await this.client.fetch('POST', `playlists/${playlistId}/tracks`, {
        body: {
          uris: urisChunk,
        }
      });

      snapshotId = response.data.snapshot_id;
    }

    return snapshotId;
  }

  getCurrentUsersPlaylists = async (options?: PaginationOptions) => {
    const endpoint = 'me/playlists';
    const responses = await this.fetchItems(endpoint, options);
    const playlists = <any>[];

    for (const response of responses) {
      playlists.push(...response.data.items);
    }
    
    return playlists;
  }

  createPlaylist = async (name: string, description: string = '') => {
    //get logged in user
    const user = await this.client.users.getCurrentUsersProfile();
    const playlist = await this.client.fetch('POST', `users/${user.id}/playlists`,
      {
        body: {
          name,
          public: false,
          description,
        }
      }
    );

    return playlist.data;
  }

  fetchItems = async (endpoint: string, options?: PaginationOptions) => {
    const requestedLimit = options?.limit ?? Infinity;
    const initialOffset = options?.offset ?? 0;
    const pageSize = Math.min(requestedLimit, 50);
    let offset = initialOffset;

    const responses: AxiosResponse[] = [];

    let total = options?.knownTotal ?? -1;
    if (total === -1) {
      const response = await this.client.fetch('GET', endpoint, {pagination: {limit: pageSize, offset}});
      total = response.data.total;
      responses.push(response);
      offset += pageSize;
    }

    const end = Math.min(initialOffset + requestedLimit, total) - 1;

    const promises:Promise<AxiosResponse>[] = [];

    while (offset <= end && pageSize < requestedLimit) {
      const limit = Math.min(pageSize, (end - offset) + 1);
      promises.push(this.client.fetch('GET', endpoint, {pagination: {offset, limit}}));
      offset += limit;
    }

    responses.push(...await Promise.all(promises));
    return responses;
  }
}

export default Playlists;