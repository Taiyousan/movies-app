import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Movies from '../views/Movies.vue'
import Actors from '../views/Actors.vue'
import Categories from '../views/Categories.vue'
import MovieDetails from '../views/MovieDetails.vue'
import Login from '../views/Login.vue'

function isLoggedIn() {
  return localStorage.getItem('token');
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL_API),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }

    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies,
      meta: { requiresAuth: true }

    },
    {
      path: '/actors',
      name: 'actors',
      component: Actors,
      meta: { requiresAuth: true }

    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories,
      meta: { requiresAuth: true }

    },
    {
      path: '/movies/:id',
      name: 'movieDetails',
      component: MovieDetails,
      meta: { requiresAuth: true },
      props: true
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn()) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router
