import { Image } from 'expo-image';
import React from 'react';

import { Button, View } from '@/ui';
import { ThemedView } from '@/ui/themed-view';

export default function Auth() {
  return (
    <View className="flex-1">
      <Image
        source={require('~/cover.jpeg')}
        className="h-full"
        contentFit="cover"
      />
      <ThemedView className="pb-safe absolute inset-x-0 bottom-0 z-10 rounded-t-xl px-4 py-7 opacity-90">
        <Button size="lg" label="Login" />
        <Button size="lg" label="Sign Up" variant="ghost" />
      </ThemedView>
    </View>
  );
}
