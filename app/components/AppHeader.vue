<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Heroes',
    to: '/heroes',
    active: route.path.startsWith('/heroes')
  },
  {
    label: 'Login',
    to: '/login',
    active: route.path.startsWith('/login')
  },
  {
    label: 'Register',
    to: '/register',
    active: route.path.startsWith('/register')
  }
])
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
    </template>
  </UHeader>
</template>
