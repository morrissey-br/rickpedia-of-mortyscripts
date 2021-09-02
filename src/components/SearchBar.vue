<template>
  <q-input bottom-slots v-model="text" :label="label">
    <template v-slot:append>
      <q-icon
        v-if="text.length > 0"
        name="fa fa-times"
        :class="text && 'cursor-pointer'"
        @click="handleCleanClick"
      />
      <q-icon v-else name="fa fa-search" :class="text && 'cursor-pointer'" />
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
    text(newText: string) {
      this.onSearch(newText);
    },
  },
  methods: {
    handleCleanClick() {
      this.text = ''
    }
  }
});
</script>
