import { Link, useRouter } from 'expo-router';
import { useRef } from 'react';
import { TouchableOpacity, View, type ViewProps } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { type MovieOrTv } from '@/api';
import { Env } from '@/core/env';

type PeekableProps = {
  item: MovieOrTv;
} & ViewProps;

export function Peekable({ item, children, ...rest }: PeekableProps) {
  const ref = useRef<View>(null);
  const router = useRouter();

  const uri = Env.IMAGE_URL + '/w185' + item.poster_path;

  function pushToPeekScreen() {
    // eslint-disable-next-line max-params
    ref.current?.measure((x, y, width, height, pageX) => {
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
          posterPath: item?.poster_path,
          pageX,
          uri,
        },
      });
    });
  }

  const longPress = Gesture.LongPress().onStart(() => {
    runOnJS(pushToPeekScreen)();
  });

  return (
    <GestureDetector gesture={longPress}>
      <Link
        href={{
          pathname: '/[id]',
          params: {
            id: item.id,
            title: item?.media_type === 'movie' ? item.title : item?.name,
            type: item.media_type,
            uri,
          },
        }}
        asChild
      >
        <TouchableOpacity>
          <View ref={ref} {...rest}>
            {children}
          </View>
        </TouchableOpacity>
      </Link>
    </GestureDetector>
  );
}
