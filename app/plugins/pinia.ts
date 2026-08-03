import { createPinia } from 'pinia'
import type { StateTree } from 'pinia'
import { toRaw } from 'vue'

declare global {
  // Vue runtime feature flags that can be read by externalized dependencies.
  // They are normally inlined at build-time, but may be accessed at runtime in SSR.

  var __VUE_OPTIONS_API__: boolean | undefined

  var __VUE_PROD_DEVTOOLS__: boolean | undefined

  var __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: boolean | undefined
}

type PayloadWithPinia = {
  pinia?: Record<string, StateTree>
}

function ensureVueFeatureFlags(): void {
  if (typeof globalThis.__VUE_OPTIONS_API__ !== 'boolean') {
    globalThis.__VUE_OPTIONS_API__ = true
  }

  if (typeof globalThis.__VUE_PROD_DEVTOOLS__ !== 'boolean') {
    globalThis.__VUE_PROD_DEVTOOLS__ = false
  }

  if (typeof globalThis.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ !== 'boolean') {
    globalThis.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  ensureVueFeatureFlags()

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
