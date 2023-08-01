
<template>
  <b-container fluid="lg-100" class="mt-5 mb-5">
    <b-row>
      <b-card class="shadow-md border-0 rounded-lg">
        <h4>USERS LIST</h4>
        <hr />
        <b-container class="search">
          <b-row>
            <b-form-input
              type="text"
              v-model="search"
              class="col-lg-6"
              placeholder="Cari Berdasarkan Nama"
            ></b-form-input>
          </b-row>
        </b-container>
        <div v-for="user in filteredUsers" class="single-user"></div>
        <br>
        <v-btn color="light-blue" :to="{ name: 'users-create' }">CREATE</v-btn>

        <v-col md="12"> </v-col>
        <b-table
          striped
          bordered
          hover
          :items="filteredUsers"
          :fields="fields"
          show-empty
        >
          <template v-slot:cell(actions)="row">
            <v-btn
              color="yellow"
              :to="{ name: 'users-update-id', params: { id: row.item.id } }"
              >UPDATE</v-btn
            >
            <v-btn color="red" @click.prevent="deleteUser(row)">DELETE</v-btn>
          </template>
        </b-table>
      </b-card>
    </b-row>
  </b-container>
</template>


<script>
    export default {
      // middleware: 'authenticated',
        name: 'Welcome',
        auth: false,
        layout: 'default',
  data() {
    return {
      //header table
      fields: ["name", "email", "role", "actions"],
      headers: [
        { text: " Name", value: "name", sortable: false },
        { text: " Email", value: "email", sortable: false },
        { text: " Role", value: "role", sortable: false },
      ],
      //lists data
      lists: [],
      search: "",
    };
  },

  mounted() {
    try {
      //fething ke Rest API
      this.$axios.get("/api/users").then((response) => {
        //assign response ke state "users"
        this.lists = response.data.data;
      });
    } catch (error) {
      console.log(error.response.data);
    }
  },

  methods: {
    async deleteUser(row) {
      //delete data user by ID
      await this.$axios.delete(`/api/users/${row.item.id}`).then(() => {
        //remove item array by index
        this.lists.splice(row.index, 1);
      });
    },
  },

  computed: {
    filteredUsers: function () {
      const filter = this.lists.filter((user) => {
        return user.name
          .charAt(0)
          .toLowerCase()
          .match(this.search.charAt(0).toLowerCase());
      });

      console.log(filter);
      return filter;
    },
  },
};
</script>