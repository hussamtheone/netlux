<script setup>
import { ref, computed } from 'vue'
import { fr, note, year, poster } from '../utils'
import { useShowsStore } from '../stores/shows'
import ShowGrid from '../components/ShowGrid.vue'

const showsStore = useShowsStore()
const q = ref('')
const minRating = ref(0)
const yr = ref('')
const status = ref('')

const top5 = computed(() => showsStore.shows.filter(note).sort((a, b) => note(b) - note(a)).slice(0, 5))
const years = computed(() => [...new Set(showsStore.shows.map(year).filter(Boolean))].sort((a, b) => b - a))
const statuses = computed(() => [...new Set(showsStore.shows.map((s) => s.status).filter(Boolean))])

const filtered = computed(() => {
  const t = q.value.trim().toLowerCase()
  return showsStore.shows.filter((s) =>
    (!t || s.name.toLowerCase().includes(t)) &&
    (!minRating.value || note(s) >= minRating.value) &&
    (!yr.value || year(s) === +yr.value) &&
    (!status.value || s.status === status.value))
})

const active = computed(() => q.value || minRating.value || yr.value || status.value)
function reset() { q.value = ''; minRating.value = 0; yr.value = ''; status.value = '' }
</script>

<template>
  <div>
    <h1 class="font-display font-extrabold text-4xl sm:text-5xl">Votre prochaine série est ici.</h1>
    <p class="mt-2 text-mist max-w-xl">
      Parcourez le catalogue, filtrez par note, annee ou statut, et gardez de côté ce que vous voulez voir plus tard.
    </p>

    <section v-if="top5.length" class="mt-10" aria-labelledby="top5">
      <h2 id="top5" class="font-display font-extrabold text-2xl mb-4">Les 5 meilleures séries</h2>
      <ol class="flex gap-6 overflow-x-auto pb-4">
        <li v-for="(s, i) in top5" :key="s.id" class="flex shrink-0 items-end">
          <span class="num font-display font-extrabold text-[9rem] leading-[0.8] -mr-6 select-none" aria-hidden="true">{{ i + 1 }}</span>
          <router-link :to="'/show/' + s.id" class="relative block w-40 sm:w-44 overflow-hidden rounded-md bg-panel aspect-[2/3]">
            <img :src="poster(s)" :alt="s.name" class="h-full w-full object-cover" />
            <span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-2 pt-8 text-sm font-semibold">
              {{ s.name }} <span class="text-ember">★ {{ note(s) }}</span>
            </span>
          </router-link>
        </li>
      </ol>
    </section>

    <section class="mt-10" aria-labelledby="all">
      <h2 id="all" class="font-display font-extrabold text-2xl mb-4">Toutes les séries</h2>

      <div class="mb-6 flex flex-wrap items-end gap-3">
        <label class="grow basis-64">
          <span class="sr-only">Rechercher par titre</span>
          <input v-model="q" type="search" placeholder="Rechercher une série par titre" class="fld w-full" />
        </label>
        <label class="text-sm text-mist">Note
          <select v-model.number="minRating" class="fld block mt-1">
            <option :value="0">Toutes</option>
            <option v-for="n in [9, 8, 7, 6, 5]" :key="n" :value="n">{{ n }} et plus</option>
          </select>
        </label>
        <label class="text-sm text-mist">Année
          <select v-model="yr" class="fld block mt-1">
            <option value="">Toutes</option>
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
        </label>
        <label class="text-sm text-mist">Statut
          <select v-model="status" class="fld block mt-1">
            <option value="">Tous</option>
            <option v-for="s in statuses" :key="s" :value="s">{{ fr(s) }}</option>
          </select>
        </label>
        <button v-if="active" @click="reset" class="btn bg-panel hover:bg-line">Réinitialiser</button>
      </div>

      <p v-if="!showsStore.loading && !showsStore.error" class="mb-4 text-sm text-mist" aria-live="polite">{{ filtered.length }} serie(s)</p>
      <p v-if="showsStore.partial" role="status" class="mb-4 rounded-md border border-line p-3 text-sm text-mist">
  Certaines pages du catalogue n'ont pas pu être chargées.
  <button @click="showsStore.load()" class="underline hover:text-white">Réessayer</button>
</p>
      <ShowGrid :shows="filtered" />
    </section>
  </div>
</template>
