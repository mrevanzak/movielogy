import { useReactQueryDevTools } from '@dev-plugins/react-query';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { focusManager } from '@tanstack/react-query';
import * as React from 'react';
import type { AppStateStatus } from 'react-native';
import { AppState, Platform } from 'react-native';

import { errorHandling } from '@/core/utils';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => errorHandling(error),
  }),
  mutationCache: new MutationCache({
    onError: (error) => errorHandling(error),
  }),
});

export function APIProvider({ children }: { children: React.ReactNode }) {
  useReactQueryDevTools(queryClient);

  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
