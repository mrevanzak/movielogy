import { infiniteQueryOptions } from '@tanstack/react-query';

import { client } from './common';
import { createPaginatedSchema, movieOrTvSchema } from './schema';

export const getSearch = (query: string) =>
  infiniteQueryOptions({
    queryKey: ['search', query],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await client.get('search/multi', {
        params: { query, page: pageParam },
      });
      return createPaginatedSchema(movieOrTvSchema).parse({
        ...response.data,
        results: response.data.results.filter(
          (item: { media_type: 'tv' | 'movie' | 'person' }) =>
            item.media_type !== 'person',
        ),
      });
    },
    enabled: query !== '',
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
  });
