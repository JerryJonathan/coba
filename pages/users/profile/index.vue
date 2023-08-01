<template>
  <b-container fluid="md" class="mt-5 mb-5">
    <b-row>
      <b-col md="12">
        <b-card class="shadow-md border-0 rounded-lg">
          <h4>Profile Saya</h4>
          <hr />

          <b-row>
            <b-col>
              <b-form @submit="save">
                <br />
                <b-card bg-variant="light">
                  <h5><v-icon> mdi-account-edit </v-icon> Profile</h5>
                  <hr />
                  <b-form-group label="Nama">
                    <b-form-input
                      type="text"
                      v-model="user.name"
                      :class="{ 'is-invalid': validation.name }"
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
                    <b-form-input type="text" v-model="user.email" disabled>
                    </b-form-input>
                  </b-form-group>
                  <br />

                  <b-form-group label="Role">
                    <b-form-input type="text" v-model="user.role" disabled>
                    </b-form-input>
                  </b-form-group>
                  <br />
                  <v-btn type="submit" color="light-blue">SAVE</v-btn>
                </b-card>
              </b-form>
            </b-col>

            <b-col>
              <!-- <v-alert
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
    </v-alert> -->
              <b-form @submit="update">
                <br />
                <b-card bg-variant="light">
                  <h5><v-icon> mdi-lock-reset </v-icon> Ubah Password</h5>
                  <hr />
                  <b-form-group label="Password Lama">
                    <div class="input-group">
                    <b-form-input
                      v-model="user.password"
                      :type="showPassword1 ? 'text' : 'password'"
                      :class="{ 'is-invalid': validation.password }"
                      placeholder="masukkan password lama"
                    >
                    <!-- :rules="passwordRules" -->
                    
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

                  <b-form-group label="Password Baru">
                    <div class="input-group">
                      <b-form-input      
                        v-model="user.newPassword"
                        :type="showPassword2 ? 'text' : 'password'"
                        :class="{ 'is-invalid': validation.newPassword }"
                        placeholder="masukkan password baru"
                      >
                      <!-- :rules="newPasswordRules" -->
                     
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
                      <div v-if="validation.newPassword" class="mt-2">
                        <b-alert show variant="danger">{{
                          validation.newPassword[0]
                        }}</b-alert>
                      </div>
                  </b-form-group>
                  <br />

                  <b-form-group label="Konfirmasi Password">
                    <div class="input-group">
                    <b-form-input
                    :type="showPassword3 ? 'text' : 'password'"
                      v-model="user.password_confirmation"
                      :class="{'is-invalid': validation.password_confirmation}"
                      placeholder="konfirmasi password baru"
                    >
                    <!-- :rules="password_confirmationRules" -->
                  
                    </b-form-input>
                    <div class="input-group-append">
                        <div
                          :class="{ 'cursor-pointer': showPointer }"
                          @click="showPassword3 = !showPassword3"
                          @mouseout="showPointer = false"
                          @mouseover="showPointer = true"
                          class="input-group-text pa-2"
                        >
                          <b-icon-eye v-if="!showPassword3" />
                          <b-icon-eye-fill v-if="showPassword3" />
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
                  
                  <v-btn color="light-blue" type="submit">UPDATE</v-btn>
                </b-card>
              </b-form>
            </b-col>
          </b-row>
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
        role: "",
        password: "",
        newPassword: "",
        password_confirmation: "",
      },
      isError: false,
      showPassword1: false,
      showPassword2: false,
      showPassword3: false,
      showPointer: false,
      password: this.value,
      //state validation
      validation: [],
      // errors: '',
      // passwordRules: [
      //  value => {
      //     if (value) return true
      //     return 'Password is required.'
      //  },
      //  value => {
      //   if (value == this.user.password) return true
      //   return 'Current Password do not match'
      //  },
      //  ],
      // newPasswordRules: [
      //  value => {
      //     if (value) return true
      //     return 'New Password is required.'
      //  },
      //  value => {
      //   if (value?.length >= 8) return true
      //   return 'New Password must be more than 8 characters'
      //  },
      //  ],
      //  password_confirmationRules: [
      //  value => {
      //     if (value) return true
      //     return 'Confirm Password is required.'
      //  },
      //  value => {
      //   if (value == this.user.newPassword) return true
      //   return 'Confirm Password do not match new password'
      //  },
      //  ],
    };
  },

  mounted() {
    //get data user by ID
    this.getData();
    console.log("mounted");
  },

  components: {
    BIconEye,
    BIconEyeFill,
  },

  methods: {
    handleInput(e) {
      this.$emit("input", this.password);
    },

    async getData() {
      this.$axios.get(`/api/users/${this.$auth.user.id}`).then((response) => {
        console.log(response.data);
        (this.user.name = response.data.data.name),
          (this.user.email = response.data.data.email),
          (this.user.role = response.data.data.role);
      });
    },

    //     async getAuthenticatedUser () {
    //   console.log('loggedIn : ' + this.$auth.loggedIn)
    //   try {
    //     let response = await this.$axios.$get('/api/user')
    //     this.user = response
    //     this.getData()
    //     console.log(response)
    //   } catch (errors) {
    //     console.log(errors)
    //   }
    // },

    async save(e) {
      e.preventDefault();

      console.log(this.user);
      var formData = new FormData();
      formData.append("name", this.user.name);

      //send data ke Rest API untuk update
      await this.$axios
        .post(
          `/api/users/profile`,

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

    async update(e) {
      e.preventDefault();

      console.log(this.user);
      // var formData = new FormData();
      // formData.append("password", this.user.password);
      // formData.append("newPassword", this.user.newPassword);
      // formData.append("password_confirmation", this.user.password_confirmation);
      const payload = {
      "password" : this.user.password , 
      "newPassword" : this.user.newPassword,
      "password_confirmation" : this.user.password_confirmation}

      //send data ke Rest API untuk update
      await this.$axios
        .post(
          `/api/changePassword`,

          //data yang dikirim
          payload,
          { headers: { "Content-Type": "application/json" } }
          // formData,
          // {headers: {"Content-Type": "multipart/form-data"}}
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
  },
};
</script>

<style></style>
