import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Dimensions, Pressable } from 'react-native';
import {
  Extrapolation,
  FadeIn,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { type MediaType } from '@/api';
import { getGenre } from '@/api/genre';
import { Env } from '@/core/env';
import { BlurView, Image, Text, ThemedView } from '@/ui';

const IMAGE_WIDTH = 128;
const ASPECT_RATIO = 2 / 3;
const IMAGE_HEIGHT = IMAGE_WIDTH / ASPECT_RATIO;
const SCALE_FACTOR = 2.5;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function PeekScreen() {
  const params = useLocalSearchParams<{
    id: string;
    pageX: string;
    pageY: string;
    title: string;
    date?: string;
    rating: string;
    ratingCount: string;
    posterPath: string;
    mediaType: MediaType;
    genreIds: string[];
  }>();
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  const rStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        {
          translateX: interpolate(
            Number(params.pageX),
            [0, SCREEN_WIDTH],
            [SCREEN_WIDTH / 10, SCREEN_WIDTH / 6],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  const slideDownStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const genres = useQuery(getGenre(params.mediaType, params.genreIds));
  const uri = Env.IMAGE_URL + '/w500' + params.posterPath;

  useEffect(() => {
    scale.value = withSpring(SCALE_FACTOR);
    translateY.value = withDelay(300, withTiming(96));

    return () => {
      scale.value = withSpring(1);
      translateY.value = withTiming(0);
    };
  }, [scale, translateY]);

  return (
    <Pressable onPress={() => router.back()} className="flex-1">
      <BlurView intensity={90} className="flex-1" entering={FadeIn}>
        <ThemedView
          className="absolute bg-transparent dark:bg-transparent"
          entering={FadeIn.delay(400)}
          style={[
            {
              top: IMAGE_HEIGHT * SCALE_FACTOR - 8,
              left: interpolate(
                Number(params.pageX),
                [0, SCREEN_WIDTH],
                [SCREEN_WIDTH / 36, SCREEN_WIDTH / 4],
                Extrapolation.CLAMP,
              ),
            },
            slideDownStyle,
          ]}
        >
          <Text className="text-xl font-semibold">{params.title}</Text>
          {params.date && (
            <Text className="">{new Date(params.date).getFullYear()}</Text>
          )}
          <Text className="">
            ⭐️ {Number(params.rating).toFixed(2)} ({params.ratingCount})
          </Text>
          <Text className="text-sm">
            {genres.data?.map((g) => g.name).join(', ')}
          </Text>
        </ThemedView>

        <ThemedView
          className="absolute overflow-hidden rounded-lg"
          style={[
            {
              top: IMAGE_HEIGHT + 32,
              width: IMAGE_WIDTH,
              height: IMAGE_HEIGHT,
            },
            rStyles,
          ]}
        >
          <Image
            source={{ uri }}
            className="flex-1"
            entering={undefined}
            onError={(e) => console.log(e)}
          />
        </ThemedView>
      </BlurView>
    </Pressable>
  );
}
