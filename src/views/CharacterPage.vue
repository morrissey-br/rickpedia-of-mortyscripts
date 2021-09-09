<template>
  <q-page padding>
    <template v-if="character">
      <div class="row items-center q-mb-md">
        <div class="col-auto q-mr-md">
          <q-avatar size="100px">
            <q-img :src="character.image" spinner-color="secondary" />
          </q-avatar>
        </div>
        <div class="col">
          <div class="text-h4">{{ character.name }}</div>
          <div class="text-subtitle1">
            {{ character.species }} - {{ character.origin.name }}
          </div>
          <dead-or-alive :text="character.status"></dead-or-alive>
        </div>
      </div>      
      <q-separator spaced=""></q-separator>
      <span class="text-h5 vertical-middle q-mb-md">Location:</span>
      <location-item
        :id="character.location.id"
        :name="character.location.name"
        :type="character.location.type"
        :dimension="character.location.dimension"
        :separator="false"
      />
      <q-separator spaced></q-separator>
      <span class="text-h5 q-mb-md">Episodes:</span>
      <episode-item
        v-for="episode in character.episode"
        :key="episode.id"
        :id="episode.id"
        :label="episode.name"
        :caption="episode.episode"
      />
    </template>
    <template v-else>
      <div class="flex justify-center">
        <q-spinner-dots color="secondary" size="md" />
      </div>
    </template>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { gql } from "graphql-tag";
import { useQuery, useResult } from "@vue/apollo-composable";
import DeadOrAlive from "@/components/DeadOrAlive.vue";
import EpisodeItem from "@/components/EpisodeItem.vue";
import LocationItem from "@/components/LocationItem.vue";
import { useRoute } from "vue-router";

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
        type
        dimension
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
    EpisodeItem,
    LocationItem,
  },
  setup() {
    const route = useRoute();
    const { character } = fetchCharacter(route.params.id as string);

    return { character };
  },
});
</script>

