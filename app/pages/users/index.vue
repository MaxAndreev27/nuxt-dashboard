<script setup lang="ts">
import { onMounted, ref } from 'vue'

import type { UserPublic } from '~/client'
import { usersV1ReadUsers } from '~/client/sdk.gen'

definePageMeta({
  middleware: ['auth']
})

const auth = useAuthStore()

const users = ref<UserPublic[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

async function load() {
  loading.value = true
  error.value = null

  try {
    await auth.init()

    if (!auth.isAuthenticated) {
      error.value = 'Unauthorized'
      return
    }

    const { data, error: err } = await usersV1ReadUsers()
    if (err || !data) {
      error.value = 'Could not load users.'
      return
    }

    users.value = data
  } catch {
    error.value = 'Could not load users.'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-semibold text-gray-900 dark:text-white">
          Users
        </h1>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Overview of all registered users.
        </p>
      </div>

      <UBadge
        color="primary"
        variant="soft"
      >
        {{ users.length }} users
      </UBadge>
    </div>

    <UCard class="border border-gray-200/70 bg-white/70 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/70">
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              Registered users
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              View-only table for authorized users.
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
          Loading users...
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
        v-else-if="users.length"
        class="overflow-x-auto"
      >
        <table class="min-w-full divide-y divide-gray-200 text-sm dark:divide-gray-800">
          <thead>
            <tr class="text-left text-gray-600 dark:text-gray-400">
              <th class="px-3 py-3 font-medium">
                ID
              </th>
              <th class="px-3 py-3 font-medium">
                Username
              </th>
              <th class="px-3 py-3 font-medium">
                Email
              </th>
              <th class="px-3 py-3 font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
            <tr
              v-for="user in users"
              :key="user.id ?? user.username"
              class="hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              <td class="px-3 py-3 font-mono text-gray-700 dark:text-gray-300">
                {{ user.id ?? '-' }}
              </td>
              <td class="px-3 py-3 font-medium text-gray-900 dark:text-white">
                {{ user.username }}
              </td>
              <td class="px-3 py-3 text-gray-600 dark:text-gray-400">
                {{ user.email }}
              </td>
              <td class="px-3 py-3">
                <UBadge
                  :color="user.disabled ? 'warning' : 'success'"
                  variant="soft"
                >
                  {{ user.disabled ? 'Disabled' : 'Active' }}
                </UBadge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-else
        class="py-12 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        No users found.
      </div>
    </UCard>
  </div>
</template>
