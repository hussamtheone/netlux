<script>
import { mapStores } from 'pinia'
import { useShowsStore } from '../stores/shows'
import ShowGrid from '../components/ShowGrid.vue'

export default {
  name: 'CategoriesView',
  components: { ShowGrid },
  props: {
    genre: String
  },
  computed: {
    ...mapStores(useShowsStore),
    genres() {
      const m = {}
      this.showsStore.shows.forEach((s) => (s.genres || []).forEach((g) => { m[g] = (m[g] || 0) + 1 }))
      return Object.entries(m).sort((a, b) => a[0].localeCompare(b[0]))
    },
    current() {
      return this.genre || (this.genres[0] && this.genres[0][0]) || ''
    },
    list() {
      return this.showsStore.shows.filter((s) => (s.genres || []).includes(this.current))
    }
  }
}
</script>

<template>
  <div>
    <h1 class="font-display font-extrabold text-4xl">Catégories</h1>

    <nav class="mt-6 flex flex-wrap gap-2" aria-label="Catégories">
      <router-link
        v-for="[g, n] in genres" :key="g" :to="{ name: 'cat', params: { genre: g } }"
        :aria-current="g === current ? 'page' : null"
        :class="['rounded-full border px-4 py-1.5 text-sm transition-colors',
          g === current ? 'bg-ember border-ember font-semibold' : 'border-line text-mist hover:text-white hover:border-mist']"
      >
        {{ g }} <span class="opacity-70">{{ n }}</span>
      </router-link>
    </nav>

    <h2 v-if="current" class="mt-8 mb-4 font-display font-extrabold text-2xl">{{ current }}</h2>
    <ShowGrid :shows="list" empty="Aucune série dans cette catégorie." />
  </div>
</template>