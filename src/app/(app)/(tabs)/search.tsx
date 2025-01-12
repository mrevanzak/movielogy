import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FlashList, type ListRenderItemInfo } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { ActivityIndicator, TextInput, View } from 'react-native';
import { useDebounceValue } from 'usehooks-ts';

import type { MovieOrTv } from '@/api';
import { getSearch } from '@/api/search';
import { Card } from '@/components/card';
import { SearchHistory } from '@/components/search/search-history';
import { translate } from '@/core/i18n';
import { colors } from '@/ui';

export default function SearchScreen() {
  const [query, setQuery] = useDebounceValue('', 500);
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    getSearch(query),
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<MovieOrTv>) => <Card item={item} />,
    [],
  );

  return (
    <View className="flex-1 gap-4">
      <View className="mx-4 flex-row items-center justify-between rounded-full pr-4 dark:bg-neutral-800">
        <TextInput
          defaultValue={query}
          onChangeText={setQuery}
          placeholder={translate('search.placeholder')}
          placeholderTextColor={colors.primary}
          className="flex-1 p-4 text-primary"
        />
        <MaterialIcons name="search" size={24} color={colors.primary} />
      </View>
      <SearchHistory query={query} setQuery={setQuery} />
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
