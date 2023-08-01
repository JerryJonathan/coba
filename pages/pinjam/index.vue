<template>
    <b-container fluid="lg-100" class="mt-5 mb-5">
      <b-row>
        <b-card class="shadow-md border-0 rounded-lg">
          <h4>PINJAM MOBIL</h4>
          <hr />
         
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
              <v-btn color="light-blue" :to="{ name: 'pinjam-create' }">PINJAM</v-btn>
              <v-btn
                color="yellow"
                :to="{ name: 'pinjam-update-id', params: { id: row.item.id } }"
                >UPDATE</v-btn
              >
              <v-btn color="red" @click.prevent="cancelPinjaman(row)">CANCEL</v-btn>
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
        fields: ["name", "waktu", "actions"],
        headers: [
          { text: " Name", value: "name", sortable: false },
          { text: " Waktu", value: "waktu", sortable: false },
        
        ],
        //lists data
        mobil: [],
        // search: "",
      };
    },
  
    mounted() {
      try {
        //fething ke Rest API
        this.$axios.get("/api/pinjam").then((response) => {
          //assign response ke state "users"
          this.mobil = response.data.data;
        });
      } catch (error) {
        console.log(error.response.data);
      }
    },
  
    methods: {
      async cancelPinjaman(row) {

      },
    },
  };
  </script>