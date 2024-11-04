import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FlashList, type ListRenderItemInfo } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { ActivityIndicator, TextInput, View } from 'react-native';
import { useDebounceValue } from 'usehooks-ts';

import { type MovieOrTv } from '@/api';
import { getSearch } from '@/api/search';
import { Env } from '@/core/env';
import { colors, Image, Text } from '@/ui';

export default function SearchScreen() {
  const [query, setQuery] = useDebounceValue('', 500);
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    getSearch(query),
  );

  const renderItem = useCallback(({ item }: ListRenderItemInfo<MovieOrTv>) => {
    const date =
      item.media_type === 'movie' ? item.release_date : item.first_air_date;

    return (
      <View className="mx-4 flex-row gap-4">
        <Image
          source={{ uri: Env.IMAGE_URL + '/w92' + item.poster_path }}
          className="aspect-[2/3] w-24 rounded-lg"
          withSkeleton
        />

        <View className="flex-1">
          <Text className="text-lg font-semibold">
            {item.media_type === 'movie' ? item.title : item.name}
          </Text>
          {date && (
            <Text className="text-sm opacity-60">
              {new Date(date).getFullYear()}
            </Text>
          )}
          <Text className="">
            ⭐️ {Number(item.vote_average).toFixed(1)} ({item.vote_count})
          </Text>
        </View>
      </View>
    );
  }, []);

  return (
    <View className="flex-1">
      <View className="m-4 flex-row items-center justify-between rounded-full pr-4 dark:bg-neutral-800">
        <TextInput
          onChangeText={setQuery}
          placeholder="Search for a title..."
          placeholderTextColor={colors.primary}
          className="flex-1 p-4 text-primary"
        />
        <MaterialIcons name="search" size={24} color={colors.primary} />
      </View>
      <FlashList
        data={data?.pages?.flatMap((page) => page?.results)}
        renderItem={renderItem}
        keyboardDismissMode="on-drag"
        estimatedItemSize={160}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View className="h-2" />}
        onEndReached={() => {
          if (hasNextPage && !isFetching) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          isFetching && <ActivityIndicator size="large" />
        }
      />
    </View>
  );
}
