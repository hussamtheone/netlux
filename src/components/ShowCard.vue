<script setup>
import { year, note, poster } from '../utils'
import { useLaterStore } from '../stores/later'

defineProps({ show: { type: Object, required: true } })
const later = useLaterStore()
</script>

<template>
  <article class="group relative">
    <router-link :to="'/show/' + show.id" class="block overflow-hidden rounded-md bg-panel aspect-[2/3]">
      <img
        v-if="poster(show)" :src="poster(show)" :alt="'Affiche de ' + show.name" loading="lazy"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <span v-else class="flex h-full items-center justify-center p-3 text-center text-mist">{{ show.name }}</span>
    </router-link>

    <button
      @click="later.toggle(show)" :aria-pressed="later.isLater(show.id)"
      :aria-label="later.isLater(show.id) ? 'Retirer de la liste à regarder plus tard' : 'Ajouter à la liste à regarder plus tard'"
      class="absolute top-2 right-2 rounded-full bg-ink/80 p-2 hover:bg-ember transition-colors"
    >
      <svg viewBox="0 0 24 24" class="h-5 w-5" :fill="later.isLater(show.id) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
        <path d="M6 3h12v18l-6-4-6 4z" />
      </svg>
    </button>

    <h3 class="mt-2 font-semibold leading-tight truncate">{{ show.name }}</h3>
    <p class="flex gap-3 text-sm text-mist">
      <span>{{ year(show) || '—' }}</span>
      <span><span class="text-ember">★</span> {{ note(show) || '—' }}</span>
    </p>
  </article>
</template>
