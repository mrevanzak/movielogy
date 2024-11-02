import { queryOptions } from '@tanstack/react-query';

import { client } from './common';
import {
  type MediaType,
  type Movie,
  movieSchema,
  type Tv,
  tvSchema,
} from './schema';

export const getNowPlaying = (type: MediaType) =>
  queryOptions({
    queryKey: ['now-playing', type],
    queryFn: async () => {
      const response = await client.get(
        `${type}/${type === 'movie' ? 'now_playing' : 'on_the_air'}`,
      );

      if (type === 'movie')
        return movieSchema.array().parse(
          response.data.results.map((item: Movie) => ({
            ...item,
            media_type: 'movie',
          })),
        );
      return tvSchema.array().parse(
        response.data.results.map((item: Tv) => ({
          ...item,
          media_type: 'tv',
        })),
      );
    },
  });
