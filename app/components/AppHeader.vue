<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'

import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const isMounted = ref(false)

const items = computed<NavigationMenuItem[]>(() => {
  const menuItems: NavigationMenuItem[] = [
    {
      label: 'Heroes',
      to: '/heroes',
      active: route.path.startsWith('/heroes')
    }
  ]

  if (auth.isAuthenticated) {
    menuItems.push({
      label: 'Users',
      to: '/users',
      active: route.path.startsWith('/users')
    })
  }

  return menuItems
})

async function handleLogout() {
  auth.logout()
  await router.push('/')
}

onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <UHeader>
    <template #title>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      class="hidden md:flex"
    />

    <template #right>
      <div class="flex flex-wrap items-center justify-end gap-2">
        <UColorModeButton />

        <UButton
          to="https://github.com/MaxAndreev27/nuxt-dashboard"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />

        <div
          v-if="isMounted"
          class="flex gap-2"
        >
          <div class="flex items-center gap-2">
            <template v-if="auth.isAuthenticated">
              <div class="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-800">
                <div class="hidden sm:flex items-center gap-2">
                  <UAvatar
                    :alt="auth.user?.username || 'User'"
                    size="sm"
                    class="bg-primary-500/10 text-primary-500 font-semibold"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {{ auth.user?.username }}
                  </span>
                </div>

                <UButton
                  color="error"
                  variant="ghost"
                  size="sm"
                  icon="i-lucide-log-out"
                  aria-label="Logout"
                  @click="handleLogout"
                >
                  Logout
                </UButton>
              </div>
            </template>

            <template v-else>
              <div class="flex items-center gap-2">
                <UButton
                  to="/login"
                  color="neutral"
                  variant="ghost"
                  size="sm"
                  class="hidden sm:inline-flex"
                >
                  Sign in
                </UButton>

                <UButton
                  to="/register"
                  color="primary"
                  variant="solid"
                  size="sm"
                  icon="i-lucide-user-round-plus"
                  class="hidden sm:inline-flex"
                >
                  Register
                </UButton>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>

    <template #body>
      <div
        v-if="isMounted"
        class="flex flex-col gap-2 p-4"
      >
        <NuxtLink
          v-for="item in items"
          :key="item.label"
          :to="item.to"
          class="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
          :class="item.active ? 'bg-primary-500/10 text-primary-500 dark:bg-primary-500/20' : ''"
        >
          {{ item.label }}
        </NuxtLink>

        <div class="my-2 border-t border-gray-200 dark:border-gray-800" />

        <template v-if="auth.isAuthenticated">
          <div class="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-800">
            <UAvatar
              :alt="auth.user?.username || 'User'"
              size="sm"
              class="bg-primary-500/10 text-primary-500 font-semibold"
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-200">
              {{ auth.user?.username }}
            </span>
          </div>

          <UButton
            color="error"
            variant="soft"
            icon="i-lucide-log-out"
            class="justify-start"
            @click="handleLogout"
          >
            Logout
          </UButton>
        </template>

        <template v-else>
          <UButton
            to="/login"
            color="neutral"
            variant="soft"
            icon="i-lucide-log-in"
            class="justify-start"
          >
            Sign in
          </UButton>

          <UButton
            to="/register"
            color="primary"
            variant="solid"
            icon="i-lucide-user-round-plus"
            class="justify-start"
          >
            Register
          </UButton>
        </template>
      </div>
    </template>
  </UHeader>
</template>
