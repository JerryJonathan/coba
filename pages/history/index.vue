<template>
    <b-container fluid="lg-100" class="mt-5 mb-5">
      <b-row>
        <b-card class="shadow-md border-0 rounded-lg">
          <h4>HISTORY</h4>
          <hr />
         
          <!-- <v-btn color="light-blue" :to="{ name: 'history-create' }">CREATE</v-btn> -->
          <v-col md="12"> </v-col>
          <b-table
            striped
            bordered
            hover
            :items="history"
            :fields="fields"
            show-empty
          >
            <!-- <template v-slot:cell(actions)="row">
              <v-btn
                color="yellow"
                :to="{ name: 'history-update-id', params: { id: row.item.id } }"
                >UPDATE</v-btn
              > -->
              <!-- <v-btn color="red" @click.prevent="deleteUser(row)">DELETE</v-btn> -->
            <!-- </template> -->
          </b-table>
        </b-card>
      </b-row>
    </b-container>
  </template>
  
  
  <script>
      export default {
          name: 'Welcome',
          auth: false,
          layout: 'default',
    data() {
      return {
        //header table
        fields: ["name", "waktu", "actions"],
        headers: [
          { text: " Name", value: "name", sortable: false },
          { text: " Waktu", value: "waktu", sortable: false },
        
        ],
        //lists data
        history: [],
        // search: "",
      };
    },
  
    mounted() {
      try {
        //fething ke Rest API
        this.$axios.get("/api/history").then((response) => {
          //assign response ke state "users"
          this.history = response.data.data;
        });
      } catch (error) {
        console.log(error.response.data);
      }
    },
  };
  </script>