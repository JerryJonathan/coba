<template>
    <b-container fluid="md" class="mt-5 mb-5">
      <b-row>
        <b-col md="12">
          <b-card class="shadow-md border-0 rounded-lg">
            <h4> Create New Role</h4>
            <hr />
            <b-form @submit.prevent="store">
              <b-form-group label="Nama Role">
                <b-form-input
                  type="text"
                  v-model="role.name"
                  :class="{ 'is-invalid': validation.name }"
                  placeholder="masukkan role "
                >
                </b-form-input>
                <div v-if="validation.name" class="mt-2">
                  <b-alert show variant="danger">{{
                    validation.name[0]
                  }}</b-alert>
                </div>
              </b-form-group>
              <br />

              <b-form-group label="Permission">
        <v-container fluid >
          <div v-for="permission in listPermission" class="form-check">
             <v-checkbox 
                v-model="role.permission" 
                :value="permission.id" 
                :label="permission.name"
                :class="{ 'is-invalid': validation.permission}"
                color="blue"
                >
                </v-checkbox>     
          </div>
          <div v-if="validation.permission" class="mt-2">
                  <b-alert show variant="danger">{{
                    validation.permission[0]
                  }}</b-alert>
                </div>
              </v-container>     
              </b-form-group>  
  
              <v-btn color="light-blue" type="submit">SUBMIT</v-btn>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </template>
  
  <script>
  export default {
    name: "Welcome",
    auth: false,
    layout: "empty",
    data() {
      return {
        //state role
        role: {
          name: "",
          permission: [],
        },
        listPermission: [],
        //state validation
        validation: [],
      };
    },
  
    mounted() {
    try {
      //fetching ke Rest API
      this.$axios.get("/api/getPermission").then((response) => {
        //assign response ke state "posts"
        console.log(response.data.data);
        this.listPermission = response.data.data;
      });
    } catch (error) {
      console.log(error.response.data);
    }
  },

    methods: {
      //method "store"
      async store(e) {
        e.preventDefault();
        //send data ke Rest API
        console.log(this.role);
  
          await this.$axios
          .post(
            "/api/roles",
          this.role
            //data yang dikirim ke server
            ,
            // { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then((e) => {
            console.log(e);
  
            //redirect ke route "role"
            this.$router.push({
              name: "roles",
            });
          })
          .catch((error) => {
            //assign validation
            this.validation = error.response.data;
          });  
      },
  
    },
  };
  </script>
  
  <style></style>
  