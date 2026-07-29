const viteApiBaseUrl = (import.meta as ImportMeta & { env?: { VITE_API_BASE_URL?: string } }).env?.VITE_API_BASE_URL

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    }
  },
  apiBaseUrl: viteApiBaseUrl || 'https://fastapi-course-example.fly.dev'
})
