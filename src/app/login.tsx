import { Link, useRouter } from 'expo-router';
import React from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/core';
import { Text } from '@/ui';
import { ThemedView } from '@/ui/themed-view';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    console.log(data);
    signIn({ access: 'access-token', refresh: 'refresh-token' });
    router.push('/');
  };
  return (
    <ThemedView className="pt-safe justify-center gap-7 p-4">
      <Text className="text-center text-2xl font-bold">Login</Text>
      <LoginForm onSubmit={onSubmit} />
      <Text className="text-center text-sm text-neutral-500">
        Haven't made an account?{' '}
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </Text>
    </ThemedView>
  );
}
