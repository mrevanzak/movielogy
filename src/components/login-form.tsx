import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { zodResolver } from '@hookform/resolvers/zod';
import { cssInterop } from 'nativewind';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, ControlledInput, View } from '@/ui';

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
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
        testID="password-input"
        control={control}
        name="password"
        label="Password"
        secureTextEntry={true}
      />
      <Button
        testID="login-button"
        label="Login"
        size="lg"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

cssInterop(MaterialCommunityIcons, {
  className: {
    target: 'style',
  },
});
