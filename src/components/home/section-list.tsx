import { useCallback, useMemo } from 'react';
import { FlatList, type ListRenderItemInfo, View } from 'react-native';

import { type MovieOrTv } from '@/api';
import { Env } from '@/core/env';
import { Image, Text } from '@/ui';

function Photo({ item }: { item?: MovieOrTv }) {
  if (!item) {
    return null;
  }

  return (
    <View className="aspect-[2/3] w-32 overflow-hidden">
      <Image
        source={{ uri: Env.IMAGE_URL + '/w500' + item.poster_path }}
        className="flex-1 rounded-lg"
        onError={(e) => console.log(e)}
      />
    </View>
  );
}

type SectionListProps = {
  title: string;
  data?: MovieOrTv[];
};

export function SectionList({ title, data }: SectionListProps) {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<MovieOrTv | undefined>) => (
      <Photo item={item} />
    ),
    [],
  );

  const placeholdeData = useMemo(
    () => Array.from({ length: 3 }).map(() => undefined),
    [],
  );

  return (
    <View className="flex-1 gap-3 p-4">
      <Text className="text-xl font-semibold">{title}</Text>
      <FlatList
        horizontal
        data={data ?? placeholdeData}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-3"
      />
    </View>
  );
}
