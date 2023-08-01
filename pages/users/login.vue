<template>
  <!-- start -->
  <v-container fill-height>
    <v-layout style="margin-top: 240px">
      <v-flex sm12 md6 offset-md3>
        <v-card>
          <v-row justify="center" align="center">
            <v-col cols="12" sm="10">
              <v-alert
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
                <li>
                  {{ errors }}
                </li>
              </v-alert>
              <h2 class="text-center">Login</h2>
              <v-form ref="form" v-model="valid" lazy-validation>
                <div class="group">
                  <v-text-field
                    v-model="form.email"
                    :rules="emailRules"
                    label="Email"
                    color="green"
                    required
                  >
                    <v-icon slot="prepend" color="grey">
                      icon: mdi-email-outline
                    </v-icon>
                  </v-text-field>
                </div>
                <!-- End -->

                <!-- <div>
            <b-form @submit="login">
           <b-form-group label="Email">
                <b-form-input type="text" v-model="form.email" :class="{ 'is-invalid': errors.email }"
                  placeholder="masukkan email">
                </b-form-input>
                <div v-if="errors.email" class="mt-2">
                  <b-alert show variant="danger">{{ errors.email[0] }}</b-alert>
                </div>
              </b-form-group>
            </b-form> -->

                <!-- <p class="text-danger" v-text="errors.email"> -->
                <!-- </p> -->

                <!-- <div v-if="errors.email" class="mt-2">
                  <b-alert show variant="danger">{{ errors.email[0] }}</b-alert>
                </div> -->

                <!-- <div class="invalid-feedback" v-show="errors">
                    {{ errors[0] }}
                </div> -->

                <!-- <v-form-textarea>
    <div class="invalid-feedback" v-if="errors.email">{{
errors.email[0] }}</div>
</v-form-textarea>    -->

                <!-- <v-form-input type="text" v-model="form.email" :class="{'is-invalid': errors.email}">
              </v-form-input>
              <div v-if="errors.email" class="mt-2">
                <b-alert show variant="danger">{{ errors.email[0] }}</b-alert>
              </div> -->

                <!-- start -->
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
                <!-- end -->

                <!-- <p class="text-danger" v-text="errors.password">
          </p> -->
                <!-- <div v-if="errors.password" class="mt-2"> -->
                <!-- <b-alert show variant="danger">{{ errors.password[0] }}</b-alert> -->
                <!-- </div> -->

                <!-- start -->
                <div class="group text-center" style="margin-top: 20px">
                  <v-btn
                    block
                    color="light-blue"
                    class="ml-0"
                    @click.prevent="login"
                  >
                    Login
                  </v-btn>
                </div>

                <div>
                  <v-row>
                    <v-col> </v-col>
                  </v-row>
                </div>

                <div class="col-sm-0 text-center" style="margin-top: 20px">
                  Belum memiliki akun?
                  <router-link to="/users/register">Register</router-link>
                </div>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  middleware: 'guest',
  name: "Login",
  auth: false,
  layout: "empty",
  data() {
    return {
      valid: false,
      form: {
        email: "",
        password: "",
      },
      errors: "",
      emailRules: [
        (value) => {
          if (value) return true;
          return "Email is required.";
        },
        (value) => {
          if (/.+@.+\..+/.test(value)) return true;
          return "Email must be valid.";
        },
      ],
      passwordRules: [
        (value) => {
          if (value) return true;
          return "Password is required.";
        },
        (value) => {
          if (value?.length >= 8) return true;
          return "Password must be more than 8 characters";
        },
      ],
      isError: false,
      show1: false,
      role:""
    };
  },

  methods: {
    async login() {
      await this.$axios.$get("/sanctum/csrf-cookie");
      try {
        await this.$auth
          .loginWith("local", {
            data: this.form,
          })
          .then((response) => {
            if (!response.data.success) {
              this.errors = response.data.message;
              this.isError = true;
            } else {
              this.$router.push({ name: "dashboard" });
            }
            console.log(response.data)
          });
      } catch (err) {
        //  console.log(errors)
        this.errors = err.response.data;
        this.isError = true;
      }
    },
  },
};
</script>
