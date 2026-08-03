function getAuthCookie(options?: Record<string, unknown>) {
  try {
    return useCookie<string | null>('auth_token', options)
  } catch {
    return null
  }
}

export function setToken(token: string): void {
  const tokenCookie = getAuthCookie({
    maxAge: 60 * 60 * 24 * 7, // 7 днів
    sameSite: 'lax',
    path: '/'
  })

  if (tokenCookie) {
    tokenCookie.value = token
    return
  }

  if (import.meta.client && typeof document !== 'undefined') {
    document.cookie = `auth_token=${encodeURIComponent(token)}; max-age=604800; path=/; SameSite=Lax`
  }
}

export function getToken(): string | null {
  const tokenCookie = getAuthCookie()
  if (tokenCookie) {
    return tokenCookie.value
  }

  if (import.meta.client && typeof document !== 'undefined') {
    const match = document.cookie.match(/(?:^|; )auth_token=([^;]*)/)
    const cookieValue = match?.[1]
    return cookieValue ? decodeURIComponent(cookieValue) : null
  }

  return null
}

export function clearToken(): void {
  const tokenCookie = getAuthCookie()
  if (tokenCookie) {
    tokenCookie.value = null
    return
  }

  if (import.meta.client && typeof document !== 'undefined') {
    document.cookie = 'auth_token=; max-age=0; path=/; SameSite=Lax'
  }
}
