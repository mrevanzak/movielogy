import React from 'react';
import type { TextProps, TextStyle } from 'react-native';
import { I18nManager, StyleSheet } from 'react-native';
import Animated, { type AnimatedProps } from 'react-native-reanimated';
import { twMerge } from 'tailwind-merge';

import type { TxKeyPath } from '@/core/i18n';
import { translate } from '@/core/i18n';

interface Props extends AnimatedProps<TextProps> {
  className?: string;
  tx?: TxKeyPath;
}

export const Text = ({
  className = '',
  style,
  tx,
  children,
  ...props
}: Props) => {
  const textStyle = React.useMemo(
    () =>
      twMerge(
        'text-base text-black  dark:text-white  font-inter font-normal',
        className,
      ),
    [className],
  );

  const nStyle = React.useMemo(
    () =>
      StyleSheet.flatten([
        {
          writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
        },
        style,
      ]) as TextStyle,
    [style],
  );
  return (
    <Animated.Text className={textStyle} style={nStyle} {...props}>
      {tx ? translate(tx) : children}
    </Animated.Text>
  );
};
