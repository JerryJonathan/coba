<template>
  <v-container fill-height>
    <v-layout style="margin-top: 180px;">
        <v-flex sm12 md6 offset-md3>
    <v-card>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="10">
        <v-alert
        v-if = "typeof(errors) === 'string'"
      v-model="isError"
      theme="light"
      type="error"
      variant="outlined"
      prominent
      closable
      close-label="Close Alert"
      class="mt-5"
      align-self-left
    >
    <li >
      {{ errors }}
    </li>
    </v-alert>
    <v-alert
        v-else
      v-model="isError"
      theme="light"
      type="error"
      variant="outlined"
      prominent
      closable
      close-label="Close Alert"
      class="mt-5"
      align-self-left
    >
      <li v-for="(item, index) in errors" :key="index">
      {{ item[0] }}
    </li>
    </v-alert>
    
        <h2 class="text-center">Register</h2>
        <v-form ref="form" v-model="valid" lazy-validation>
          
          <div class="group">
          <v-text-field
            v-model="form.name"
            :rules="nameRules"
            label="Name"
           color="green"
           required
         >
           <v-icon slot="prepend" color="grey">
             icon: mdi-account-circle
           </v-icon>
          </v-text-field>
        </div>

        <div class="group">
         <v-text-field
           v-model="form.email"
           :rules="emailRules"
           label="Email"
           color="green"
           required
         >
           <v-icon slot="prepend" color="grey">
             icon: mdi-email
           </v-icon>
         </v-text-field>
        </div>

        <div class="group">
         <v-text-field
           v-model="form.password"
           :rules="passwordRules"
           :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
           label="Password"
           :type="show1 ? 'text' : 'password'"
           color="green"
           required
           @click:append="show1 = !show1"
         >
           <v-icon slot="prepend" color="grey">
             icon: mdi-lock
           </v-icon>
         </v-text-field>
        </div>

        <div class="group">
         <v-text-field
           v-model="form.password_confirmation"
           :rules="confirmPasswordRules"
           :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
           label="Confirm password"
           :type="show2 ? 'text' : 'password'"
           color="green"
           required
           @click:append="show2 = !show2"
         >
           <v-icon slot="prepend" color="grey">
             icon: mdi-lock
           </v-icon>
         </v-text-field>
        </div>

        <div class="group text-center" style="margin-top: 20px;">
         <v-btn block color="light-blue" class="ml-0" @click.prevent="register">
           Register
         </v-btn>
        </div>
        
  
         <div class="col-sm-0 text-center" style="margin-top: 20px">Sudah memiliki akun?
            <router-link to="/users/login">Login</router-link>
           </div>

           <!-- <div class="row">
           <div class="col-md-6">
            <div class="group">
              <v-btn class="btn btn-primary">Login</v-btn>
            </div>
           </div>
           </div>
           <div class="col-md-6 text-right">
            <router-link to="/users/login">Sudah memiliki akun?</router-link>
           </div> -->

        </v-form>      
     </v-col>
   </v-row>
  </v-card>
  </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
export default {
middleware: 'guest',
 name: 'Register',
 auth: false,
 layout:"empty",
 data () {
   return {
    valid: false,
     form: {
       name: '',
       email: '',
       password: '',
       password_confirmation: '',
       role: 'user'
     },
     errors: '',
     nameRules: [
       value => {
          if (value) return true
          return 'Name is required.'
       },
       value => {
          if (value?.length <=255) return true
          return 'Name must be valid.'
        },
       ],
     emailRules: [
       value => {
          if (value) return true
          return 'Email is required.'
       },
       value => {
          if (/.+@.+\..+/.test(value)) return true
          return 'Email must be valid.'
        },
       ],
       passwordRules: [
       value => {
          if (value) return true
          return 'Password is required.'
       },
       value => {
        if (value?.length >= 8) return true
        return 'Password must be more than 8 characters'
       },
       ],
       confirmPasswordRules: [
       value => {
          if (value) return true
          return 'Confirm Password is required.'
       },
       value => {
        if (value == this.form.password) return true
        return 'Password do not match'
       },
       ],
       isError: false,
       show1: false,
       show2: false,
   }
 },

 methods: {
    async register () {
    //  this.$axios
    //    .$post('/api/register', this.form)
    //    .then(function (response) {
    //     //  console.log(response)
    //      this.$router.push('/users/login')
    //    })
    //    .catch(function (errors) {
    //      console.log(errors)
    //    })

       try {
       
         await this.$axios.$post('/api/register', this.form)
        
        .then((response) => {
           console.log(response)
          if(!response.success){
            this.errors = response.message
        this.isError = true
          } 
        else {
            this.$router.push({name: 'users-login'})
          }
       })
       } catch (err) {
        this.errors = err.response.data
        this.isError = true
       }
   }
 }
};



</script>