<template>
  <v-container>
    <v-layout style="margin-top: 200px;">
      <v-flex sm12 md6 offset-md3>
  <div class="Home">
    <v-row justify="center" align="center">
      <v-col>
        <h1 class="text-center">Selamat Datang di Sipector</h1>
      </v-col>
    </v-row>
  </div>

  <div>
    <row>
    <col>
    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
    <col>
    </row>
  </div>

  
    <div>
      <v-btn
       block color="light-blue" class="ml-0" @click.prevent="login">
            Login
      </v-btn>
    </div>
    <div style="margin-top: 15px">
      <v-btn
       block color="light-blue" class="ml-0" @click.prevent="register">
             Register
      </v-btn>
    </div>
 
    <!-- <v-container grid-list-sm>
    <v-layout row justify-space-around>
      <v-flex md3>
        <v-btn depressed @click="view(item.book)" color="primary">View</v-btn>
      </v-flex>
      <v-flex md3>
        <v-btn depressed @click="viewUpdate(item.book,item.id_book)" color="primary">Update</v-btn> 
      </v-flex>
    </v-layout>
  </v-container> -->

      </v-flex>
    </v-layout>
</v-container>
</template>



<script>
  export default {
    name: 'Home',
    auth: false,
    layout: 'empty',
    components: {
      // 
    },
  
    methods: {
    login () {
       this.$router.push({name: 'users-login'})
     },
     
     register () {
     this.$router.push({name: 'users-register'})
   }

    }
  
  };
</script>

