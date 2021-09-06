<template>
  <q-chip :color="color" icon='fa fa-heart' text-color="white">{{ text }}</q-chip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {    
    text: {
      type: String,
      default: 'Unknown'
    },
  },
  computed: {
    color() {
      switch (this.text) {
        case 'Alive':
          return 'positive'
        case 'Dead':
          return 'negative'
        default:
          return 'grey-5'
      }
    },
    icon() {
      switch (this.text) {
        case 'Alive':
          return 'fa fa-heart'
        case 'Dead':
          return 'fa fa-dizzy'
        default:
          return 'fa fa-question'
      }
    }
  }
})
</script>
