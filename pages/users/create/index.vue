<template>
    <b-container fluid="md" class="mt-5 mb-5">
      <b-row>
        <b-col md="12">
          <b-card class="shadow-md border-0 rounded-lg">
            <h4>Input Data User</h4>
            <hr />
            <b-form @submit.prevent="store">
              <b-form-group label="Nama">
                <b-form-input
                  type="text"
                  v-model="user.name"
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

              <!-- <b-form-group label="Password">
                <b-form-input
                  type="password"
                  v-model="user.password"
                  :class="{ 'is-invalid': validation.password }"
                  placeholder="masukkan password "
                >
                </b-form-input>
                <div v-if="validation.password" class="mt-2">
                  <b-alert show variant="danger">{{
                    validation.password[0]
                  }}</b-alert>
                </div>
              </b-form-group>
              <br /> -->

              <b-form-group label="Password">
                    <div class="input-group">
                      <b-form-input      
                        v-model="user.password"
                        :type="showPassword1 ? 'text' : 'password'"
                        :class="{ 'is-invalid': validation.password }"
                        placeholder="masukkan password"
                      >
                      </b-form-input>
                      <div class="input-group-append">
                        <div
                          :class="{ 'cursor-pointer': showPointer }"
                          @click="showPassword1 = !showPassword1"
                          @mouseout="showPointer = false"
                          @mouseover="showPointer = true"
                          class="input-group-text pa-2"
                        >
                          <b-icon-eye v-if="!showPassword1" />
                          <b-icon-eye-fill v-if="showPassword1" />
                        </div>
                      </div>
                    </div>
                      <div v-if="validation.password" class="mt-2">
                        <b-alert show variant="danger">{{
                          validation.password[0]
                        }}</b-alert>
                      </div>
                  </b-form-group>
                  <br />

              <!-- <b-form-group label="Confirm Password">
                <b-form-input
                  type="password"
                  v-model="user.password_confirmation"
                  :class="{ 'is-invalid': validation.password_confirmation }"
                  placeholder="masukkan konfirmasi password "
                >
                </b-form-input>
                <div v-if="validation.password_confirmation" class="mt-2">
                  <b-alert show variant="danger">{{
                    validation.password_confirmation[0]
                  }}</b-alert>
                </div>
              </b-form-group>
              <br /> -->

              <b-form-group label="Konfirmasi Password">
                    <div class="input-group">
                    <b-form-input
                    :type="showPassword2 ? 'text' : 'password'"
                      v-model="user.password_confirmation"
                      :class="{'is-invalid': validation.password_confirmation}"
                      placeholder="konfirmasi password"
                    >
                    </b-form-input>
                    <div class="input-group-append">
                        <div
                          :class="{ 'cursor-pointer': showPointer }"
                          @click="showPassword2 = !showPassword2"
                          @mouseout="showPointer = false"
                          @mouseover="showPointer = true"
                          class="input-group-text pa-2"
                        >
                          <b-icon-eye v-if="!showPassword2" />
                          <b-icon-eye-fill v-if="showPassword2" />
                        </div>
                      </div>
                    </div>
                    <div v-if="validation.password_confirmation" class="mt-2">
                      <b-alert show variant="danger">{{
                        validation.password_confirmation[0]
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
  
              <v-btn color="light-blue" type="submit">SUBMIT</v-btn>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </template>
  
  <script>
  import { BIconEye, BIconEyeFill } from "bootstrap-vue";
  export default {
    name: "Welcome",
    auth: false,
    layout: "empty",
    props: {
    placeholder: String,
    value: String,
  },
    data() {
      return {
        //state user
        user: {
          name: "",
          email: "",
          password: "",
          password_confirmation: "", 
          role: "",
        },
        isError: false,
        showPassword1: false,
        showPassword2: false,
        showPointer: false,
        password: this.value,
        //state validation
        validation: [],
      };
    },
  
    components: {
    BIconEye,
    BIconEyeFill,
  },

    methods: {
      handleInput(e) {
      this.$emit("input", this.password);
    },
      //method "store"
      async store(e) {
        e.preventDefault();
        //send data ke Rest API
        console.log(this.user);
  
        var formData = new FormData();
        formData.append("name", this.user.name);
        formData.append("email", this.user.email);
        formData.append("password", this.user.password);
        formData.append("password_confirmation", this.user.password_confirmation);
        formData.append("role", this.user.role);
  
          await this.$axios
          .post(
            "/api/users",
  
            //data yang dikirim ke server
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then((e) => {
            console.log(e);
  
            //redirect ke route "user"
            this.$router.push({
              name: "users-list",
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
  