<template>
  <q-page padding>
    <search-bar
      label="Pesquisar"
      hint="Digite o nome de um local"
      :onSearch="handleSearch"
    />
    <q-infinite-scroll
      v-if="locations"
      @load="handleScroll"
      :offset="250"
      class="q-my-md"
    >
      <location-item
        v-for="location in locations"
        :key="location.id"
        :id="location.id"
        :name="location.name"
        :type="location.type"
        :dimension="location.dimension"
      />
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import LocationItem from "@/components/LocationItem.vue";
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
    LocationItem,
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
