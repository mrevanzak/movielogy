import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { match } from 'ts-pattern';

import { type MediaType } from '@/api';
import { getDetails } from '@/api/details';
import { Env } from '@/core/env';
import { colors, Image, ParallaxScrollView, Text, View } from '@/ui';

export default function Details() {
  const { colorScheme } = useColorScheme();
  const params = useLocalSearchParams<{
    id: string;
    uri: string;
    title: string;
    type: MediaType;
  }>();

  const { data } = useQuery(getDetails(params.type, params.id));

  return (
    <ParallaxScrollView
      headerImage={
        <Image
          source={{ uri: Env.IMAGE_URL + '/w780' + data?.backdrop_path }}
          className="h-full w-screen"
          onError={(e) => console.log(e)}
          withSkeleton
        />
      }
    >
      <Stack.Screen
        options={{
          title: params.title,
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: colors.primary,
          headerStyle: {
            backgroundColor:
              colorScheme === 'dark' ? colors.black : colors.white,
          },
        }}
      />

      <View className="flex-row gap-4">
        <Image
          source={{ uri: params.uri }}
          className="absolute -top-24 aspect-[2/3] w-32 rounded-lg"
          onError={(e) => console.log(e)}
        />
        <View className="ml-36 min-h-24 flex-1 gap-1">
          <Text className="text-lg font-semibold">{params.title}</Text>
          <Text className="text-xs opacity-60">
            {match(data)
              .with({ media_type: 'movie' }, (data) =>
                new Date(data?.release_date ?? '').getFullYear(),
              )
              .with({ media_type: 'tv' }, (data) =>
                new Date(data?.first_air_date ?? '').getFullYear(),
              )
              .otherwise(() => null)}
            {data?.adult ? ' | 18+' : null}
            {match(data)
              .with(
                { media_type: 'tv' },
                (data) => ` | ${data?.number_of_seasons} seasons`,
              )
              .with({ media_type: 'movie' }, (data) => ` | ${data?.runtime}m`)
              .otherwise(() => null)}{' '}
            | {data?.genres.map((genre) => genre.name).join(', ')}
          </Text>
          <Text className="text-xs opacity-60">
            ⭐️ {Number(data?.vote_average).toFixed(1)} ({data?.vote_count})
          </Text>
        </View>
      </View>

      <Text className="">{data?.overview}</Text>
    </ParallaxScrollView>
  );
}
