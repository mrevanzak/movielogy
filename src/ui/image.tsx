import type { ImageProps } from 'expo-image';
import { Image as NImage } from 'expo-image';
import { cssInterop } from 'nativewind';
import * as React from 'react';
import Animated, { type AnimatedProps, FadeIn } from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(NImage);
cssInterop(NImage, { className: 'style' });

export const Image = ({
  placeholder = { blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' },
  ...props
}: AnimatedProps<ImageProps>) => {
  return (
    <AnimatedImage
      entering={FadeIn.duration(1000)}
      placeholder={placeholder}
      {...props}
    />
  );
};

export const preloadImages = (sources: string[]) => {
  NImage.prefetch(sources);
};
