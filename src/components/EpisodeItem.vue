<template>
  <q-item class="cursor-pointer" clickable @click="handleClick">
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
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleClick() {
      this.$router.push({name: 'Episode', params: {id: this.$props.id}})
    }
  }
});
</script>
