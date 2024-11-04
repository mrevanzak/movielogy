import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { type MovieOrTv } from '@/api';
import { getNowPlaying } from '@/api/now-playing';
import { getPopular } from '@/api/popular';
import { getTopRated } from '@/api/top-rated';
import { getUpcoming } from '@/api/upcoming';
import { HeroImages } from '@/components/home/hero-images';
import { SectionList } from '@/components/home/section-list';

export default function Home() {
  const queryClient = useQueryClient();
  const safeAreaInsets = useSafeAreaInsets();

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
    <ScrollView
      className="flex-1 gap-5"
      refreshControl={
        <RefreshControl
          style={{ marginTop: -safeAreaInsets.top / 2 }}
          refreshing={queryClient.isFetching() > 0}
          onRefresh={() => {
            queryClient.refetchQueries();
          }}
        />
      }
    >
      <StatusBar style="light" animated />

      <HeroImages />
      <SectionList title="Popular" data={popularQuery} />
      <SectionList title="Now Playing" data={nowPlayingQuery} />
      <SectionList title="Upcoming" data={upcomingQuery.data} />
      <SectionList title="Top Rated" data={topRatedQuery} />
    </ScrollView>
  );
}
