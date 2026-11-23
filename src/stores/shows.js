import { defineStore } from 'pinia'
import { ref } from 'vue'
import { API } from '../utils'

export const useShowsStore = defineStore('shows', () => {
  const shows = ref([])
  const loading = ref(true)
  const error = ref('')

  async function load() {
    try {
      const r = await fetch(`${API}/shows?page=0`)
      if (!r.ok) throw new Error()
      shows.value = await r.json()
    } catch (e) {
      error.value = 'Impossible de charger les séries. Vérifiez votre connexion internet, puis rechargez la page.'
    } finally {
      loading.value = false
    }
  }

  return { shows, loading, error, load }
})
