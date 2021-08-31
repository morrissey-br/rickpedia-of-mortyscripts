<template>
  <div class="q-pa-md">
    <search-bar label="Pesquisar" hint="Digite o nome de um personagem" />
    <character-item
      label="Nome do personagem"
      caption="Texto sobre o personagem"
      imageURL="https://rickandmortyapi.com/api/character/avatar/183.jpeg"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import CharacterItem from "@/components/CharacterItem.vue";

export default defineComponent({
  name: "Home",
  components: {
    SearchBar,
    CharacterItem,
  },
});
</script>
