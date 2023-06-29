import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/show',
    name: 'Show',
    component: () => { return import('../views/Show/Show.vue') }
  },
  // {
  //   path: '/test',
  //   name: 'Test',
  //   component: () => { return import('../views/Test/Test.vue') }
  // },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
