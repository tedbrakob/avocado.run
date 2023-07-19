import { AxiosResponse } from "axios";
import PaginationOptions from "@spotify/api/types/paginationOptions";
import ApiLibrary from "./apiLibrary";
import { Playlist, playlistSchema } from "@spotify/api/types/playlist";
import { z } from "zod";

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

  replacePlaylistItems = async (playlistId: string, uris: string[]) => {
    await this.client.fetch('PUT', `playlists/${playlistId}/tracks`, {
      body: {
        uris: [],
      }
    });

    const snapshotId = await this.addItemsToPlaylist(playlistId, uris);
    return snapshotId;
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

  getCurrentUsersPlaylists = async (options?: PaginationOptions): Promise<Playlist[]> => {
    const endpoint = 'me/playlists';
    const responses = await this.fetchItems(endpoint, options);
    const playlists: Playlist[] = [];

    for (const response of responses) {
      z.array(playlistSchema).parse(response.data.items);
      playlists.push(...response.data.items);
    }
    
    return playlists;
  }

  createPlaylist = async (options: {name: string, description?: string, userId?: string}) => {
    let userId = options.userId;
    if (options.userId === undefined) {
      const user = await this.client.users.getCurrentUsersProfile();
      userId = user.id;
    }

    const playlist = await this.client.fetch('POST', `users/${userId}/playlists`,
      {
        body: {
          name: options.name,
          public: false,
          description: options.description,
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