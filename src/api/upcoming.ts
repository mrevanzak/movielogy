import { queryOptions } from '@tanstack/react-query';

import { client } from './common';
import { type Movie, movieSchema } from './schema';

export const getUpcoming = queryOptions({
  queryKey: ['upcoming'],
  queryFn: async () => {
    const response = await client.get('movie/upcoming');

    return movieSchema.array().parse(
      response.data.results.map((item: Movie) => ({
        ...item,
        media_type: 'movie',
      })),
    );
  },
});
