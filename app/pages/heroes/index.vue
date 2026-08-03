<script setup lang="ts">
import { onMounted, ref } from 'vue'

import type { HeroPublic } from '~/client'
import { heroesV1DeleteHero, heroesV1ReadHeroes } from '~/client/sdk.gen'

const heroes = ref<HeroPublic[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

async function loadHeroes() {
  loading.value = true
  error.value = null

  try {
    const { data, error: err } = await heroesV1ReadHeroes()
    if (err || !data) {
      error.value = 'Could not load heroes.'
      return
    }

    heroes.value = data
  } catch {
    error.value = 'Could not load heroes.'
  } finally {
    loading.value = false
  }
}

async function removeHero(heroId: number) {
  try {
    const { error: err } = await heroesV1DeleteHero({
      path: { hero_id: heroId }
    })

    if (err) {
      error.value = 'Could not delete hero.'
      return
    }

    await loadHeroes()
  } catch {
    error.value = 'Could not delete hero.'
  }
}

onMounted(loadHeroes)
</script>

<template>
  <div class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-semibold text-gray-900 dark:text-white">
          Heroes
        </h1>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Manage your heroes.
        </p>
      </div>

      <UButton
        to="/heroes/create"
        icon="i-heroicons-plus"
        color="primary"
      >
        Create hero
      </UButton>
    </div>

    <UCard class="border border-gray-200/70 bg-white/70 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/70">
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              Hero list
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              View, edit, or remove heroes.
            </p>
          </div>
        </div>
      </template>

      <div
        v-if="loading"
        class="flex flex-col items-center justify-center gap-4 py-12"
      >
        <div class="flex h-12 w-12 items-center justify-center rounded-full border-4 border-gray-200 border-t-primary-500 animate-spin dark:border-gray-800" />
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Loading heroes...
        </p>
      </div>

      <UAlert
        v-else-if="error"
        color="error"
        variant="soft"
        icon="i-heroicons-exclamation-triangle"
        :title="error"
      />

      <div
        v-else-if="heroes.length"
        class="overflow-x-auto"
      >
        <table class="min-w-full divide-y divide-gray-200 text-sm dark:divide-gray-800">
          <thead>
            <tr class="text-left text-gray-600 dark:text-gray-400">
              <th class="px-3 py-3 font-medium">
                ID
              </th>
              <th class="px-3 py-3 font-medium">
                Name
              </th>
              <th class="px-3 py-3 font-medium">
                Age
              </th>
              <th class="px-3 py-3 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
            <tr
              v-for="hero in heroes"
              :key="hero.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              <td class="px-3 py-3 font-mono text-gray-700 dark:text-gray-300">
                {{ hero.id }}
              </td>
              <td class="px-3 py-3 font-medium text-gray-900 dark:text-white">
                {{ hero.name }}
              </td>
              <td class="px-3 py-3 text-gray-600 dark:text-gray-400">
                {{ hero.age ?? '-' }}
              </td>
              <td class="px-3 py-3">
                <div class="flex flex-wrap gap-2">
                  <UButton
                    :to="`/heroes/${hero.id}`"
                    size="sm"
                    color="neutral"
                    variant="soft"
                  >
                    View
                  </UButton>
                  <UButton
                    :to="`/heroes/${hero.id}`"
                    size="sm"
                    color="primary"
                    variant="soft"
                  >
                    Edit
                  </UButton>
                  <UButton
                    size="sm"
                    color="error"
                    variant="soft"
                    @click="removeHero(hero.id)"
                  >
                    Delete
                  </UButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-else
        class="py-12 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        No heroes found.
      </div>
    </UCard>
  </div>
</template>
