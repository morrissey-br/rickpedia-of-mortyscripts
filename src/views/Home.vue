<template>
  <div class="q-pa-md">
    <search-bar
      label="Pesquisar"
      hint="Digite o nome de um personagem"
      :onSearch="handleSearch"
    />
    <q-infinite-scroll v-if="characters" @load="handleScroll" :offset="250">
      <character-item
        v-for="character in characters"
        :key="character.id"
        :label="character.name"
        :caption="character.origin.name"
        :imageURL="character.image"
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

const FETCH_CHARACTERS_QUERY = gql`
  query character($page: Int!, $nameFilter: String) {
    characters(page: $page, filter: { name: $nameFilter }) {
      info {
        next
      }
      results {
        id
        name
        origin {
          name
        }
        image
      }
    }
  }
`;

const fetchCharacters = () => {
  const { result, fetchMore, refetch } = useQuery(
    FETCH_CHARACTERS_QUERY,
    {
      page: 1,
      nameFilter: "",
    },
    { notifyOnNetworkStatusChange: true }
  );

  const characters = useResult(result, null, (data) => data.characters.results);
  const isLoading = useQueryLoading();

  const nextPage = useResult(
    result,
    null,
    (data) => data.characters.info.next as number
  );

  const loadMore = async () => {
    if (!nextPage.value) throw new Error('Any page left');
    await fetchMore({
      variables: {
        page: nextPage.value,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newResult = {
          ...previousResult,
          characters: {
            ...previousResult.characters,
            info: {
              ...previousResult.characters.info,
              next: fetchMoreResult.characters.info.next,
            },
            results: [
              ...previousResult.characters.results,
              ...fetchMoreResult.characters.results,
            ],
          },
        };
        return newResult;
      },
    });
  };

  const searchCharacter = (nameFilter: string) => {
    refetch({ page: 1, nameFilter: nameFilter });
  };
  return { characters, loadMore, searchCharacter, isLoading };
};

export default defineComponent({
  name: "Home",
  components: {
    SearchBar,
    CharacterItem,
  },
  setup() {
    const { characters, loadMore, searchCharacter } = fetchCharacters();

    const handleScroll = (index: number, done: (stop: boolean) => void) => {
      loadMore().then(() => done(false)).catch(() => done(true))
    };

    const handleSearch = (text: string) => {
      searchCharacter(text);
    };

    return {
      characters,
      handleSearch,
      handleScroll,
    };
  },
});
</script>
