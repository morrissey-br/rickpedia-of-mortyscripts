<template>
  <q-page padding v-if="location">
    <div class="text-h4">{{ location.name }}</div>
    <div class="text-subtitle1">
      {{ location.type }} - {{ location.dimension }}
    </div>
    <q-separator spaced></q-separator>
    <div class="text-h5 q-mb-md">Residents:</div>
    <q-btn
      round
      v-for="resident in location.residents"
      :key="resident.id"
      class="q-ma-xs"
      @click="
        () => router.push({ name: 'Character', params: { id: resident.id } })
      "
    >
      <q-avatar>
        <q-img :src="resident.image" spinner-color="white" />
      </q-avatar>
      <q-tooltip :offset="[0, 5]">{{ resident.name }}</q-tooltip>
    </q-btn>
  </q-page>
</template>

<script lang="ts">
import { useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

const FETCH_LOCATION_QUERY = gql`
  query location($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      residents {
        id
        name
        image
      }
    }
  }
`;

const fetchEpisode = (id: string) => {
  const { result } = useQuery(
    FETCH_LOCATION_QUERY,
    { id },
    { notifyOnNetworkStatusChange: true }
  );
  const location = useResult(result);
  return { location };
};

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { location } = fetchEpisode(route.params.id as string);
    return { location, router };
  },
});
</script>
