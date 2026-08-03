import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { User } from '~/client'
import { authenticationV1LoginForAccessToken, usersV1ReadUsersMe } from '~/client/sdk.gen'
import { clearToken, getToken, setToken } from '~/utils/token'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(getToken())
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false)
  let initPromise: Promise<void> | null = null

  const isAuthenticated = computed(() => !!token.value)

  async function login(username: string, password: string): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await authenticationV1LoginForAccessToken({
        body: { username, password }
      })
      if (err || !data) {
        error.value = 'Invalid username or password.'
        return false
      }
      token.value = data.access_token
      setToken(data.access_token)
      await fetchUser()
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Login failed.'
      return false
    } finally {
      loading.value = false
    }
  }

  async function fetchUser(options?: { logoutOnError?: boolean }): Promise<void> {
    if (!token.value) return
    loading.value = true
    try {
      const { data, error: err } = await usersV1ReadUsersMe()
      if (err || !data) {
        if (options?.logoutOnError !== false) {
          logout()
        } else {
          user.value = null
        }
        return
      }
      user.value = data
    } catch {
      if (options?.logoutOnError !== false) {
        logout()
      } else {
        user.value = null
      }
    } finally {
      loading.value = false
    }
  }

  function logout(): void {
    token.value = null
    user.value = null
    clearToken()
  }

  async function init(): Promise<void> {
    if (initPromise) {
      await initPromise
      return
    }

    const persistedToken = getToken()

    if (initialized.value && (!persistedToken || !!user.value)) {
      return
    }

    initPromise = (async () => {
      if (persistedToken) {
        token.value = persistedToken
      }

      initialized.value = true

      if (token.value) {
        void fetchUser({ logoutOnError: false })
      }
    })()

    try {
      await initPromise
    } finally {
      initPromise = null
    }
  }

  return {
    token,
    user,
    loading,
    error,
    initialized,
    isAuthenticated,
    login,
    logout,
    fetchUser,
    init
  }
})
