import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';

import { translate } from '@/core/i18n';
import { Button, ThemedView, View } from '@/ui';

export default function Auth() {
  return (
    <View className="flex-1">
      <Image
        source={require('~/cover.jpeg')}
        className="h-full"
        contentFit="cover"
      />
      <ThemedView className="pb-safe absolute inset-x-0 bottom-0 z-10 rounded-t-xl px-4 py-7 opacity-90">
        <Link href="/(auth)/login" asChild>
          <Button size="lg" label={translate('auth.login')} />
        </Link>
        <Link href="/sign-up" asChild>
          <Button size="lg" label={translate('auth.signup')} variant="ghost" />
        </Link>
      </ThemedView>
    </View>
  );
}
