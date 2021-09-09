<template>
  <q-item class="cursor-pointer" clickable @click="handleClick">
    <q-item-section>
      <q-item-label>{{ name }}</q-item-label>
      <q-item-label caption lines="1">{{type}} {{dimension}}</q-item-label>
    </q-item-section>

    <q-item-section side top>
      <q-icon name="fa fa-angle-right" />
    </q-item-section>
  </q-item>
  <q-separator spaced inset v-if="separator"/>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    dimension: {
      type: String,
      required: true,
    },
    separator: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClick() {
      this.$router.push({name: 'Location', params: {id: this.$props.id}})
    }
  }
});
</script>
