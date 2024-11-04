import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { type MovieOrTv } from '@/api';

import { type SignUpSchema } from '../schemas/auth';
import { zustandStorage } from '../storage';
import { createSelectors } from '../utils';

const users = new Map<string, SignUpSchema>();
users.set('mrevanzak@gmail.com', {
  email: 'mrevanzak@gmail.com',
  password: '123456',
  username: 'mrevanzak',
});

interface FavoritesState {
  favorites: MovieOrTv[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (item: MovieOrTv) => void;
}

const _useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      isFavorite: (id) => {
        return get().favorites.some((fav) => fav.id === id);
      },
      toggleFavorite: (item) => {
        set((state) => {
          if (state.favorites.some((fav) => fav.id === item.id)) {
            return {
              favorites: state.favorites.filter((fav) => fav.id !== item.id),
            };
          }

          return { favorites: [...state.favorites, item] };
        });
      },
    }),
    {
      name: 'fav',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export const useFavorites = createSelectors(_useFavorites);
