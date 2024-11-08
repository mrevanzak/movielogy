import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@/core/stores/auth';

export default function AuthLayout() {
  const status = useAuth.use.status();

  if (status === 'signIn') {
    return <Redirect href="/" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    />
  );
}
