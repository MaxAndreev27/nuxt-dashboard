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

  async function fetchUser(): Promise<void> {
    if (!token.value) return
    loading.value = true
    try {
      const { data, error: err } = await usersV1ReadUsersMe()
      if (err || !data) {
        logout()
        return
      }
      user.value = data
    } catch {
      logout()
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
    const persistedToken = getToken()

    if (initialized.value && (!persistedToken || !!user.value)) {
      return
    }

    if (persistedToken) {
      token.value = persistedToken
      await fetchUser()
    } else if (token.value) {
      await fetchUser()
    }

    initialized.value = true
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
