import { createPinia } from 'pinia'
import type { StateTree } from 'pinia'
import { toRaw } from 'vue'

type PayloadWithPinia = {
  pinia?: Record<string, StateTree>
}

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia()
  nuxtApp.vueApp.use(pinia)

  const payload = nuxtApp.payload as PayloadWithPinia

  if (import.meta.client && payload.pinia) {
    pinia.state.value = payload.pinia
  }

  if (import.meta.server) {
    nuxtApp.hook('app:rendered', () => {
      payload.pinia = toRaw(pinia.state.value)
    })
  }

  return {
    provide: {
      pinia
    }
  }
})
