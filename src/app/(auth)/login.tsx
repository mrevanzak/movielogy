import { Link } from 'expo-router';
import React from 'react';

import { LoginForm } from '@/components/auth/login-form';
import { translate } from '@/core/i18n';
import { Text } from '@/ui';
import { ThemedView } from '@/ui/themed-view';

export default function Login() {
  return (
    <ThemedView className="pt-safe justify-center gap-7 p-4">
      <Text className="text-center text-2xl font-bold">
        {translate('auth.login')}
      </Text>
      <LoginForm />
      <Text className="text-center text-sm text-neutral-500">
        {translate('auth.no_account')}{' '}
        <Link href="/sign-up" className="text-primary">
          {translate('auth.register')}
        </Link>
      </Text>
    </ThemedView>
  );
}
