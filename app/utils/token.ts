export function setToken(token: string): void {
  const tokenCookie = useCookie<string | null>('auth_token', {
    maxAge: 60 * 60 * 24 * 7, // 7 днів
    sameSite: 'lax',
    path: '/'
  })

  tokenCookie.value = token
}

export function getToken(): string | null {
  const tokenCookie = useCookie<string | null>('auth_token')
  return tokenCookie.value
}

export function clearToken(): void {
  const tokenCookie = useCookie<string | null>('auth_token')
  tokenCookie.value = null
}
