import type { Config } from 'tailwindcss'

export default {
  content: [
    // all directories and extensions will correspond to your Nuxt config
    "app/components/**/*.{vue,js,jsx,mjs,ts,tsx}",
    "app/layouts/**/*.{vue,js,jsx,mjs,ts,tsx}",
    "app/pages/**/*.{vue,js,jsx,mjs,ts,tsx}",
    "app/plugins/**/*.{js,ts,mjs}",
    "app/composables/**/*.{js,ts,mjs}",
    "app/utils/**/*.{js,ts,mjs}",
    "app/{A,a}pp.{vue,js,jsx,mjs,ts,tsx}",
    "app/{E,e}rror.{vue,js,jsx,mjs,ts,tsx}",
    "app/app.config.{js,ts,mjs}",
    "app/spa-loading-template.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
