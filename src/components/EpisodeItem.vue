<template>
  <q-item class="cursor-pointer" clickable @click="$emit('click', e)">
    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
      <q-item-label caption lines="1">{{ caption }}</q-item-label>
    </q-item-section>
    <q-item-section side top>
      <q-icon name="fa fa-angle-right" />
    </q-item-section>
  </q-item>
  <q-separator spaced inset />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ['click'],
  props: {
    label: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: "",
    },
  },
});
</script>
