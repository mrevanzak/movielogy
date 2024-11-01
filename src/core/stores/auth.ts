import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { type SignUpSchema } from '@/components/signup-form';

import { zustandStorage } from '../storage';
import { createSelectors } from '../utils';

interface AuthState {
  user?: SignUpSchema;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (data: SignUpSchema) => void;
  signOut: () => void;
}

const _useAuth = create<AuthState>()(
  persist(
    (set) => ({
      status: 'idle',
      user: undefined,
      signIn: (data) => set({ user: data, status: 'signIn' }),
      signOut: () => set({ user: undefined, status: 'signOut' }),
    }),
    { name: 'auth', storage: createJSONStorage(() => zustandStorage) },
  ),
);

export const useAuth = createSelectors(_useAuth);
