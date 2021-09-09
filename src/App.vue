<template>
  <q-layout view="lHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="@/assets/logo.png" />
          </q-avatar>
          Rickpedia of Mortyscripts
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs indicator-color="secondary" active-color="secondary">
        <q-route-tab to="/" exact label="Characters" />
        <q-route-tab to="/episodes" label="Episodes" />
        <q-route-tab to="/locations" label="Locations" />
      </q-tabs>
    </q-header>
    <q-page-container class="row justify-center">
      <router-view class="col col-md-8"></router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style lang="scss" scoped>
.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
