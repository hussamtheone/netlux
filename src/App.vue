<script>
import { mapStores } from 'pinia'
import { useLaterStore } from './stores/later'

export default {
  name: 'App',
  data() {
    return {
      links: [
        { name: 'home', to: '/', label: 'Accueil' },
        { name: 'cat', to: '/categories', label: 'Catégories' },
        { name: 'later', to: '/later', label: 'À regarder plus tard' }
      ]
    }
  },
  computed: {
    ...mapStores(useLaterStore)
  }
}
</script>

<template>
  <header class="sticky top-0 z-30 bg-ink/90 backdrop-blur border-b border-line">
    <nav class="max-w-7xl mx-auto px-4 h-16 flex items-center gap-5 sm:gap-8">
      <router-link to="/" class="font-display font-extrabold text-2xl text-ember">Netlux</router-link>
      <router-link
        v-for="l in links" :key="l.to" :to="l.to"
        :class="['text-sm font-medium hover:text-white', $route.name === l.name ? 'text-white' : 'text-mist']"
      >
        {{ l.label }}
        <span v-if="l.name === 'later' && laterStore.items.length" class="ml-1 rounded-full bg-ember px-2 py-0.5 text-xs">
          {{ laterStore.items.length }}
        </span>
      </router-link>
    </nav>
  </header>

  <main class="max-w-7xl mx-auto px-4 py-8 min-h-[80vh]">
    <router-view :key="$route.fullPath" />
  </main>

  <footer class="border-t border-line py-6 text-center text-sm text-mist">Données fournies par l’API TVMaze.</footer>
</template>