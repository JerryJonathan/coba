<template>
  <b-container fluid="lg-100" class="mt-5 mb-5">
    <b-row>
        <b-card class="shadow-md border-0 rounded-lg">
          <!-- <b-form> -->
            <!-- <h1>Dashboard</h1> -->
            <div class="mb-8">
              <h2>
                Hello,
                <span v-if="$auth.loggedIn"> {{ $auth.user.name }}</span>
              </h2>
              <h3>Selamat Datang di Website</h3>
            </div>
          <!-- </b-form> -->
        </b-card>
    </b-row>
  </b-container>
</template>

<script>
export default {
  // middleware: 'authenticated',
  name: "Welcome",
  // auth: false,
  layout: "default",

  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },

  async getAuthenticatedUser() {
    console.log("loggedIn : " + this.$auth.loggedIn);
    try {
      let response = await this.$axios.$get("/api/user");
      this.user = response;
      console.log(response.name);
    } catch (errors) {
      console.log(errors);
    }
  },
};
</script>

<style></style>
