import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { zodResolver } from '@hookform/resolvers/zod';
import { cssInterop } from 'nativewind';
import React from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { translate } from '@/core/i18n';
import { type LoginSchema, loginSchema } from '@/core/schemas/auth';
import { useAuth } from '@/core/stores/auth';
import { Button, ControlledInput } from '@/ui';

export const LoginForm = () => {
  const login = useAuth.use.login();

  const { handleSubmit, control } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit((data) => login(data));

  return (
    <KeyboardAvoidingView
      className="gap-2"
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        autoComplete="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        label={translate('auth.email')}
        leadingContent={
          <MaterialCommunityIcons name="email" className="text-2xl" />
        }
      />
      <ControlledInput
        testID="password-input"
        control={control}
        name="password"
        label={translate('auth.password')}
        secureTextEntry
        leadingContent={
          <MaterialCommunityIcons name="lock" className="text-2xl" />
        }
      />
      <Button
        testID="login-button"
        label={translate('auth.login')}
        size="lg"
        onPress={onSubmit}
      />
    </KeyboardAvoidingView>
  );
};

cssInterop(MaterialCommunityIcons, {
  className: {
    target: 'style',
  },
});
