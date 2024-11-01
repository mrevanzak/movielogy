/* eslint-disable react/react-in-jsx-scope */
import { Env } from '@env';
import { Link } from 'expo-router';
import { useColorScheme } from 'nativewind';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { LanguageItem } from '@/components/settings/language-item';
import { ThemeItem } from '@/components/settings/theme-item';
import { useAuth } from '@/core/stores/auth';
import { colors, Image, ScrollView, Text, View } from '@/ui';
import { Github, Website } from '@/ui/icons';

export default function Settings() {
  const user = useAuth.use.user?.();
  const signOut = useAuth.use.signOut();
  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];

  return (
    <ScrollView>
      <View className="flex-row gap-3">
        <Image
          source="https://api.dicebear.com/9.x/lorelei/svg"
          className="my-8 size-32"
        />
        <View className="justify-center">
          <Text className="text-lg font-semibold">{user?.username}</Text>
          <Text className="text-sm">{user?.email}</Text>
        </View>
      </View>
      <View className="flex-1 px-4">
        <ItemsContainer title="settings.generale">
          <LanguageItem />
          <ThemeItem />
        </ItemsContainer>

        <ItemsContainer title="settings.about">
          <Item text="settings.app_name" value={Env.NAME} />
          <Item text="settings.version" value={Env.VERSION} />
        </ItemsContainer>

        <ItemsContainer title="settings.links">
          <Link href="https://github.com/mrevanzak" asChild>
            <Item text="settings.github" icon={<Github color={iconColor} />} />
          </Link>
          <Link href="https://www.rvnza.me" asChild>
            <Item
              text="settings.website"
              icon={<Website color={iconColor} />}
            />
          </Link>
        </ItemsContainer>

        <View className="my-8">
          <ItemsContainer>
            <Item text="settings.logout" onPress={signOut} />
          </ItemsContainer>
        </View>
      </View>
    </ScrollView>
  );
}
