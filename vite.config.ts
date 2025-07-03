import path from 'path'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      __GOOGLE_PRIVATE_KEY__: JSON.stringify(env.GOOGLE_PRIVATE_KEY),
      __GOOGLE_CLIENT_EMAIL__: JSON.stringify(env.GOOGLE_CLIENT_EMAIL),
      __GOOGLE_CLIENT_ID__: JSON.stringify(env.GOOGLE_CLIENT_ID),
      __GOOGLE_API_KEY__: JSON.stringify(env.GOOGLE_API_KEY),
    },
    preview: {
      port: 18777,
      allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0', 'thief.freevue.dev'],
    },
    server: {
      port: 18777,
      allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0', 'thief.freevue.dev'],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
