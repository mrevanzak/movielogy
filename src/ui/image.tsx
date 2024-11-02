import type { ImageProps } from 'expo-image';
import { Image as NImage } from 'expo-image';
import { Skeleton } from 'moti/skeleton';
import { cssInterop, useColorScheme } from 'nativewind';
import * as React from 'react';
import Animated, { type AnimatedProps, FadeIn } from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(NImage);
cssInterop(NImage, { className: 'style' });

export const Image = ({
  placeholder = { blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' },
  ...props
}: AnimatedProps<ImageProps>) => {
  const { colorScheme } = useColorScheme();
  const [loaded, setLoaded] = React.useState(false);

  return (
    <Skeleton
      show={!loaded}
      colorMode={colorScheme}
      width="100%"
      height="100%"
      transition={{
        type: 'timing',
        duration: 2000,
      }}
    >
      <AnimatedImage
        entering={FadeIn.duration(1000)}
        onLoad={() => setLoaded(true)}
        placeholder={placeholder}
        {...props}
      />
    </Skeleton>
  );
};

export const preloadImages = (sources: string[]) => {
  NImage.prefetch(sources);
};
