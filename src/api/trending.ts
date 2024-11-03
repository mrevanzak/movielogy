import { queryOptions } from '@tanstack/react-query';

import { client } from './common';
import { movieOrTvSchema } from './schema';

export const getTrending = queryOptions({
  queryKey: ['trending'],
  queryFn: async () => {
    const response = await client.get('trending/all/week');

    return movieOrTvSchema
      .array()
      .parse(
        response.data.results.filter(
          (item: { media_type: 'tv' | 'movie' | 'people' }) =>
            item.media_type !== 'people',
        ),
      );
  },
});
