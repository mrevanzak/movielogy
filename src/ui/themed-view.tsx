import { forwardRef } from 'react';
import { type ViewProps } from 'react-native';
import Animated, { type AnimatedProps } from 'react-native-reanimated';

import { cn } from '@/core';

export const ThemedView = forwardRef<Animated.View, AnimatedProps<ViewProps>>(
  ({ style, className, ...otherProps }, ref) => {
    return (
      <Animated.View
        ref={ref}
        style={[style]}
        className={cn('dark:bg-black bg-white flex-1', className)}
        {...otherProps}
      />
    );
  },
);
