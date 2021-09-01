<template>
  <div class="q-pa-md">
    <search-bar label="Pesquisar" hint="Digite o nome de um personagem" :onSearch="handleSearch" />
    <div v-if="characters" ref="charactersDiv">
      <character-item
        v-for="character in characters"
        :key="character.id"
        :label="character.name"
        :caption="character.origin.name"
        :imageURL="character.image"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import CharacterItem from "@/components/CharacterItem.vue";
import { gql } from "graphql-tag";
import { useQuery, useQueryLoading, useResult } from "@vue/apollo-composable";

const FETCH_CHARACTERS_TAG = gql`
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
    FETCH_CHARACTERS_TAG,
    {
      page: 1,
      nameFilter: ''
    },
    { notifyOnNetworkStatusChange: true }
  );

  const characters = useResult(result, null, (data) => data.characters.results);
  const isLoading = useQueryLoading()

  const nextPage = useResult(
    result,
    null,
    (data) => data.characters.info.next as number
  );
  const loadMore = () => {
    if(!nextPage.value) return
    fetchMore({
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

  const searchCharacter= (nameFilter: string) => {
    refetch({page: 1, nameFilter: nameFilter})
  }
  return { characters, loadMore, searchCharacter, isLoading };
};

export default defineComponent({
  name: "Home",
  components: {
    SearchBar,
    CharacterItem,
  },
  setup() {

    const { characters, loadMore, searchCharacter, isLoading } = fetchCharacters();

    const handleSearch = (text: string) => {
      searchCharacter(text)
    }

    const charactersDiv = ref<HTMLDivElement>();
    const handleScroll = (e: Event) => {
      let element = charactersDiv.value;
      if (!element) return;

      if (element.getBoundingClientRect().bottom < window.innerHeight) {
        if (isLoading.value) return;
        loadMore();
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });
    return { characters, loadMore, searchCharacter, charactersDiv, handleSearch };
  },
});
</script>
