import Fontisto from '@expo/vector-icons/Fontisto';
import { FlashList, type ListRenderItemInfo } from '@shopify/flash-list';
import { useCallback, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';

import { useKeyboard } from '@/core/hooks/use-keyboard';
import { storage } from '@/core/storage';
import { colors } from '@/ui';

import { PressableScale } from '../pressable-scale';

type SearchHistoryType = {
  history: string[];
};

export function SearchHistory(props: {
  query: string;
  setQuery: (q: string) => void;
}) {
  const [searchHistory, setSearchHistory] = useMMKVObject<SearchHistoryType>(
    'search-history',
    storage,
  );

  const { keyboardShown } = useKeyboard();

  useEffect(() => {
    if (!keyboardShown && props.query.length > 0) {
      setSearchHistory((prev) => {
        const history = prev?.history ?? [];
        const newHistory = [
          props.query,
          ...history.filter((q) => q !== props.query),
        ];
        return { history: newHistory.slice(0, 5) };
      });
    }
  }, [keyboardShown, props.query, setSearchHistory]);

  const renderSearchHistory = useCallback(
    ({ item }: ListRenderItemInfo<string>) => (
      <PressableScale
        className="flex flex-row gap-4 p-4"
        targetScale={0.99}
        onPress={() => props.setQuery(item)}
      >
        <Fontisto name="history" size={16} color={colors.primary} />
        <Text className="text-primary">{item}</Text>
      </PressableScale>
    ),
    [props],
  );

  return (
    <View className="flex-row">
      <FlashList
        data={searchHistory?.history}
        renderItem={renderSearchHistory}
        estimatedItemSize={34}
        className="grow-0"
        contentContainerClassName="mx-4 rounded-md border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800"
        scrollEnabled={false}
      />
    </View>
  );
}
