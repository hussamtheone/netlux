import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import CategoriesView from './views/CategoriesView.vue'
import DetailView from './views/DetailView.vue'
import LaterView from './views/LaterView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/categories/:genre?', name: 'cat', component: CategoriesView, props: true },
    { path: '/show/:id', name: 'show', component: DetailView, props: true },
    { path: '/later', name: 'later', component: LaterView }
  ],
  scrollBehavior: () => ({ top: 0 })
})
