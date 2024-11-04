import { FlashList } from '@shopify/flash-list';
import * as React from 'react';

import { Card } from '@/components/card';
import { translate } from '@/core/i18n';
import { useFavorites } from '@/core/stores/favorites';
import { Text, View } from '@/ui';

export default function Style() {
  const favorites = useFavorites.use.favorites();

  return (
    <FlashList
      data={favorites}
      renderItem={({ item }) => <Card item={item} />}
      keyboardDismissMode="on-drag"
      estimatedItemSize={160}
      keyExtractor={(item) => String(item.id)}
      ItemSeparatorComponent={() => <View className="h-2" />}
      contentContainerStyle={{
        paddingTop: 16,
      }}
      ListEmptyComponent={() => (
        <Text className="m-auto text-lg">{translate('favorites.empty')}</Text>
      )}
    />
  );
}
