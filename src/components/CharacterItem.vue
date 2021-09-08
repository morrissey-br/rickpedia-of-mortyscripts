<template>
  <q-card class="q-my-md cursor-pointer">
    <q-item>
      <q-item-section avatar>
        <q-avatar color="red" size="80px">
          <img v-if="imageURL" :src="imageURL" alt="" />
          {{ !imageURL && label[0] }}
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ label }}</q-item-label>
        <q-item-label caption>{{ caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: "",
    },
    imageURL: {
      type: String,
      default: "",
    },
  },
});
</script>
