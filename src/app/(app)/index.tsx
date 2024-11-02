import { useQuery } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import Animated, {
  interpolate,
  type SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { getTrending, type Trending } from '@/api/trending';
import { Gradient } from '@/components/gradient';
import { Env } from '@/core/env';
import { Image, Text, View } from '@/ui';

const IMAGE_WIDTH = Dimensions.get('window').width;

function Photo({
  item,
  index,
  scrollX,
}: {
  item: Trending;
  index: number;
  scrollX: SharedValue<number>;
}) {
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
    <View className="h-[60vh] w-screen overflow-hidden">
      <Image
        source={{ uri: Env.IMAGE_URL + '/w500' + item.poster_path }}
        className="flex-1"
        style={rStyles}
        onError={(e) => console.log(e)}
      />
      <Gradient />

      <Text className="absolute inset-x-0 bottom-0 p-4 text-xl font-semibold">
        {item.media_type === 'movie' ? item.title : item.name}
      </Text>
    </View>
  );
}

export default function Home() {
  const { data } = useQuery(getTrending);

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x / IMAGE_WIDTH;
  });

  const renderItem = useCallback(
    (props: { item: Trending; index: number }) => (
      <Photo scrollX={scrollX} {...props} />
    ),
    [scrollX],
  );

  return (
    <ScrollView className="flex-1 gap-5">
      <StatusBar style="light" animated />

      {/* Hero Section */}
      <Animated.FlatList
        data={data}
        horizontal
        decelerationRate="fast"
        scrollEventThrottle={1000 / 60}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        className="grow-0"
        snapToInterval={IMAGE_WIDTH}
        onScroll={onScroll}
      />
    </ScrollView>
  );
}
