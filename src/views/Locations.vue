<template>
  <div class="q-pa-md">
    <search-bar
      label="Pesquisar"
      hint="Digite o nome de um local"
      :onSearch="handleSearch"
    />
    <q-infinite-scroll v-if="locations" @load="handleScroll" :offset="250">
      <character-item
        v-for="location in locations"
        :key="location.id"
        :label="location.name"
        :caption="`${location.type} (${location.dimension})`"
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
  query locations($page: Int!, $nameFilter: String) {
    locations(page: $page, filter: { name: $nameFilter }) {
      results {
        id
        name
        type
        dimension
      }
    }
  }
`;

const fetchLocations = (page = 1, nameFilter = "") => {
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

  const searchLocation = (nameFilter: string) => {
    refetch({ page: 1, nameFilter: nameFilter });
  };

  const locations = useResult(result, null, (data) => data.locations.results);

  return { locations, loadMore, searchLocation };
};

export default defineComponent({
  name: "Locations",
  components: {
    SearchBar,
    CharacterItem,
  },
  setup() {
    const { locations, loadMore, searchLocation } = fetchLocations();

    const handleScroll = (index: number, done: (stop: boolean) => void) => {
      loadMore(index + 1)
        .then(() => done(false))
        .catch(() => done(true));
    };

    const handleSearch = (text: string) => {
      searchLocation(text);
    };

    return {
      locations,
      handleSearch,
      handleScroll,
    };
  },
});
</script>
