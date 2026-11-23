<script setup>
import { ref, watch } from 'vue'
import { useShowsStore } from '../stores/shows'
import ShowCard from './ShowCard.vue'

const props = defineProps({ shows: { type: Array, required: true }, empty: String })
const showsStore = useShowsStore()
const count = ref(24)
watch(() => props.shows, () => { count.value = 24 })
</script>

<template>
  <div v-if="showsStore.loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
    <div v-for="n in 12" :key="n" class="aspect-[2/3] rounded-md bg-panel animate-pulse"></div>
  </div>
  <p v-else-if="showsStore.error" class="rounded-md border border-ember p-4 text-ember">{{ showsStore.error }}</p>
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
