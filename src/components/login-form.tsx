import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { zodResolver } from '@hookform/resolvers/zod';
import { cssInterop } from 'nativewind';
import React from 'react';
import { useForm } from 'react-hook-form';

import { type LoginSchema, loginSchema } from '@/core/schemas/auth';
import { useAuth } from '@/core/stores/auth';
import { Button, ControlledInput, View } from '@/ui';

export const LoginForm = () => {
  const login = useAuth.use.login();

  const { handleSubmit, control } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit((data) => login(data));

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
        secureTextEntry
        leadingContent={
          <MaterialCommunityIcons name="lock" className="text-2xl" />
        }
      />
      <Button
        testID="login-button"
        label="Login"
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
