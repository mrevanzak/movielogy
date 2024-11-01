import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { getTrending } from '@/api/trending';
import { Env } from '@/core/env';
import { Image, View } from '@/ui';

export default function Feed() {
  const { data } = useQuery(getTrending);

  return (
    <View className="flex-1 items-center justify-center">
      <FlashList
        data={data}
        horizontal
        decelerationRate="fast"
        scrollEventThrottle={1000 / 60}
        renderItem={({ item }) => (
          <Image
            source={Env.IMAGE_URL + '/w342' + item.poster_path}
            contentFit="cover"
            className="aspect-[2/3] w-80 rounded-lg"
            onError={(e) => {
              console.error(e.error);
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        className="grow-0"
        estimatedItemSize={200}
        ItemSeparatorComponent={() => <View className="w-4" />}
      />
    </View>
  );
}
