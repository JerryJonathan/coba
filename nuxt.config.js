import colors from 'vuetify/es5/util/colors'

import Vue from 'vue'

import Vuetify from 'vuetify'

import BootstrapVue from 'bootstrap-vue'


Vue.use(Vuetify);

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - coba',
    title: 'coba',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'bootstrap-vue/nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    
    credentials: true,

    baseURL: 'http://localhost:8000'
    // headers: {
    //   common: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json'
    //   }
    // },
    // proxy: true,
    // proxyHeaders: false,
    // credentials: false
  },

  auth: {
    redirect: {
      login: '/users/login',
      logout: '/',
      callback: '/users/login',
      home: '/dashboard'
    },
      strategies: {
        // 'laravelSanctum': {
        //    provider: 'laravel/sanctum',
        //    url: 'http://localhost:8000',
        //    endpoints: {
        //      login: { url: '/api/login', method: 'post' }
        //    },
        //    user: {
        //      property: false
        //    },
        //    tokenRequired: false,
        //    tokenType: false
        //  }

        local: {
          // provider: 'laravel/sanctum',
          url: 'http://localhost:8000',
          // scheme: 'refresh',
          token: {
            property: 'data.token',
            global: true,
            required: true,
            type: 'Bearer',
            maxAge: 0,
          },
          // refreshToken: {
          //   property: 'refresh_token',
          //   data: 'refresh_token',
          //   maxAge: 60 * 60 * 24 * 30
          // },
          user: {
            // property: 'data',
            property: false
            // autoFetch: true
          },
          endpoints: {
            login: { url: 'api/login', method: 'post', propertyName: 'token'},
            // refresh: { url: '/api/refreshtoken', method: 'post' },
            logout: { url: '/api/logout', method: 'post' },
            user: { url: '/api/user', method: 'get', propertyName: false }
          },
          // tokenRequired: false,
          // tokenType: false
        },
     },
     localStorage: false
   },
   
  router: {
    middleware: ['auth']
  },
  
   
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
        themes: {
          light: {
            primary: '#1abc9c',
            secondary: '#424242',
            accent: '#1abc9c',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
          },
          dark: {
            primary: '#424242',
            secondary: '#424242',
            accent: '#424242',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
          },
        }
      }
    },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
