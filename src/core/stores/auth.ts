import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { showErrorMessage } from '@/ui';

import { type LoginSchema, type SignUpSchema } from '../schemas/auth';
import { zustandStorage } from '../storage';
import { createSelectors } from '../utils';

const users = new Map<string, SignUpSchema>();
users.set('mrevanzak@gmail.com', {
  email: 'mrevanzak@gmail.com',
  password: '123456',
  username: 'mrevanzak',
});

interface AuthState {
  user?: SignUpSchema;
  status: 'idle' | 'signOut' | 'signIn';
  signUp: (data: SignUpSchema) => void;
  login: (data: LoginSchema) => void;
  signOut: () => void;
}

const _useAuth = create<AuthState>()(
  persist(
    (set) => ({
      status: 'idle',
      user: undefined,
      signUp: (data) => {
        if (users.has(data.email)) {
          showErrorMessage('Email already exists');
          return;
        }
        users.set(data.email, data);
        set({ user: data, status: 'signIn' });
      },
      login: (data) => {
        const user = users.get(data.email);
        if (!user || user.password !== data.password) {
          showErrorMessage('Invalid email or password');
          return;
        }
        set({ user, status: 'signIn' });
      },
      signOut: () => set({ user: undefined, status: 'signOut' }),
    }),
    { name: 'auth', storage: createJSONStorage(() => zustandStorage) },
  ),
);

export const useAuth = createSelectors(_useAuth);
