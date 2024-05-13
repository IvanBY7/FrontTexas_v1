export default {
  /*
   ** Headers of the page
   */

  head: {
    title: 'AgenteMonitor',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Monitor de sensores'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Nunito'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://unicons.iconscout.com/release/v3.0.6/css/line.css'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#ff9503' },
  /*
   ** Global CSS
   */
  css: ['./assets/scss/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~plugins/filters.js', mode: 'client' },
    { src: '~plugins/cleave.js', mode: 'client' },
    { src: '~plugins/vee-validate.js', mode: 'client' },
    { src: '~/plugins/after-each.js', mode: 'client' },
    { src: '~/plugins/particles.js', mode: 'client' },
    { src: '~/plugins/vue-float-action-button.js', mode: 'client' },
    { src: '~/plugins/pop-up-window.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // https://www.npmjs.com/package/nuxt-route-meta
    'nuxt-route-meta',
    // Doc: https://www.npmjs.com/package/nuxt-leaflet
    'nuxt-leaflet',
    // Doc: https://buefy.github.io/#/documentation
    ['nuxt-buefy', { materialDesignIcons: false }],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv'
  ],
  components: {
    dirs: [
      '~/components',
      '~/components/base',
      '~/components/forms',
      '~/components/cards'
    ]
  },
  devtools: true,
  ssr: false,
  telemetry: false,
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  router: {
    middleware: ['auth'],
    mode: 'hash'
  },
  pwa: {
    icon: {
      source: 'static/icon.png'
    },
    manifest: {
      name: 'AgenteMonitor',
      lang: 'es',
      theme_color: '#ff9503',
      useWebmanifestExtension: false
    }
  },
  dotenv: {
    filename: '.env.dev' // Especifica el archivo que debe cargar
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:8000/api/v1'
  },
  server: {
    host: process.env.HOST || 'localhost'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: ['vee-validate/dist/rules'],
    extend (config, ctx) {
      if (!config.externals) {
        config.externals = {}
      }

      // Remove moment.js from chart.js
      // https://www.chartjs.org/docs/latest/getting-started/integration.html#bundlers-webpack-rollup-etc
      config.externals.moment = 'moment'
    }
  }
}
