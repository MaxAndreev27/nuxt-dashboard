<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

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
</script>

<template>
  <UHeader>
    <template #title>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <UButton
        to="https://github.com/MaxAndreev27/nuxt-dashboard"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      />

      <div class="flex gap-2">
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
                icon="i-heroicons-arrow-right-start-on-rectangle"
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
              >
                Sign in
              </UButton>

              <UButton
                to="/register"
                color="primary"
                variant="solid"
                size="sm"
                icon="i-heroicons-user-plus"
              >
                Register
              </UButton>
            </div>
          </template>
        </div>
      </div>
    </template>
  </UHeader>
</template>
