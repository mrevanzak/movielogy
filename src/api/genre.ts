import { queryOptions } from '@tanstack/react-query';

import { client } from './common';
import { genreSchema, type MediaType } from './schema';

export const getGenre = (type: MediaType, genreIds: string[]) =>
  queryOptions({
    queryKey: ['genre', type, genreIds],
    queryFn: async () => {
      const response = await client.get(`genre/${type}/list`);

      const parse = genreSchema.array().parse(response.data.genres);

      return parse.filter((genre) => genreIds.includes(genre.id.toString()));
    },
  });
