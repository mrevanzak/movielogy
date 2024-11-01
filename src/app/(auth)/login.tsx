import { Link } from 'expo-router';
import React from 'react';

import { LoginForm } from '@/components/login-form';
import { Text } from '@/ui';
import { ThemedView } from '@/ui/themed-view';

export default function Login() {
  return (
    <ThemedView className="pt-safe justify-center gap-7 p-4">
      <Text className="text-center text-2xl font-bold">Login</Text>
      <LoginForm />
      <Text className="text-center text-sm text-neutral-500">
        Haven't made an account?{' '}
        <Link href="/sign-up" className="text-primary">
          Register
        </Link>
      </Text>
    </ThemedView>
  );
}
