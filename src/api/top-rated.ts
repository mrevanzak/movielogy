import { queryOptions } from '@tanstack/react-query';

import { client } from './common';
import {
  type MediaType,
  type Movie,
  movieSchema,
  type Tv,
  tvSchema,
} from './schema';

export const getTopRated = (type: MediaType) =>
  queryOptions({
    queryKey: ['top-rated', type],
    queryFn: async () => {
      const response = await client.get(`${type}/top_rated`);

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
