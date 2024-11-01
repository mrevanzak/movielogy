import { Env } from '@env';
import axios from 'axios';

export const client = axios.create({
  baseURL: Env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Env.TMDB_API_KEY}`,
  },
});
