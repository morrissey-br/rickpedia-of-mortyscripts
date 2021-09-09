<template>
  <q-card class="q-my-md cursor-pointer" @click="handleClick">
    <q-item clickable>
      <q-item-section avatar>
        <q-avatar size="80px">
          <q-img :src="imageURL" spinner-color="secondary" />
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
    id: {
      type: String,
      required: true,
    },
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
  methods: {
    handleClick() {
      this.$router.push({ name: "Character", params: { id: this.$props.id } });
    },
  },
});
</script>
