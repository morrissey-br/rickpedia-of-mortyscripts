<template>
  <div class="q-pa-md">
    <search-bar
      label="Pesquisar"
      hint="Digite o nome de um episódio"
      :onSearch="handleSearch"
    />
    <q-infinite-scroll v-if="episodes" @load="handleScroll" :offset="250">
      <character-item
        v-for="episode in episodes"
        :key="episode.id"
        :label="episode.name"
        :caption="episode.episode"
      />
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import CharacterItem from "@/components/CharacterItem.vue";
import { gql } from "graphql-tag";
import { useQuery, useResult } from "@vue/apollo-composable";

const FETCH_EPISODES_QUERY = gql`
  query episodes($page: Int!, $nameFilter: String) {
    episodes(page: $page, filter: { name: $nameFilter }) {
      results {
        id
        name
        episode
      }
    }
  }
`;

const fetchEpisodes = (page = 1, nameFilter = "") => {
  const { result, fetchMore, refetch } = useQuery(
    FETCH_EPISODES_QUERY,
    {
      page,
      nameFilter,
    },
    { notifyOnNetworkStatusChange: true }
  );

  const loadMore = async (nextPage: number) => {
    await fetchMore({
      variables: {
        page: nextPage,
      },
    });
  };

  const searchEpisode = (nameFilter: string) => {
    refetch({ page: 1, nameFilter: nameFilter });
  };

  const episodes = useResult(result, null, (data) => data.episodes.results);

  return { episodes, loadMore, searchEpisode };
};

export default defineComponent({
  name: "Episodes",
  components: {
    SearchBar,
    CharacterItem,
  },
  setup() {
    const { episodes, loadMore, searchEpisode } = fetchEpisodes();

    const handleScroll = (index: number, done: (stop: boolean) => void) => {
      loadMore(index + 1)
        .then(() => done(false))
        .catch(() => done(true));
    };

    const handleSearch = (text: string) => {
      searchEpisode(text);
    };

    return {
      episodes,
      handleSearch,
      handleScroll,
    };
  },
});
</script>
