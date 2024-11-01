import { AxiosError } from 'axios';
import { Linking } from 'react-native';
import { ZodError } from 'zod';
import { fromError } from 'zod-validation-error';
import type { StoreApi, UseBoundStore } from 'zustand';

import { showErrorMessage } from '@/ui';

export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
}

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export function errorHandling(error: unknown) {
  if (error instanceof ZodError) {
    const validationError = fromError(error);
    showErrorMessage('There was an error with the data received');
    console.error(validationError.toString());
    return;
  }

  if (error instanceof AxiosError) {
    showErrorMessage(
      error.response?.data?.status_message ??
        'Network error, please try again later',
    );
    console.error(error);
    return;
  }

  showErrorMessage();
}
