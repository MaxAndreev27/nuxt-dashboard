import { client } from '~/client/client.gen'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  client.setConfig({
    baseUrl: config.public.apiBaseUrl
  })

  client.interceptors.request.use((request) => {
    const token = useCookie('auth_token').value
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`)
    }
    return request
  })
})
