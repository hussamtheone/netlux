import { defineStore } from 'pinia'
import { API } from '../utils'

const PAGES = 10 
async function fetchPage(n) {
  const r = await fetch(`${API}/shows?page=${n}`)
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.json()
}

export const useShowsStore = defineStore('shows', {
  state: () => ({
    shows: [],
    loading: true,
    error: '',
    partial: false 
  }),

  actions: {
    async load() {
      this.loading = true
      this.error = ''
      this.partial = false

      const results = await Promise.allSettled(Array.from({ length: PAGES }, (_, n) => fetchPage(n)))
      const loaded = results.filter((r) => r.status === 'fulfilled').flatMap((r) => r.value)
      const someFailed = results.some((r) => r.status === 'rejected')

      if (loaded.length) {
        this.shows = loaded
        this.partial = someFailed
      } else if (this.shows.length) {
        this.partial = true 
      } else {
        this.error = 'Impossible de charger les séries. Vérifiez votre connexion internet, puis rechargez la page.'
      }
      this.loading = false
    }
  }
})