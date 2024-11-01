import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { cssInterop } from 'nativewind';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, ControlledInput, View } from '@/ui';

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  username: z
    .string({
      required_error: 'Username is required',
    })
    .min(3, 'Username must be at least 3 characters'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type SignUpSchema = z.infer<typeof schema>;

export const SignupForm = () => {
  const router = useRouter();

  const { handleSubmit, control } = useForm<SignUpSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    router.push('/');
  });

  return (
    <View className="gap-2">
      <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        label="Email"
        leadingContent={
          <MaterialCommunityIcons name="email" className="text-2xl" />
        }
      />
      <ControlledInput
        testID="username-input"
        control={control}
        name="username"
        label="Username"
        leadingContent={<FontAwesome5 name="user-alt" size={24} />}
      />
      <ControlledInput
        testID="password-input"
        control={control}
        name="password"
        label="Password"
        secureTextEntry
        leadingContent={
          <MaterialCommunityIcons name="lock" className="text-2xl" />
        }
      />
      <Button
        testID="login-button"
        label="Create Account"
        size="lg"
        onPress={onSubmit}
      />
    </View>
  );
};

cssInterop(MaterialCommunityIcons, {
  className: {
    target: 'style',
  },
});
