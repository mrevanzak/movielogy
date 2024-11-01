import { Link } from 'expo-router';
import React from 'react';

import { SignupForm } from '@/components/signup-form';
import { Text } from '@/ui';
import { ThemedView } from '@/ui/themed-view';

export default function SignUp() {
  return (
    <ThemedView className="pt-safe justify-center gap-7 p-4">
      <Text className="text-center text-2xl font-bold">Sign Up</Text>
      <SignupForm />
      <Text className="text-center text-sm text-neutral-500">
        Already have an account?{' '}
        <Link href="/login" className="text-primary">
          Login
        </Link>
      </Text>
    </ThemedView>
  );
}
