import { defineStore } from 'pinia'

const KEY = 'netlux.later'

function read() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch (e) { return [] }
}

export const useLaterStore = defineStore('later', {
  state: () => ({ items: read() }),

  getters: {
    isLater: (state) => (id) => state.items.some((s) => s.id === id)
  },

  actions: {
    toggle(s) {
      if (this.isLater(s.id)) {
        this.items = this.items.filter((x) => x.id !== s.id)
      } else {
        this.items.push({ id: s.id, name: s.name, image: s.image, rating: s.rating, premiered: s.premiered, status: s.status, genres: s.genres })
      }
      this.save()
    },
    clear() {
      this.items = []
      this.save()
    },
    save() {
      try { localStorage.setItem(KEY, JSON.stringify(this.items)) } catch (e) {}
    }
  }
})