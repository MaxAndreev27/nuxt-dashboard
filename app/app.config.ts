export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    }
  },
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://fastapi-course-example.fly.dev'
})
