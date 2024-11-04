import { useLocalSearchParams } from 'expo-router';

import { Image, View } from '@/ui';

export default function Details() {
  const params = useLocalSearchParams<{
    id: string;
    uri: string;
  }>();

  return (
    <View>
      <Image
        source={{ uri: params.uri }}
        className="aspect-[2/3] w-44 rounded-lg"
        sharedTransitionTag={`photo-${params.id}`}
        entering={undefined}
        onError={(e) => console.log(e)}
      />
    </View>
  );
}
