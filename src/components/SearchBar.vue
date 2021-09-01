<template>
  <q-input bottom-slots v-model="text" :label="label">
    <template v-slot:append>
      <q-icon
        :name="text ? 'fa fa-times' : 'fa fa-search'"
        :class="text && 'cursor-pointer'"
      />
    </template>
    <template v-slot:hint>{{ hint }}</template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    label: {
      type: String,
      default: "",
    },
    hint: {
      type: String,
      default: "",
    },
    onSearch: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      text: "",
    };
  },
  watch: {
    text(newText) {
      this.onSearch(newText);
    },
  },
});
</script>
