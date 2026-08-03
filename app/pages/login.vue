<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const username = ref('')
const password = ref('')
const showPassword = ref(false)

async function handleSubmit() {
  const ok = await auth.login(username.value, password.value)
  if (ok) {
    const redirect = (route.query.redirect as string) || '/'
    await router.push(redirect)
  }
}
</script>

<template>
  <div class="mx-auto w-full max-w-md px-4 py-8 sm:px-6 sm:py-12">
    <div class="text-center space-y-2">
      <UBadge
        color="primary"
        variant="soft"
        class="rounded-full px-3 py-1 text-xs font-medium"
      >
        FastAPI Authentication
      </UBadge>

      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        Sign in
      </h1>

      <p class="text-sm text-gray-600 dark:text-gray-400">
        Welcome back! Please enter your credentials.
      </p>
    </div>

    <UCard class="shadow-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur">
      <form
        class="space-y-5"
        @submit.prevent="handleSubmit"
      >
        <UFormField
          label="Username"
          required
        >
          <UInput
            v-model="username"
            type="text"
            placeholder="Enter your username"
            icon="i-lucide-user-round"
            size="lg"
            class="w-full"
            autocomplete="username"
          />
        </UFormField>

        <UFormField
          label="Password"
          required
        >
          <UInput
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
            icon="i-lucide-lock"
            size="lg"
            class="w-full"
            autocomplete="current-password"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormField>

        <UAlert
          v-if="auth.error"
          color="error"
          variant="soft"
          icon="i-lucide-circle-alert"
          :title="auth.error"
        />

        <UButton
          type="submit"
          block
          size="lg"
          color="primary"
          :loading="auth.loading"
          icon="i-lucide-log-in"
        >
          {{ auth.loading ? 'Signing in...' : 'Sign in' }}
        </UButton>
      </form>

      <template #footer>
        <p class="text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?
          <NuxtLink
            to="/register"
            class="font-semibold text-primary hover:underline"
          >
            Create one
          </NuxtLink>
        </p>
      </template>
    </UCard>

    <p class="text-center text-xs text-gray-400 dark:text-gray-500">
      OAuth2 Password Bearer · FastAPI backend
    </p>
  </div>
</template>
