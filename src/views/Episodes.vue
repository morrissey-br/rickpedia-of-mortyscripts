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
import { useQuery, useQueryLoading, useResult } from "@vue/apollo-composable";

const FETCH_EPISODES_QUERY = gql`
  query episodes($page: Int!, $nameFilter: String) {
    episodes(page: $page, filter: { name: $nameFilter }) {
      info {
        next
      }
      results {
        id
        name
        episode
      }
    }
  }
`;

const fetchepisodes = () => {
  const { result, fetchMore, refetch } = useQuery(
    FETCH_EPISODES_QUERY,
    {
      page: 1,
      nameFilter: "",
    },
    { notifyOnNetworkStatusChange: true }
  );

  const episodes = useResult(result, null, (data) => data.episodes.results);
  const isLoading = useQueryLoading();

  const nextPage = useResult(
    result,
    null,
    (data) => data.episodes.info.next as number
  );

  const loadMore = async () => {
    console.log('foi')
    if (!nextPage.value) return;
    await fetchMore({
      variables: {
        page: nextPage.value,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newResult = {
          ...previousResult,
          episodes: {
            ...previousResult.episodes,
            info: {
              ...previousResult.episodes.info,
              next: fetchMoreResult.episodes.info.next,
            },
            results: [
              ...previousResult.episodes.results,
              ...fetchMoreResult.episodes.results,
            ],
          },
        };
        return newResult;
      },
    });
  };

  const searchEpisode = (nameFilter: string) => {
    refetch({ page: 1, nameFilter: nameFilter });
  };
  return { episodes, loadMore, searchEpisode, isLoading };
};

export default defineComponent({
  name: "Home",
  components: {
    SearchBar,
    CharacterItem,
  },
  setup() {
    const { episodes, loadMore, searchEpisode } = fetchepisodes();

    const handleScroll = (index: number, done: () => void) => {
      loadMore().then(() => done())
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
