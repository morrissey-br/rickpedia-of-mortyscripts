<template>
  <q-page padding>
    <template v-if="episode">
      <div class="text-h4">{{ episode.name }}</div>
      <div class="text-subtitle1">{{ episode.episode }}</div>
      <div>Lauch date: {{ episode.air_date }}</div>
      <q-separator spaced></q-separator>
      <div class="text-h5 q-mb-md">Characters:</div>
      <q-btn
        round
        v-for="character in episode.characters"
        :key="character.id"
        class="q-ma-xs"
        @click="
          () => router.push({ name: 'Character', params: { id: character.id } })
        "
      >
        <q-avatar>
          <q-img :src="character.image" spinner-color="secondary" />
        </q-avatar>
        <q-tooltip :offset="[0, 5]">{{ character.name }}</q-tooltip>
      </q-btn>
    </template>
    <template v-else>
      <div class="flex justify-center">
        <q-spinner-dots color="secondary" size="md" />
      </div>
    </template>
  </q-page>
</template>

<script lang="ts">
import { useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

const FETCH_EPISODE_QUERY = gql`
  query episode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
        name
        image
      }
    }
  }
`;

const fetchEpisode = (id: string) => {
  const { result } = useQuery(
    FETCH_EPISODE_QUERY,
    { id },
    { notifyOnNetworkStatusChange: true }
  );
  const episode = useResult(result);
  return { episode };
};

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { episode } = fetchEpisode(route.params.id as string);
    return { episode, router };
  },
});
</script>
