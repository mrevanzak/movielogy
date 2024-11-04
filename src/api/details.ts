import { queryOptions } from '@tanstack/react-query';

import { client } from './common';
import { type MediaType, movieDetailsSchema, tvDetailsSchema } from './schema';

export const getDetails = (type: MediaType, id: string) =>
  queryOptions({
    queryKey: [type, id],
    queryFn: async () => {
      const response = await client.get(`${type}/${id}`);

      if (type === 'movie') {
        return movieDetailsSchema.parse({
          ...response.data,
          media_type: 'movie',
        });
      }

      return tvDetailsSchema.parse({ ...response.data, media_type: 'tv' });
    },
  });
