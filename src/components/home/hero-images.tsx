import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { Skeleton } from 'moti/skeleton';
import React, { useCallback, useMemo } from 'react';
import { Dimensions, type ListRenderItemInfo, View } from 'react-native';
import Animated, {
  interpolate,
  type SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { type MovieOrTv } from '@/api/schema';
import { getTrending } from '@/api/trending';
import { Env } from '@/core/env';
import { Image, Text } from '@/ui';

import { Gradient } from '../gradient';

const IMAGE_WIDTH = Dimensions.get('window').width;

function Photo({
  item,
  index,
  scrollX,
}: {
  item?: MovieOrTv;
  index: number;
  scrollX: SharedValue<number>;
}) {
  const uri = Env.IMAGE_URL + '/w500' + item?.poster_path;

  const rStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [1.2, 1, 1.2],
          ),
        },
      ],
    };
  });

  return (
    <Link
      href={{
        pathname: '/[id]',
        params: {
          id: String(item?.id) ?? '',
          mediaType: item?.media_type,
          uri,
        },
      }}
    >
      <View className="h-[60vh] overflow-hidden" style={{ width: IMAGE_WIDTH }}>
        <Image
          source={{ uri }}
          className="flex-1"
          style={rStyles}
          sharedTransitionTag={`photo-${item?.id}`}
          onError={(e) => console.log(e)}
        />
        <Gradient />

        <Skeleton>
          {item && (
            <Text className="absolute inset-x-0 bottom-0 p-4 text-xl font-semibold">
              {item.media_type === 'movie' ? item.title : item.name}
            </Text>
          )}
        </Skeleton>
      </View>
    </Link>
  );
}

export function HeroImages() {
  const { data } = useQuery(getTrending);

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x / IMAGE_WIDTH;
  });

  const renderItem = useCallback(
    (props: ListRenderItemInfo<MovieOrTv | undefined>) => (
      <Photo scrollX={scrollX} {...props} />
    ),
    [scrollX],
  );
  const placeholdeData = useMemo(
    () => Array.from({ length: 3 }).map(() => undefined),
    [],
  );

  return (
    <Animated.FlatList
      data={data ?? placeholdeData}
      horizontal
      decelerationRate="fast"
      scrollEventThrottle={1000 / 60}
      renderItem={renderItem}
      className="grow-0"
      snapToInterval={IMAGE_WIDTH}
      onScroll={onScroll}
    />
  );
}
