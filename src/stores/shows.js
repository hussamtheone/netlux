import { defineStore } from 'pinia'
import { ref } from 'vue'
import { API } from '../utils'

const PAGES = 10 // 10 pages x 250 séries = environ 2500 séries

async function fetchPage(n) {
  const r = await fetch(`${API}/shows?page=${n}`)
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.json()
}

export const useShowsStore = defineStore('shows', () => {
  const shows = ref([])
  const loading = ref(true)
  const error = ref('')
  const partial = ref(false) // true si certaines pages n'ont pas pu être chargées

  async function load() {
    loading.value = true
    error.value = ''
    partial.value = false

    // les 10 pages sont demandées en parallèle ; une page qui échoue n'empêche pas les autres
    const results = await Promise.allSettled(
      Array.from({ length: PAGES }, (_, n) => fetchPage(n))
    )
    const loaded = results.filter((r) => r.status === 'fulfilled').flatMap((r) => r.value)
    const someFailed = results.some((r) => r.status === 'rejected')

    if (loaded.length) {
      shows.value = loaded
      partial.value = someFailed
    } else if (shows.value.length) {
      partial.value = true // on garde ce qu'on avait déjà
    } else {
      error.value = 'Impossible de charger les séries. Vérifiez votre connexion internet, puis rechargez la page.'
    }
    loading.value = false
  }

  return { shows, loading, error, partial, load }
})