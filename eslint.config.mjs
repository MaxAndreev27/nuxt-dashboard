// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    ignores: ['app/client/**'],
    rules: {
      semi: ['error', 'never']
    }
  }
  // Your custom configs here
)
