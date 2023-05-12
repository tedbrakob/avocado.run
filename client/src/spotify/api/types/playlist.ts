import { z } from "zod";

export const playlistSchema = z.object({
  collaborative: z.boolean(),
  description: z.string(),
  external_urls: z.object({
      spotify: z.string()
  }),
  href: z.string(),
  id: z.string(),
  images: z.array(z.object({
    height: z.number().nullable(),
    url: z.string(),
    width: z.number().nullable(),
  })),
  name: z.string(),
  owner: z.object({
      display_name: z.string(),
      external_urls: z.object({
          spotify: z.string(),
      }),
      href: z.string(),
      id: z.string(),
      type: z.string(),
      uri: z.string(),
  }),
  primary_color: z.null(),
  public: z.boolean(),
  snapshot_id: z.string(),
  tracks: z.object({
      href:  z.string(),
      total: z.number(),
  }),
  type:z.literal("playlist"),
  uri: z.string(),
});

export type Playlist = z.infer<typeof playlistSchema>;