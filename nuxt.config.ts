// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'], // update this as needed
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: 'app/components/ui'
  }
})