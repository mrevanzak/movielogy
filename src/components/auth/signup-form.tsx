import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { zodResolver } from '@hookform/resolvers/zod';
import { cssInterop } from 'nativewind';
import React from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { translate } from '@/core/i18n';
import { type SignUpSchema, signUpSchema } from '@/core/schemas/auth';
import { useAuth } from '@/core/stores/auth';
import { Button, ControlledInput } from '@/ui';

export const SignupForm = () => {
  const signUp = useAuth.use.signUp();

  const { handleSubmit, control } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = handleSubmit((data) => signUp(data));

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
        label={translate('auth.email')}
        leadingContent={
          <MaterialCommunityIcons name="email" className="text-2xl" />
        }
      />
      <ControlledInput
        testID="username-input"
        control={control}
        name="username"
        label={translate('auth.username')}
        leadingContent={<FontAwesome5 name="user-alt" size={24} />}
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
        label={translate('auth.create_account')}
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
