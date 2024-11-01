import Ionicons from '@expo/vector-icons/Ionicons';
import * as React from 'react';
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { LayoutChangeEvent, TextInputProps } from 'react-native';
import { I18nManager, StyleSheet, View } from 'react-native';
import { TextInput as NTextInput } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { tv } from 'tailwind-variants';
import { match } from 'ts-pattern';

import { Text } from './text';
import { ThemedView } from './themed-view';
import { cn } from './utils';

const inputTv = tv({
  slots: {
    container: 'my-3 gap-1',
    label: 'text-grey-100 text-lg dark:text-neutral-100',
    inputContainer:
      'flex-row gap-2 border border-black px-2 py-4 dark:border-white',
    input: 'flex-1 font-inter text-base font-medium leading-5 dark:text-white',
  },
  variants: {
    error: {
      true: {
        inputContainer: 'border-danger-600 dark:border-danger-600',
        label: 'text-danger-600 dark:text-danger-600',
      },
    },
    focused: {
      true: {
        inputContainer: 'border-primary dark:border-primary',
        label: 'text-primary dark:text-primary',
      },
    },
    disabled: {
      true: {
        inputContainer: 'bg-neutral-200 dark:bg-neutral-800',
      },
    },
  },
  defaultVariants: {
    error: false,
    focused: false,
    disabled: false,
  },
});

export interface NInputProps
  extends Omit<TextInputProps, 'placeholder' | 'placeholderTextColor'> {
  label?: string;
  disabled?: boolean;
  error?: string;
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;
}

type TRule<T extends FieldValues> =
  | Omit<
      RegisterOptions<T>,
      'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >
  | undefined;

export type RuleType<T extends FieldValues> = { [name in keyof T]: TRule<T> };
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType<T>;
};

interface ControlledInputProps<T extends FieldValues>
  extends NInputProps,
    InputControllerType<T> {}

export const Input = React.forwardRef<NTextInput, NInputProps>((props, ref) => {
  const {
    label,
    error,
    testID,
    leadingContent,
    trailingContent,
    value,
    ...inputProps
  } = props;
  const [containerHeight, setContainerHeight] = React.useState(0);
  const [isFocussed, setIsFocussed] = React.useState(false);
  const onBlur = React.useCallback(() => setIsFocussed(false), []);
  const onFocus = React.useCallback(() => setIsFocussed(true), []);

  const styles = React.useMemo(
    () =>
      inputTv({
        error: Boolean(error),
        focused: isFocussed,
        disabled: Boolean(props.disabled),
      }),
    [error, isFocussed, props.disabled],
  );

  const isLeadingContentPresent = !!leadingContent;
  const rLabelContainerStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(isFocussed || value ? -containerHeight / 2 : 0),
      },
      {
        translateX: withTiming(
          isLeadingContentPresent && (isFocussed || value) ? -24 : 0,
        ),
      },
    ],
  }));

  const rLabelStyles = useAnimatedStyle(() => ({
    fontSize: withTiming(isFocussed || value ? 12 : 16),
  }));

  const onLayout = React.useCallback((e: LayoutChangeEvent) => {
    setContainerHeight(e.nativeEvent.layout.height);
  }, []);

  return (
    <View className={styles.container()}>
      <View className={styles.inputContainer()} onLayout={onLayout}>
        {label && (
          <ThemedView
            className={cn(
              'pointer-events-none absolute left-4 top-1/2 z-10 mt-0.5 px-1',
              {
                'left-10': isLeadingContentPresent,
              },
            )}
            style={rLabelContainerStyles}
          >
            <Animated.Text
              testID={testID ? `${testID}-label` : undefined}
              className={styles.label()}
              style={rLabelStyles}
            >
              {label}
            </Animated.Text>
          </ThemedView>
        )}
        {leadingContent ? (
          <Text className={styles.label()}>{leadingContent}</Text>
        ) : null}
        <NTextInput
          testID={testID}
          ref={ref}
          onBlur={onBlur}
          onFocus={onFocus}
          className={styles.input()}
          value={value}
          {...inputProps}
          style={StyleSheet.flatten([
            { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' },
            { textAlign: I18nManager.isRTL ? 'right' : 'left' },
            inputProps.style,
          ])}
        />
        {trailingContent ? (
          <Text className={styles.label()}>{trailingContent}</Text>
        ) : null}
      </View>
      {error && (
        <Text
          testID={testID ? `${testID}-error` : undefined}
          className="text-sm text-danger-400 dark:text-danger-600"
        >
          {error}
        </Text>
      )}
    </View>
  );
});

// only used with react-hook-form
export function ControlledInput<T extends FieldValues>(
  props: ControlledInputProps<T>,
) {
  const { name, control, rules, secureTextEntry, ...inputProps } = props;

  const { field, fieldState } = useController({ control, name, rules });

  const [passwordVisible, setPasswordVisible] =
    React.useState(!secureTextEntry);

  return (
    <Input
      ref={field.ref}
      autoCapitalize="none"
      onChangeText={field.onChange}
      value={(field.value as string) || ''}
      secureTextEntry={!passwordVisible}
      trailingContent={match([props.secureTextEntry, passwordVisible])
        .with([true, false], () => (
          <Ionicons
            name="eye-off"
            size={24}
            color="white"
            onPress={() => setPasswordVisible(true)}
          />
        ))
        .with([true, true], () => (
          <Ionicons
            name="eye"
            size={24}
            color="white"
            onPress={() => setPasswordVisible(false)}
          />
        ))
        .otherwise(() => null)}
      {...inputProps}
      error={fieldState.error?.message}
    />
  );
}
