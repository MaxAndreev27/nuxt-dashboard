<script setup lang="ts">
import { usersV1RegisterUser } from '~/client/sdk.gen'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const error = ref<string | null>(null)

async function handleSubmit() {
  error.value = null

  if (!username.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'Please fill in all fields.'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }

  loading.value = true

  try {
    const { data, error: registerError } = await usersV1RegisterUser({
      body: {
        username: username.value,
        email: email.value,
        password: password.value
      }
    })

    if (registerError || !data) {
      error.value = 'Registration failed. Please try again.'
      return
    }

    const ok = await auth.login(username.value, password.value)
    if (ok) {
      const redirect = (route.query.redirect as string) || '/'
      await router.push(redirect)
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Registration failed.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="space-y-6 mx-auto max-w-md py-12">
    <div class="text-center space-y-2">
      <UBadge
        color="primary"
        variant="soft"
        class="rounded-full px-3 py-1 text-xs font-medium"
      >
        FastAPI Authentication
      </UBadge>

      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        Create an account
      </h1>

      <p class="text-sm text-gray-600 dark:text-gray-400">
        Sign up to get started with your dashboard.
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
            placeholder="Choose a username"
            icon="i-heroicons-user"
            size="lg"
            class="w-full"
            autocomplete="username"
          />
        </UFormField>

        <UFormField
          label="Email"
          required
        >
          <UInput
            v-model="email"
            type="email"
            placeholder="Enter your email"
            icon="i-heroicons-envelope"
            size="lg"
            class="w-full"
            autocomplete="email"
          />
        </UFormField>

        <UFormField
          label="Password"
          required
        >
          <UInput
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Create a password"
            icon="i-heroicons-lock-closed"
            size="lg"
            class="w-full"
            autocomplete="new-password"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormField>

        <UFormField
          label="Confirm password"
          required
        >
          <UInput
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Confirm your password"
            icon="i-heroicons-lock-closed"
            size="lg"
            class="w-full"
            autocomplete="new-password"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showConfirmPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'"
                @click="showConfirmPassword = !showConfirmPassword"
              />
            </template>
          </UInput>
        </UFormField>

        <UAlert
          v-if="error"
          color="error"
          variant="soft"
          icon="i-heroicons-exclamation-triangle"
          :title="error"
        />

        <UButton
          type="submit"
          block
          size="lg"
          color="primary"
          :loading="loading"
          icon="i-heroicons-user-plus"
        >
          {{ loading ? 'Creating account...' : 'Create account' }}
        </UButton>
      </form>

      <template #footer>
        <p class="text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?
          <NuxtLink
            to="/login"
            class="font-semibold text-primary hover:underline"
          >
            Sign in
          </NuxtLink>
        </p>
      </template>
    </UCard>

    <p class="text-center text-xs text-gray-400 dark:text-gray-500">
      OAuth2 Password Bearer · FastAPI backend
    </p>
  </div>
</template>
