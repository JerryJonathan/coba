<template>
    <b-container fluid="lg-100" class="mt-5 mb-5">
      <b-row>
        <b-card class="shadow-md border-0 rounded-lg">
          <h4>KENDARAAN</h4>
          <hr />

          <v-btn color="light-blue" :to="{ name: 'kendaraan-create' }">CREATE</v-btn>
  
          <v-col md="12"> </v-col>
          <b-table
          striped
          bordered
          hover
          :items="mobil"
          :fields="fields"
          show-empty
        > 
            <template v-slot:cell(actions)="row">
              <v-btn
                color="yellow"
                :to="{ name: 'kendaraan-update-id', params: { id: row.item.id } }"
                >UPDATE</v-btn
              >
              <v-btn color="red" @click.prevent="deleteKendaraan(row)">DELETE</v-btn>
            </template>
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
        fields: ["name", "actions"],
        headers: [
          { text: " Name", value: "name", sortable: false },
          // { text: " Email", value: "email", sortable: false },
          // { text: " Role", value: "role", sortable: false },
        ],
        //lists data
        mobil: [],
      };
    },
  
    mounted() {
      try {
        //fething ke Rest API
        this.$axios.get("/api/kendaraan").then((response) => {
          //assign response ke state "users"
          this.mobil = response.data.data;
        });
      } catch (error) {
        console.log(error.response.data);
      }
    },
  
    methods: {
      async deleteKendaraan(row) {
        //delete data user by ID
        await this.$axios.delete(`/api/kendaraan/${row.item.id}`).then(() => {
          //remove item array by index
          this.mobil.splice(row.index, 1);
        });
      },
    },
  };
  </script>