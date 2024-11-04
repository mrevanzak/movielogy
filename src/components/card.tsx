import { View } from 'react-native';

import { type MovieOrTv } from '@/api';
import { Env } from '@/core/env';
import { Image, Text } from '@/ui';

import { Peekable } from './peekable';

export function Card({ item }: { item: MovieOrTv }) {
  const date =
    item.media_type === 'movie' ? item.release_date : item.first_air_date;
  const uri = Env.IMAGE_URL + '/w92' + item.poster_path;

  return (
    <Peekable item={item}>
      <View className="mx-4 flex-row gap-4">
        <Image
          source={{ uri }}
          className="aspect-[2/3] w-24 rounded-lg"
          withSkeleton
        />

        <View className="flex-1">
          <Text className="text-lg font-semibold">
            {item.media_type === 'movie' ? item.title : item.name}
          </Text>
          {date && (
            <Text className="text-sm opacity-60">
              {new Date(date).getFullYear()}
            </Text>
          )}
          <Text className="">
            ⭐️ {Number(item.vote_average).toFixed(1)} ({item.vote_count})
          </Text>
        </View>
      </View>
    </Peekable>
  );
}
