import { createApp, provide, h } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from "./apollo/apollo-config";

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})
  .use(Quasar, quasarUserOptions)
  .use(store)
  .use(router)
  .mount("#app");
