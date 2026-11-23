<script setup>
import { ref, computed } from 'vue'
import { API, DAYS, fr, note, year, strip, poster, https } from '../utils'
import { useLaterStore } from '../stores/later'

const props = defineProps({ id: String })
const later = useLaterStore()
const show = ref(null)
const loading = ref(true)
const error = ref('')

async function load() {
  try {
    const r = await fetch(`${API}/shows/${props.id}?embed=cast`)
    if (!r.ok) throw new Error()
    show.value = await r.json()
  } catch (e) {
    error.value = 'Cette série est introuvable ou le service ne répond pas.'
  } finally {
    loading.value = false
  }
}
load()

const infos = computed(() => {
  const s = show.value
  if (!s) return []
  const net = s.network || s.webChannel
  const sch = s.schedule || {}
  const run = s.runtime || s.averageRuntime
  const jours = (sch.days || []).map((d) => DAYS[d] || d).join(', ')
  return [
    ['Langue', s.language],
    ['Type', s.type],
    ['Durée d’un épisode', run ? run + ' min' : null],
    ['Diffusion', [jours, sch.time].filter(Boolean).join(' à ') || null],
    ['Chaîne', net ? net.name + (net.country ? ' (' + net.country.name + ')' : '') : null],
    ['Première diffusion', s.premiered],
    ['Dernière diffusion', s.ended]
  ].filter((r) => r[1])
})

const cast = computed(() => (show.value?._embedded ? show.value._embedded.cast.slice(0, 12) : []))
</script>

<template>
  <div>
    <router-link to="/" class="text-sm text-mist hover:text-white">‹ Retour au catalogue</router-link>

    <p v-if="loading" class="py-20 text-center text-mist">Chargement…</p>
    <p v-else-if="error" class="mt-6 rounded-md border border-ember p-4 text-ember">{{ error }}</p>

    <article v-else class="mt-6">
      <div class="grid gap-8 md:grid-cols-[320px_1fr]">
        <img
          v-if="poster(show, 'original')" :src="poster(show, 'original')" :alt="'Affiche de ' + show.name"
          class="w-full max-w-xs mx-auto md:mx-0 rounded-md"
        />
        <div>
          <h1 class="font-display font-extrabold text-4xl sm:text-5xl">{{ show.name }}</h1>

          <p class="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-lg">
            <span><span class="text-ember">★</span> {{ note(show) ? note(show) + ' / 10' : 'Pas de note' }}</span>
            <span>{{ year(show) || 'Année inconnue' }}</span>
            <span class="rounded border border-line px-2 py-0.5 text-sm">{{ fr(show.status) }}</span>
          </p>

          <ul v-if="show.genres.length" class="mt-4 flex flex-wrap gap-2">
            <li v-for="g in show.genres" :key="g">
              <router-link :to="{ name: 'cat', params: { genre: g } }" class="rounded-full bg-panel px-3 py-1 text-sm hover:bg-line">{{ g }}</router-link>
            </li>
          </ul>

          <p class="mt-6 max-w-2xl leading-relaxed text-mist">{{ strip(show.summary) || 'Aucune description disponible.' }}</p>

          <button
            @click="later.toggle(show)" :aria-pressed="later.isLater(show.id)"
            :class="['btn mt-6', later.isLater(show.id) ? 'bg-panel border border-ember' : 'bg-ember hover:bg-red-500']"
          >
            {{ later.isLater(show.id) ? 'Retirer de ma liste' : 'Regarder plus tard' }}
          </button>

          <dl class="mt-8 grid max-w-2xl gap-x-8 gap-y-3 sm:grid-cols-2">
            <div v-for="[k, v] in infos" :key="k">
              <dt class="text-sm text-mist">{{ k }}</dt>
              <dd>{{ v }}</dd>
            </div>
          </dl>

          <p class="mt-6 flex flex-wrap gap-4 text-sm">
            <a v-if="show.officialSite" :href="https(show.officialSite)" target="_blank" rel="noopener" class="underline hover:text-ember">Site officiel</a>
            <a v-if="show.externals?.imdb" :href="'https://www.imdb.com/title/' + show.externals.imdb" target="_blank" rel="noopener" class="underline hover:text-ember">Fiche IMDb</a>
            <a :href="https(show.url)" target="_blank" rel="noopener" class="underline hover:text-ember">Fiche TVMaze</a>
          </p>
        </div>
      </div>

      <section v-if="cast.length" class="mt-12">
        <h2 class="font-display font-extrabold text-2xl mb-4">Distribution</h2>
        <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <li v-for="c in cast" :key="c.person.id + '-' + c.character.id">
            <div class="aspect-square overflow-hidden rounded-md bg-panel">
              <img v-if="c.person.image" :src="https(c.person.image.medium)" :alt="c.person.name" loading="lazy" class="h-full w-full object-cover" />
            </div>
            <p class="mt-2 text-sm font-semibold leading-tight">{{ c.person.name }}</p>
            <p class="text-sm text-mist leading-tight">{{ c.character.name }}</p>
          </li>
        </ul>
      </section>
    </article>
  </div>
</template>
