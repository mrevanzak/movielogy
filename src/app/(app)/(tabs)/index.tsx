import { useQueries, useQuery } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView } from 'react-native';

import { type MovieOrTv } from '@/api';
import { getNowPlaying } from '@/api/now-playing';
import { getPopular } from '@/api/popular';
import { getTopRated } from '@/api/top-rated';
import { getUpcoming } from '@/api/upcoming';
import { HeroImages } from '@/components/home/hero-images';
import { SectionList } from '@/components/home/section-list';
import { translate } from '@/core/i18n';

export default function Home() {
  const popularQuery = useQueries({
    queries: [getPopular('movie'), getPopular('tv')],
    combine: (results) => {
      return results.flatMap((result) => result.data as MovieOrTv[]);
    },
  });

  const nowPlayingQuery = useQueries({
    queries: [getNowPlaying('movie'), getNowPlaying('tv')],
    combine: (results) => {
      return results.flatMap((result) => result.data as MovieOrTv[]);
    },
  });

  const upcomingQuery = useQuery(getUpcoming);

  const topRatedQuery = useQueries({
    queries: [getTopRated('movie'), getTopRated('tv')],
    combine: (results) => {
      return results.flatMap((result) => result.data as MovieOrTv[]);
    },
  });

  return (
    <ScrollView className="flex-1 gap-5">
      <StatusBar style="light" animated />

      <HeroImages />
      <SectionList title={translate('home.popular')} data={popularQuery} />
      <SectionList
        title={translate('home.now_playing')}
        data={nowPlayingQuery}
      />
      <SectionList
        title={translate('home.upcoming')}
        data={upcomingQuery.data}
      />
      <SectionList title={translate('home.top_rated')} data={topRatedQuery} />
    </ScrollView>
  );
}
