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

import { BlurView, Image, Text, ThemedView } from '@/ui';

const IMAGE_WIDTH = 128;
const ASPECT_RATIO = 2 / 3;
const IMAGE_HEIGHT = IMAGE_WIDTH / ASPECT_RATIO;
const SCALE_FACTOR = 2.5;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function PeekScreen() {
  const params = useLocalSearchParams();
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
          style={[
            {
              top: IMAGE_HEIGHT * SCALE_FACTOR,
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
          <Text className="">({params.date})</Text>
          <Text className="">
            ⭐️ {Number(params.rating).toFixed(2)} ({params.ratingCount})
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
            source={{ uri: params.uri.toString() }}
            className="flex-1"
            entering={undefined}
            onError={(e) => console.log(e)}
          />
        </ThemedView>
      </BlurView>
    </Pressable>
  );
}