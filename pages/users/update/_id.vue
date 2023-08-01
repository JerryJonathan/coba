<template>
    <b-container fluid="md" class="mt-5 mb-5">
      <b-row>
        <b-col md="12">
          <b-card class="shadow-md border-0 rounded-lg">
            <h4>Update Data User</h4>
            <hr />
            <b-form @submit="update">
              <b-form-group label="Nama">
                <b-form-input
                  type="text"
                  v-model="user.name"
                  :class="{ 'is-invalid': validation.name }"
                  placeholder="masukkan nama"
                >
                </b-form-input>
                <div v-if="validation.name" class="mt-2">
                  <b-alert show variant="danger">{{
                    validation.name[0]
                  }}</b-alert>
                </div>
              </b-form-group>
              <br />
              
              <b-form-group label="Email">
                <b-form-input
                  type="text"
                  v-model="user.email"
                  :class="{ 'is-invalid': validation.email }"
                  placeholder="masukkan email "
                >
                </b-form-input>
                <div v-if="validation.email" class="mt-2">
                  <b-alert show variant="danger">{{
                    validation.email[0]
                  }}</b-alert>
                </div>
              </b-form-group>
              <br />

              <b-form-group label="Roles">
                <input type="radio" id="user" value="user" v-model="user.role" :class="{ 'is-invalid': validation.role}" />
                <label for="user">User</label><br>
                <input type="radio" id="admin" value="admin" v-model="user.role" :class="{ 'is-invalid': validation.role}"  />
                <label for="admin">Admin</label><br>
              <div v-if="validation.role" class="mt-2">
                  <b-alert show variant="danger">{{
                    validation.role[0]
                  }}</b-alert>
                </div>
              </b-form-group>
              <br />
  
              <v-btn color="light-blue" type="submit">SAVE</v-btn>
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
        //state user
        user: {
          name: "",
          email: "",
          role: "",
        },
        //state validation
        validation: [],
      };
    },
  
    mounted() {
      //get data user by ID
      console.log("mounted");
      this.$axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
        console.log(response.data);
          (this.user.name = response.data.data.name),
          (this.user.email = response.data.data.email),
          (this.user.role = response.data.data.role);
      });
    },
  
    methods: {
      async update(e) {
        e.preventDefault();
  
        console.log(this.user);
  
        var formData = new FormData();
        formData.append("name", this.user.name);
        formData.append("email", this.user.email);
        formData.append("role", this.user.role);
  
        //send data ke Rest API untuk update
        await this.$axios
          .post(
            `/api/users/
            ${this.$route.params.id}`,
  
            //data yang dikirim
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then((e) => {
            console.log(e);
            // redirect ke route "user"
            this.$router.push({
              name: "users-list",
            });
          })
          .catch((error) => {
            //assign error validasi
            this.validation = error.response.data;
          });
      },
    }
  };
  </script>
  
  <style></style>
  