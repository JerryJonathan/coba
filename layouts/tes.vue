<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
          <div class="pa-8">
            <v-btn block color="light-blue" @click.prevent="logout">
              Logout
            </v-btn>
          </div>
        </template>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
     
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
   
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-table',
          title: 'Table',
          to: '/post'
        },
        {
          icon: 'mdi-application',
          title: 'Menu',
          to: '/menu'
        },
        {
          icon: 'mdi-application',
          title: 'Menu 2',
          to: '/menu2'
        },
        {
          icon: 'mdi-application',
          title: 'Menu 3',
          to: '/menu3'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Menu'
    }
  },

  methods: {
async logout () {
      console.log('logout')
      await this.$axios.$post('/api/logout')
      this.$router.push('/users/login')
    }
}
}
</script>

