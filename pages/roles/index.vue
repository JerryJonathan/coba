<template>
  <b-container fluid="lg-100" class="mt-5 mb-5">
    <b-row>
      <b-card class="shadow-md border-0 rounded-lg">
        <h4>ROLES</h4>
        <hr />

        <v-btn color="light-blue" :to="{ name: 'roles-create' }">CREATE</v-btn>

        <v-col md="12"> </v-col>

        <b-table
          striped
          bordered
          hover
          :items="role"
          :fields="fields"
          show-empty
        >
          <template v-slot:cell(actions)="row">
            <v-btn
              color="yellow"
              :to="{ name: 'roles-update-id', params: { id: row.item.id } }"
              >UPDATE</v-btn
            >
            <v-btn color="red" @click.prevent="deleteRole(row)">DELETE</v-btn>
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
        
      ],
      //lists data
      role: [],
    };
  },

  mounted() {
    try {
      //fething ke Rest API
      this.$axios.get("/api/roles").then((response) => {
        //assign response ke state "users"
       console.log(response.data.data);
        this.role = response.data.data;
      });
    } catch (error) {
      console.log(error.response.data);
    }
  },

  methods: {
    async deleteRole(row) {
      //delete data user by ID
      await this.$axios.delete(`/api/roles/${row.item.id}`).then(() => {
        //remove item array by index
        this.role.splice(row.index, 1);
      });
    },
  },
};
</script>