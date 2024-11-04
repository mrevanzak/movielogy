import { z } from 'zod';

export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type Genre = z.infer<typeof genreSchema>;

const baseSchema = z.object({
  backdrop_path: z.string().nullable(),
  id: z.number(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  adult: z.boolean(),
  original_language: z.string(),
  genre_ids: z.array(z.number()),
  popularity: z.number(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const tvSchema = baseSchema.extend({
  name: z.string(),
  original_name: z.string(),
  first_air_date: z.string().date().or(z.string().optional()),
  media_type: z.enum(['tv']),
});
export const tvDetailsSchema = tvSchema.omit({ genre_ids: true }).extend({
  genres: genreSchema.array(),
  number_of_seasons: z.number(),
});
export type Tv = z.infer<typeof tvSchema>;
export type TvDetails = z.infer<typeof tvDetailsSchema>;

export const movieSchema = baseSchema.extend({
  title: z.string(),
  original_title: z.string(),
  release_date: z.string().date().or(z.string().optional()),
  media_type: z.enum(['movie']),
});
export const movieDetailsSchema = movieSchema.omit({ genre_ids: true }).extend({
  genres: genreSchema.array(),
  runtime: z.number(),
});
export type Movie = z.infer<typeof movieSchema>;
export type MovieDetails = z.infer<typeof movieDetailsSchema>;

export const movieOrTvSchema = z.discriminatedUnion('media_type', [
  tvSchema,
  movieSchema,
]);

export type MovieOrTv = z.infer<typeof movieOrTvSchema>;

export type MediaType = MovieOrTv['media_type'];

export function createPaginatedSchema<T extends z.ZodTypeAny>(schema: T) {
  return z.object({
    page: z.number(),
    results: z.array(schema),
    total_pages: z.number(),
    total_results: z.number(),
  });
}
