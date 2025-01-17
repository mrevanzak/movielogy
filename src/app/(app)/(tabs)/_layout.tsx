/* eslint-disable react/no-unstable-nested-components */
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useCallback, useEffect } from 'react';

import { translate } from '@/core/i18n';
import { useAuth } from '@/core/stores/auth';
import { colors } from '@/ui';
import { Home, Settings as SettingsIcon } from '@/ui/icons';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const status = useAuth.use.status();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      hideSplash();
    }, 1000);
  }, [hideSplash]);

  if (status !== 'signIn') {
    console.log('Redirecting to auth');
    return <Redirect href="/(auth)/auth" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? colors.black : colors.white,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 700,
        },
        headerShadowVisible: false,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: colorScheme === 'dark' ? colors.black : colors.white,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: translate('tabs.home'),
          tabBarIcon: (props) => <Home {...props} />,
          headerShown: false,
          tabBarTestID: 'feed-tab',
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: translate('tabs.search'),
          tabBarIcon: (props) => <MaterialIcons name="search" {...props} />,
          tabBarTestID: 'style-tab',
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: translate('tabs.favorites'),
          tabBarIcon: (props) => <MaterialIcons name="favorite" {...props} />,
          tabBarTestID: 'settings-tab',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: translate('tabs.settings'),
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
          tabBarTestID: 'settings-tab',
        }}
      />
    </Tabs>
  );
}
