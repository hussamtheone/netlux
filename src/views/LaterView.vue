<script>
import { mapStores } from 'pinia'
import { useLaterStore } from '../stores/later'
import ShowGrid from '../components/ShowGrid.vue'

export default {
  name: 'LaterView',
  components: { ShowGrid },
  computed: {
    ...mapStores(useLaterStore)
  }
}
</script>

<template>
  <div>
    <div class="flex flex-wrap items-center justify-between gap-4">
      <h1 class="font-display font-extrabold text-4xl">À regarder plus tard</h1>
      <button v-if="laterStore.items.length" @click="laterStore.clear()" class="btn bg-panel hover:bg-line">Vider la liste</button>
    </div>

    <div v-if="!laterStore.items.length" class="py-16 text-center">
      <p class="text-mist">Votre liste est vide. Utilisez l’icône marque-page sur une série pour l’ajouter ici.</p>
      <router-link to="/" class="btn mt-4 bg-ember hover:bg-red-500">Découvrir des séries</router-link>
    </div>
    <div v-else class="mt-6"><ShowGrid :shows="laterStore.items" /></div>
  </div>
</template>