<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import type { HeroPublic } from '~/client'
import { heroesV1ReadHero, heroesV1UpdateHero } from '~/client/sdk.gen'

const route = useRoute()
const heroId = computed(() => Number(route.params.id))

const hero = ref<HeroPublic | null>(null)
const loading = ref(true)
const saving = ref(false)
const error = ref<string | null>(null)
const isEditing = ref(false)

const form = ref({
  name: '',
  age: null as number | null,
  secret_name: ''
})

async function loadHero() {
  loading.value = true
  error.value = null

  try {
    const { data, error: err } = await heroesV1ReadHero({
      path: { hero_id: heroId.value }
    })

    if (err || !data) {
      error.value = 'Could not load hero.'
      return
    }

    hero.value = data
    form.value = {
      name: data.name,
      age: data.age ?? null,
      secret_name: ''
    }
  } catch {
    error.value = 'Could not load hero.'
  } finally {
    loading.value = false
  }
}

async function saveHero() {
  saving.value = true
  error.value = null

  try {
    const { data, error: err } = await heroesV1UpdateHero({
      path: { hero_id: heroId.value },
      body: {
        name: form.value.name,
        age: form.value.age,
        secret_name: form.value.secret_name
      }
    })

    if (err || !data) {
      error.value = 'Could not update hero.'
      return
    }

    hero.value = data
    isEditing.value = false
  } catch {
    error.value = 'Could not update hero.'
  } finally {
    saving.value = false
  }
}

watch(heroId, () => {
  void loadHero()
}, { immediate: true })
</script>

<template>
  <div class="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-3xl font-semibold text-gray-900 dark:text-white">
          Hero details
        </h1>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          View or edit the selected hero.
        </p>
      </div>

      <div class="flex gap-2">
        <UButton
          to="/heroes"
          color="neutral"
          variant="soft"
        >
          Back to list
        </UButton>
        <UButton
          v-if="!isEditing"
          color="primary"
          @click="isEditing = true"
        >
          Edit
        </UButton>
      </div>
    </div>

    <UCard class="border border-gray-200/70 bg-white/70 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/70">
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center gap-4 py-12"
      >
        <div class="flex h-12 w-12 items-center justify-center rounded-full border-4 border-gray-200 border-t-primary-500 animate-spin dark:border-gray-800" />
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Loading hero...
        </p>
      </div>

      <UAlert
        v-else-if="error"
        color="error"
        variant="soft"
        icon="i-lucide-circle-alert"
        :title="error"
      />

      <div
        v-else-if="hero"
        class="space-y-6"
      >
        <div
          v-if="!isEditing"
          class="space-y-4"
        >
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Name
            </p>
            <p class="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
              {{ hero.name }}
            </p>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Age
            </p>
            <p class="mt-1 text-lg text-gray-700 dark:text-gray-300">
              {{ hero.age ?? '-' }}
            </p>
          </div>
        </div>

        <form
          v-else
          class="space-y-5"
          @submit.prevent="saveHero"
        >
          <UFormField
            label="Name"
            required
          >
            <UInput
              v-model="form.name"
              size="lg"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Age">
            <UInput
              v-model="form.age"
              type="number"
              size="lg"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Secret Name"
            required
          >
            <UInput
              v-model="form.secret_name"
              size="lg"
              class="w-full"
            />
          </UFormField>

          <div class="flex flex-col gap-3 sm:flex-row">
            <UButton
              type="submit"
              color="primary"
              :loading="saving"
              class="w-full sm:w-auto"
            >
              Save changes
            </UButton>
            <UButton
              color="neutral"
              variant="soft"
              class="w-full sm:w-auto"
              @click="isEditing = false"
            >
              Cancel
            </UButton>
          </div>
        </form>
      </div>
    </UCard>
  </div>
</template>
