<script setup lang="ts">
import { ref } from 'vue'

import { heroesV1CreateHero } from '~/client/sdk.gen'

const router = useRouter()
const loading = ref(false)
const error = ref<string | null>(null)

const form = ref({
  name: '',
  age: null as number | null,
  secret_name: ''
})

async function submit() {
  loading.value = true
  error.value = null

  try {
    const { data, error: err } = await heroesV1CreateHero({
      body: {
        name: form.value.name,
        age: form.value.age,
        secret_name: form.value.secret_name
      }
    })

    if (err || !data) {
      error.value = 'Could not create hero.'
      return
    }

    await router.push(`/heroes/${data.id}`)
  } catch {
    error.value = 'Could not create hero.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
    <div class="mb-6">
      <h1 class="text-3xl font-semibold text-gray-900 dark:text-white">
        Create hero
      </h1>
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Add a new hero to the catalog.
      </p>
    </div>

    <UCard class="border border-gray-200/70 bg-white/70 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/70">
      <form
        class="space-y-5"
        @submit.prevent="submit"
      >
        <UFormField
          label="Name"
          required
        >
          <UInput
            v-model="form.name"
            placeholder="Enter hero name"
            size="lg"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Age">
          <UInput
            v-model="form.age"
            type="number"
            placeholder="Enter age"
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
            placeholder="Enter secret name"
            size="lg"
            class="w-full"
          />
        </UFormField>

        <UAlert
          v-if="error"
          color="error"
          variant="soft"
          icon="i-heroicons-exclamation-triangle"
          :title="error"
        />

        <div class="flex flex-col gap-3 sm:flex-row">
          <UButton
            type="submit"
            color="primary"
            :loading="loading"
            class="w-full sm:w-auto"
          >
            Create hero
          </UButton>
          <UButton
            to="/heroes"
            color="neutral"
            variant="soft"
            class="w-full sm:w-auto"
          >
            Cancel
          </UButton>
        </div>
      </form>
    </UCard>
  </div>
</template>
