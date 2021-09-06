<template>
  <q-page padding v-if="character">
    <div class="row items-center q-pa-md">
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
    <div class="text-h5">Status</div>
    <div>{{ character.status }}</div>
    <div>Location: {{ character.location.name }}</div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { gql } from "graphql-tag";
import { useQuery, useResult } from "@vue/apollo-composable";

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
  setup() {
    const { character } = fetchCharacter("1");

    return { character };
  },
});
</script>

