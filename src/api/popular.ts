import { queryOptions } from '@tanstack/react-query';

import { client } from './common';
import {
  type MediaType,
  type Movie,
  movieSchema,
  type Tv,
  tvSchema,
} from './schema';

export const getPopular = (type: MediaType) =>
  queryOptions({
    queryKey: ['popular', type],
    queryFn: async () => {
      const response = await client.get(`${type}/popular`);

      if (type === 'movie')
        return movieSchema.array().parse(
          response.data.results.map((item: Movie) => ({
            ...item,
            media_type: 'movie',
          })),
        );
      return tvSchema
        .array()
        .parse(
          response.data.results.map((item: Tv) => ({
            ...item,
            media_type: 'tv',
          })),
        );
    },
  });
