import { FlashList, type ListRenderItemInfo } from '@shopify/flash-list';
import { useCallback, useMemo } from 'react';
import { Dimensions } from 'react-native';

import { type MovieOrTv } from '@/api';
import { Env } from '@/core/env';
import { Image, Text, View } from '@/ui';

import { Peekable } from '../peekable';

const IMAGE_WIDTH = 128;
const ASPECT_RATIO = 2 / 3;
const IMAGE_HEIGHT = IMAGE_WIDTH / ASPECT_RATIO;

type PhotoProps = {
  item?: MovieOrTv;
  type: string;
};

function Photo({ item }: PhotoProps) {
  const uri = Env.IMAGE_URL + '/w185' + item?.poster_path;

  if (!item) {
    return null;
  }

  return (
    <Peekable item={item} style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}>
      <Image
        source={{ uri }}
        className="flex-1 rounded-lg"
        onError={(e) => console.log(e)}
      />
    </Peekable>
  );
}

type SectionListProps = {
  title: string;
  data?: MovieOrTv[];
};

export function SectionList({ title, data }: SectionListProps) {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<MovieOrTv | undefined>) => (
      <Photo item={item} type={title} />
    ),
    [title],
  );

  const placeholdeData = useMemo(
    () => Array.from({ length: 3 }).map(() => undefined),
    [],
  );

  const keyExtractor = useCallback(
    (item: MovieOrTv | undefined, index: number) =>
      `${item?.id ?? 'placeholder'}-${index}`,
    [],
  );

  return (
    <View className="flex-1 gap-3 p-4">
      <Text className="text-xl font-semibold">{title}</Text>
      <View className="grow">
        <FlashList
          horizontal
          data={data ?? placeholdeData}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-2" />}
          estimatedListSize={{
            width: Dimensions.get('window').width,
            height: IMAGE_HEIGHT,
          }}
          estimatedItemSize={IMAGE_WIDTH}
        />
      </View>
    </View>
  );
}
