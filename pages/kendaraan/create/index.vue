<template>
    <b-container fluid="md" class="mt-5 mb-5">
      <b-row>
        <b-col md="12">
          <b-card class="shadow-md border-0 rounded-lg">
            <h4>Input Data Kendaraan</h4>
            <hr />
            <b-form @submit.prevent="store">
              <b-form-group label="Nama Kendaraan">
                <b-form-input
                  type="text"
                  v-model="mobil.name"
                  :class="{ 'is-invalid': validation.name }"
                  placeholder="masukkan nama "
                >
                </b-form-input>
                <div v-if="validation.name" class="mt-2">
                  <b-alert show variant="danger">{{
                    validation.name[0]
                  }}</b-alert>
                </div>
              </b-form-group>
              <br />
  
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
        //state mobil
        mobil: {
          name: "",
         
        },
        //state validation
        validation: [],
      };
    },
  
    methods: {
      //method "store"
      async store(e) {
        e.preventDefault();
        //send data ke Rest API
        console.log(this.mobil);
  
        var formData = new FormData();
        formData.append("name", this.mobil.name);
        formData.append("email", this.mobil.email);
        // formData.append("password", this.mobil.password);
        // formData.append("password_confirmation", this.mobil.password_confirmation);
        // formData.append("role", this.mobil.role);
  
          await this.$axios
          .post(
            "/api/kendaraan",
  
            //data yang dikirim ke server
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then((e) => {
            console.log(e);
  
            //redirect ke route "mobil"
            this.$router.push({
              name: "kendaraan",
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
  