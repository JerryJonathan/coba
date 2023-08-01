<template>
    <b-container fluid="md" class="mt-5 mb-5">
      <b-row>
        <b-col md="12">
          <b-card class="shadow-md border-0 rounded-lg">
            <h4>Update Data Kendaraan</h4>
            <hr />
            <b-form @submit="update">
              <b-form-group label="Nama">
                <b-form-input
                  type="text"
                  v-model="mobil.name"
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
        //state mobil
        mobil: {
          name: "",
        
        },
        //state validation
        validation: [],
      };
    },
  
    mounted() {
      //get data mobil by ID
      console.log("mounted");
      this.$axios.get(`/api/kendaraan/${this.$route.params.id}`).then((response) => {
        console.log(response.data);
          (this.mobil.name = response.data.data.name),
          (this.mobil.email = response.data.data.email),
          (this.mobil.password = response.data.data.password);
          // (this.mobil.password_confirmation = response.data.data.password_confirmation),
          // (this.mobil.role = response.data.data.role);
      });
    },
  
    methods: {
      async update(e) {
        e.preventDefault();
  
        console.log(this.mobil);
  
        var formData = new FormData();
        formData.append("name", this.mobil.name);
        formData.append("email", this.mobil.email);
        formData.append("password", this.mobil.password);
        // formData.append("password_confirmation", this.mobil.password_confirmation);
        // formData.append("role", this.mobil.role);
  
        //send data ke Rest API untuk update
        await this.$axios
          .post(
            `/api/kendaraan/
            ${this.$route.params.id}`,
  
            //data yang dikirim
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then((e) => {
            console.log(e);
            // redirect ke route "mobil"
            this.$router.push({
              name: "kendaraan",
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
  