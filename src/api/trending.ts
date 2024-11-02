import { queryOptions } from '@tanstack/react-query';
import { z } from 'zod';

import { client } from './common';

const baseSchema = z.object({
  backdrop_path: z.string(),
  id: z.number(),
  overview: z.string(),
  poster_path: z.string(),
  adult: z.boolean(),
  original_language: z.string(),
  genre_ids: z.array(z.number()),
  popularity: z.number(),
  vote_average: z.number(),
  vote_count: z.number(),
});

const tvSchema = baseSchema.extend({
  name: z.string(),
  original_name: z.string(),
  media_type: z.enum(['tv']),
  first_air_date: z.string().date(),
});

const movieSchema = baseSchema.extend({
  title: z.string(),
  original_title: z.string(),
  media_type: z.enum(['movie']),
  release_date: z.string().date(),
});

const schema = z.discriminatedUnion('media_type', [tvSchema, movieSchema]);

export const getTrending = queryOptions({
  queryKey: ['trending'],
  queryFn: async () => {
    const response = await client.get('trending/all/week');

    return schema
      .array()
      .parse(
        response.data.results.filter(
          (item: { media_type: 'tv' | 'movie' | 'people' }) =>
            item.media_type !== 'people',
        ),
      );
  },
});

export type Trending = z.infer<typeof schema>;
