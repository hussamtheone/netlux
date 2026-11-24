<script>
import { mapStores } from 'pinia'
import { useShowsStore } from '../stores/shows'
import ShowCard from './ShowCard.vue'

export default {
  name: 'ShowGrid',
  components: { ShowCard },
  props: {
    shows: { type: Array, required: true },
    empty: String
  },
  data() {
    return { count: 24 }
  },
  computed: {
    ...mapStores(useShowsStore)
  },
  watch: {
    shows() {
      this.count = 24
    }
  }
}
</script>

<template>
  <div v-if="showsStore.loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
    <div v-for="n in 12" :key="n" class="aspect-[2/3] rounded-md bg-panel animate-pulse"></div>
  </div>
  <div v-else-if="showsStore.error" role="alert" class="rounded-md border border-ember p-4 text-ember">
    <p>{{ showsStore.error }}</p>
    <button @click="showsStore.load()" class="btn mt-3 bg-ember text-white hover:bg-red-500">Réessayer</button>
  </div>
  <p v-else-if="!shows.length" class="py-12 text-center text-mist">
    {{ empty || 'Aucune série ne correspond à votre recherche.' }}
  </p>
  <template v-else>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
      <ShowCard v-for="s in shows.slice(0, count)" :key="s.id" :show="s" />
    </div>
    <div v-if="count < shows.length" class="mt-8 text-center">
      <button @click="count += 24" class="btn bg-panel hover:bg-line">Afficher plus ({{ shows.length - count }} restantes)</button>
    </div>
  </template>
</template>