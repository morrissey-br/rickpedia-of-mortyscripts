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
        @click="handleCharacterClick(character.id)"
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

const FETCH_CHARACTERS_QUERY = gql`
  query characters($page: Int!, $nameFilter: String) {
    characters(page: $page, filter: { name: $nameFilter }) {
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

const fetchCharacters = (page = 1, nameFilter = "") => {
  const { result, fetchMore, refetch } = useQuery(
    FETCH_CHARACTERS_QUERY,
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

  const searchCharacter = (nameFilter: string) => {
    refetch({ page: 1, nameFilter: nameFilter });
  };

  const characters = useResult(result, null, (data) => data.characters.results);

  return { characters, loadMore, searchCharacter };
};

export default defineComponent({
  name: "Characters",
  components: {
    SearchBar,
    CharacterItem,
  },
  setup() {
    const { characters, loadMore, searchCharacter } = fetchCharacters();

    const handleScroll = (index: number, done: (stop: boolean) => void) => {
      loadMore(index + 1)
        .then(() => done(false))
        .catch(() => done(true));
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

  methods: {
    handleCharacterClick(id: string) {
      this.$router.push({name: 'Character', params: {id: id}})
    }
  }
});
</script>
