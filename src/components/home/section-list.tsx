import { FlashList, type ListRenderItemInfo } from '@shopify/flash-list';
import { Link, useRouter } from 'expo-router';
import { useCallback, useMemo, useRef } from 'react';
import { Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { type MovieOrTv } from '@/api';
import { Env } from '@/core/env';
import { Image, Text, View } from '@/ui';

const IMAGE_WIDTH = 128;
const ASPECT_RATIO = 2 / 3;
const IMAGE_HEIGHT = IMAGE_WIDTH / ASPECT_RATIO;

type PhotoProps = {
  item?: MovieOrTv;
};

function Photo({ item }: PhotoProps) {
  const ref = useRef<View>(null);
  const router = useRouter();
  const uri = Env.IMAGE_URL + '/w500' + item?.poster_path;

  function pushToPeekScreen() {
    // eslint-disable-next-line max-params
    ref.current?.measure((x, y, width, height, pageX, pageY) => {
      router.push({
        pathname: '/[id]/peek',
        params: {
          id: item?.id ?? '',
          mediaType: item?.media_type,
          title: item?.media_type === 'movie' ? item.title : item?.name,
          date:
            item?.media_type === 'movie'
              ? item.release_date
              : item?.first_air_date,
          rating: item?.vote_average,
          ratingCount: item?.vote_count,
          genreIds: item?.genre_ids,
          uri,
          pageX,
          pageY,
        },
      });
    });
  }

  const longPress = Gesture.LongPress().onStart(() => {
    runOnJS(pushToPeekScreen)();
  });

  if (!item) {
    return null;
  }

  return (
    <GestureDetector gesture={longPress}>
      <Link
        href={{
          pathname: '/[id]',
          params: {
            id: item.id,
            mediaType: item.media_type,
            uri,
          },
        }}
      >
        <View
          className="overflow-hidden"
          style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
          ref={ref}
        >
          <Image
            source={{ uri }}
            className="flex-1 rounded-lg"
            sharedTransitionTag={`photo-${item.id}`}
            onError={(e) => console.log(e)}
          />
        </View>
      </Link>
    </GestureDetector>
  );
}

type SectionListProps = {
  title: string;
  data?: MovieOrTv[];
};

export function SectionList({ title, data }: SectionListProps) {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<MovieOrTv | undefined>) => (
      <Photo item={item} />
    ),
    [],
  );

  const placeholdeData = useMemo(
    () => Array.from({ length: 3 }).map(() => undefined),
    [],
  );

  return (
    <View className="flex-1 gap-3 p-4">
      <Text className="text-xl font-semibold">{title}</Text>
      <View className="grow">
        <FlashList
          horizontal
          data={data ?? placeholdeData}
          keyExtractor={(item) =>
            item?.id.toString() ?? Math.random().toString()
          }
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-2" />}
          estimatedListSize={{
            width: Dimensions.get('window').width,
            height: IMAGE_HEIGHT,
          }}
          estimatedItemSize={IMAGE_WIDTH}
        />
      </View>
    </View>
  );
}
