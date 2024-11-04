import { queryOptions } from '@tanstack/react-query';
import { z } from 'zod';

import { client } from './common';
import { genreSchema, type MediaType, movieSchema, tvSchema } from './schema';

export const getDetails = (type: MediaType, id: string) =>
  queryOptions({
    queryKey: [type, id],
    queryFn: async () => {
      const response = await client.get(`${type}/${id}`);

      if (type === 'movie') {
        return movieSchema
          .omit({ genre_ids: true })
          .extend({
            genres: genreSchema.array(),
            runtime: z.number(),
          })
          .parse({ ...response.data, media_type: 'movie' });
      }

      return tvSchema
        .omit({ genre_ids: true })
        .extend({
          genres: genreSchema.array(),
          number_of_seasons: z.number(),
        })
        .parse({ ...response.data, media_type: 'tv' });
    },
  });
