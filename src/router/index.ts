import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Characters from "../views/Characters.vue";
import Episodes from "../views/Episodes.vue";
import Locations from "../views/Locations.vue";
import CharacterPage from '@/views/CharacterPage.vue'
import EpisodePage from '@/views/EpisodePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Characters",
    component: Characters,
  },
  {
    path: '/:id',
    name: 'Character',
    component: CharacterPage
  },
  {
    path: '/episodes',
    name: 'Episodes',
    component: Episodes
  },
  {
    path: '/episodes/:id',
    name: 'Episode',
    component: EpisodePage
  },
  {
    path: '/locations',
    name: 'Locations',
    component: Locations
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/CharacterPage.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
