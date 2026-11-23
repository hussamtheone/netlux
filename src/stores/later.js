import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const KEY = 'netlux.later'

function read() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch (e) { return [] }
}

export const useLaterStore = defineStore('later', () => {
  const items = ref(read())

  watch(items, (v) => {
    try { localStorage.setItem(KEY, JSON.stringify(v)) } catch (e) {}
  }, { deep: true })

  const isLater = (id) => items.value.some((s) => s.id === id)

  function toggle(s) {
    if (isLater(s.id)) {
      items.value = items.value.filter((x) => x.id !== s.id)
    } else {
      items.value.push({ id: s.id, name: s.name, image: s.image, rating: s.rating, premiered: s.premiered, status: s.status, genres: s.genres })
    }
  }

  function clear() { items.value = [] }

  return { items, isLater, toggle, clear }
})
