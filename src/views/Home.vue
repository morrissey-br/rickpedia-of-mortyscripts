<template>
  <div class="q-pa-md">
    <search-bar label="Pesquisar" hint="Digite o nome de um personagem" />
    <div v-if="characters">
      <character-item
        v-for="character in characters"
        :key="character.id"
        :label="character.name"
        :caption="character.id"
        :imageURL="character.image"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import CharacterItem from "@/components/CharacterItem.vue";
import { gql } from "graphql-tag";
import { useQuery, useResult } from "@vue/apollo-composable";

export default defineComponent({
  name: "Home",
  components: {
    SearchBar,
    CharacterItem,
  },
  data() {
    return {
      lala: "abc",
    };
  },
  setup() {
    const { result } = useQuery(
      gql`
        query {
          characters(page: 1) {
            results {
              id
              name
              image
            }
          }
        }
      `,
      { page: 1 }
    );
    const characters = useResult(result, [], (data) => data.characters.results);
    watchEffect(() => {
      console.log(characters);
    });
    return { characters };
  },
});
</script>
