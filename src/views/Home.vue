<template>
  <div class="q-pa-md">
    <search-bar label="Pesquisar" hint="Digite o nome de um personagem" />
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
import { useQuery, useResult } from "@vue/apollo-composable";
import { Loading } from "quasar";

export default defineComponent({
  name: "Home",
  components: {
    SearchBar,
    CharacterItem,
  },
  setup() {
    let page = 1;
    const { result, fetchMore, loading } = useQuery(
      gql`
        query character($page: Int!) {
          characters(page: $page) {
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
      `,
      { page: page },
      { notifyOnNetworkStatusChange: true }
    );
    const loadMore = () => {
      page++;
      fetchMore({
        variables: {
          page,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newResult = {
            ...previousResult,
            characters: {
              ...previousResult.characters,
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

    const charactersDiv = ref<HTMLDivElement>();

    const handleScroll = (e: Event) => {
      let element = charactersDiv.value;
      if (!element) return;

      if (element.getBoundingClientRect().bottom < window.innerHeight) {
        if (loading.value) return;
        loadMore();
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    const characters = useResult(result, [], (data) => data.characters.results);
    return { characters, loadMore, charactersDiv };
  },
});
</script>
