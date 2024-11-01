import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { zodResolver } from '@hookform/resolvers/zod';
import { cssInterop } from 'nativewind';
import React from 'react';
import { useForm } from 'react-hook-form';

import { type SignUpSchema, signUpSchema } from '@/core/schemas/auth';
import { useAuth } from '@/core/stores/auth';
import { Button, ControlledInput, View } from '@/ui';

export const SignupForm = () => {
  const signUp = useAuth.use.signUp();

  const { handleSubmit, control } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = handleSubmit((data) => signUp(data));

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
