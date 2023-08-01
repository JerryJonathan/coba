<template>
  <b-container fluid="md" class="mt-15">
    <b-row>
      <b-col md="12">
        <b-card class="shadow-md border-0 rounded-lg">
          <b-form>
            <br />
            <b-card bg-variant="light">
              <h3><v-icon> mdi-alert </v-icon> Error 401 Unathorized</h3>
              <hr />
    
                <h4>Access is denied due to invalid credentials</h4>
                <p>You do not have permission to view this page using the credentials that you provided</p>

              <!-- <v-btn type="back" color="light-blue">OK</v-btn> -->
            </b-card>
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

  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style></style>
