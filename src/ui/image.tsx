import type { ImageProps as NimageProps } from 'expo-image';
import { Image as NImage } from 'expo-image';
import { Skeleton } from 'moti/skeleton';
import { cssInterop, useColorScheme } from 'nativewind';
import * as React from 'react';
import Animated, { type AnimatedProps } from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(NImage);
cssInterop(NImage, { className: 'style' });

type ImageProps = {
  withSkeleton?: boolean;
} & AnimatedProps<NimageProps>;

export const Image = ({
  placeholder = { blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' },
  withSkeleton = false,
  ...props
}: ImageProps) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [loaded, setLoaded] = React.useState(false);

  return withSkeleton ? (
    <Skeleton
      show={!loaded}
      colorMode={isDark ? 'dark' : 'light'}
      radius="square"
    >
      <AnimatedImage onLoadEnd={() => setLoaded(true)} {...props} />
    </Skeleton>
  ) : (
    <AnimatedImage
      placeholder={placeholder}
      onLoadEnd={() => setLoaded(true)}
      {...props}
    />
  );
};

export const preloadImages = (sources: string[]) => {
  NImage.prefetch(sources);
};
