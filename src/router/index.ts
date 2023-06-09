import { createRouter, createWebHistory } from 'vue-router'
import OverviewView from '../views/OverviewView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Overview',
      component: OverviewView
    },
    {
      path: '/movies',
      name: 'Movies',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MoviesView.vue')
    },
    {
      path: '/movies/:movieIndex',
      name: 'Movie',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MovieView.vue')
    }
  ]
})

export default router
