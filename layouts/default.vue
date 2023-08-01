<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
    <div class="navbar-toggler" @click="showSidebarNavMenu"></div>
      <v-list>
        <v-list-item
          v-for="(item, i) in list_menu"
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

      <!-- <template v-slot:append>
          <div class="pa-8">
            <v-btn block color="light-blue" @click.prevent="logout">
              Logout
            </v-btn>
          </div>
        </template> -->
        
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
    
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      
      <!-- #1 -->
      <!-- <v-toolbar-items>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn color="" v-on="on">{{ user.name }}</v-btn>
          </template>
          <v-list>
            <v-list-item
        v-for="(item, index) in items"
        :key="index"
      >
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items> -->

      <!-- #2 -->
      <!-- <template v-slot:prepend>
          <v-list-item v-if="$auth.user"
            lines="two"
            prepend-avatar="mdi-account"
            :title="$auth.user.name"
            :subtitle="$auth.user.role"
          ></v-list-item>
        </template>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout"></v-list-item>
        </v-list> -->

        <!-- #3 -->
        <!-- <v-menu attach offset-y transition=”v-scale-transition”>
       <template v-slot:activator”>
         <v-btn
           small
           color=”primary”
           text
         >
         <v-icon small left color=”primary”>fa fa-bars</v-icon>
           Actions
         </v-btn>
       </template>
       <v-list dense>
         <v-list-item>
           <v-icon left small>fa fa-question-circle</v-icon>Help
         </v-list-item>
       </v-list>
       <v-divider class=”my-0″></v-divider>  
     </v-menu> -->

     <!-- #4 -->
        <!-- <v-btn> 
          <v-icon aria-hidden="false">
             mdi-account
          </v-icon>
        <span v-if="$auth.user">{{ $auth.user.name }}</span></v-btn> -->
       
        <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
     <v-toolbar-items>
      <v-btn
        v-bind="attrs"
        v-on="on"
        color=""
        class="px-8"
      >
      <v-icon aria-hidden="false">
             mdi-account-circle-outline
          </v-icon>
        <div class="ml-2" >{{ user.name }}</div>
      </v-btn>
     </v-toolbar-items>
         
    </template>
    
    <v-list >
      <v-list-item
        v-for="(item, index) in account"
        :key="index"
        @click="toProfile(item)"
          router
          exact
          class="px-5"
      >
     
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
    </v-menu>

    <!-- <v-btn color="light-blue" @click.prevent="logout">
      Logout
    </v-btn> -->

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
  // middleware: 'authenticated',
  // auth: false,
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
          icon: 'mdi-car-clock',
          title: 'Pinjam Mobil',
          to: '/pinjam'
        },
        {
          icon: 'mdi-car-side',
          title: 'Kendaraan',
          to: '/kendaraan'
        },
        {
          icon: 'mdi-account-group',
          title: 'Users List',
          to: '/users/list'
        },
        {
          icon: 'mdi-view-list-outline',
          title: 'Roles',
          to: '/roles'
        },
        {
          icon: 'mdi-history',
          title: 'History',
          to: '/history'
        },
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/dashboard'
        },
      ],
      user:"",
      account: [
      {
        icon: 'mdi-account',
          title: 'Profile',
          to: '/users/profile' 
      },
      {
          icon: 'mdi-logout',
          title: 'Logout',
          to: '/users/login'
        },
    ],
      allow: false,
      list_menu:[],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'List'
    }
  },

  mounted() {
    this.menu();
  },

   created () {
        this.getAuthenticatedUser()
      },

  methods: {
    hideSidebarNavMenu() {
        this.sidebarMenu = false;
    },

    showSidebarNavMenu() {
        this.sidebarMenu = true;
    },

    menu() {
      this.$axios.get("/api/menu").then((response) => {
        //assign response ke state "users"
        console.log(response)
        const menu = []
        response.data.data.forEach(element => {
          const name = element.name
          const filter = this.items.filter((items) => {
            return (
              items.title
                .toLowerCase()
                .match(name.toLowerCase())
            );
          });
          console.log(filter);
          element.icon = filter[0].icon;
          element.title = filter[0].title;
          element.to = filter[0].to;
          menu.push(element);
        
        console.log( window.location.pathname+" "+ element.to);
        if ( window.location.pathname == element.to) 
        {
          this.allow = true
        }
        });

        if (!this.allow ){
          this.$router.push({name:"error"})
        }
        else {

          this.list_menu = menu;
        console.log(menu)
        }
      });
    },

    toProfile(item) {
      console.log(item.title)
      if (item.title == 'Logout') {
        this.logout()
      } else {
        this.$router.push({name:'users-profile'})
      }
    },
    
      async getAuthenticatedUser () {
    console.log('loggedIn : ' + this.$auth.loggedIn)
    try {
      let response = await this.$axios.$get('/api/user')
      this.user = response
      console.log(response)
    } catch (errors) {
      console.log(errors)
    }
  },

  // async profile() {
  //   console.log('profile')
  //     await this.$axios.$post('/api/profile')
  //     this.$router.push({name:"users-profile-id"})
  // },

async logout () {
      console.log('logout')
      await this.$axios.$post('/api/logout')
      await this.$auth.logout();
      this.$router.push({name:"users-login"})
    }
}
}
</script>

