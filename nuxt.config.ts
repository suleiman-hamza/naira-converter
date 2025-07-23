import tailwindcss from '@tailwindcss/vite'
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ['shadcn-nuxt', 'nuxt-charts'],
  // tailwindcss: {
  //   cssPath: '~/assets/css/main.css',
  // },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "app/components/ui"
     */
    componentDir: 'app/components/ui'
  }
})