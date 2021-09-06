<template>
  <q-page padding v-if="character">
    <div class="row items-center">
      <div class="col-auto q-mr-md">
        <q-avatar size="100px">
          <img :src="character.image" alt="" />
        </q-avatar>
      </div>
      <div class="col">
        <div class="text-h4">{{ character.name }}</div>
        <div class="text-subtitle1">
          {{ character.species }} - {{ character.origin.name }}
        </div>
      </div>
    </div>
    <q-separator class="q-my-md"></q-separator>
    <span class="text-h5 vertical-middle q-mr-xs">Status:</span>
    <dead-or-alive :text="character.status"></dead-or-alive>
    <div class="text-subtitle1">Location: {{ character.location.name }}</div>
    <q-separator class="q-my-md"></q-separator>
    <div class="text-h5">Episodes:</div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { gql } from "graphql-tag";
import { useQuery, useResult } from "@vue/apollo-composable";
import DeadOrAlive from "@/components/DeadOrAlive.vue";

const FETCH_CHARACTER_QUERY = gql`
  query character($characterID: ID!) {
    character(id: $characterID) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
      }
      location {
        id
        name
      }
      image
      episode {
        id
        name
        episode
      }
      created
    }
  }
`;

const fetchCharacter = (characterID: string) => {
  const { result } = useQuery(
    FETCH_CHARACTER_QUERY,
    { characterID: characterID },
    { notifyOnNetworkStatusChange: true }
  );

  const character = useResult(result, null, (data) => data.character);

  return { character };
};

export default defineComponent({
  components: {
    DeadOrAlive,
  },
  setup() {
    const { character } = fetchCharacter("1");

    return { character };
  },
});
</script>

