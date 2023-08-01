<template>
  <b-container fluid="lg-100" class="mt-5 mb-5">
    <b-row>
      <b-card class="shadow-md border-0 rounded-lg">
        <!-- <div class="mb-8">
        <h2>
         Hello,
         <span v-if="$auth.loggedIn"> {{ $auth.user.name }}</span>
       </h2>
      </div> -->
        <h5>DATA TABLE</h5>
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
        <div v-for="post in filteredPosts" class="single-post"></div>

        <br>
        <v-btn color="light-blue" :to="{ name: 'post-create' }">CREATE</v-btn>

        <v-col md="12"> </v-col>
        <b-table
          striped
          bordered
          hover
          :items="filteredPosts"
          :fields="fields"
          show-empty
        >
          <template v-slot:cell(actions)="row">
            <v-btn
              color="yellow"
              :to="{ name: 'post-update-id', params: { id: row.item.id } }"
              >UPDATE</v-btn
            >
            <v-btn color="red" @click.prevent="deletePost(row)">DELETE</v-btn>
          </template>
          <template v-slot:cell(image)="row">
            <div class="p-2">
              <v-img
                :src="row.item.image"
                height="100px"
                width="150px"
              ></v-img>
            </div>
          </template>
        </b-table>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Welcome",
  auth: false,
  layout: "default",
  data() {
    return {
      //header table
      fields: ["NIK", "name", "image", "province", "actions"],
      headers: [
        { text: "NIK", value: "NIK", sortable: false },
        { text: " Image", value: "image", sortable: false },
        { text: " Name", value: "name", sortable: false },
        { text: " Province", value: "province", sortable: false },
        // { text: " Agama", value: "agama", sortable: false },
      ],
      //posts data
      posts: [],
      search: "",
    };
  },

  mounted() {
    try {
      //fething ke Rest API
      this.$axios.get("/api/posts").then((response) => {
        //assign response ke state "posts"
        this.posts = response.data.data;
      });
    } catch (error) {
      console.log(error.response.data);
    }
  },

  methods: {
    async deletePost(row) {
      //delete data post by ID
      await this.$axios.delete(`/api/posts/${row.item.id}`).then(() => {
        //remove item array by index
        this.posts.splice(row.index, 1);
      });
    },

  //   async getAuthenticatedUser () {
  //   console.log('loggedIn : ' + this.$auth.loggedIn)
  //   try {
  //     let response = await this.$axios.$get('/api/user')
  //     this.user = response
  //     console.log(response.name)
  //   } catch (errors) {
  //     console.log(errors)
  //   }
  // }

    // async logout () {
    //     console.log('logout')
    //     await this.$axios.$post('/api/logout')
    //     this.$router.push('/users/login')
    //   }
  },

  computed: {
    filteredPosts: function () {
      const filter = this.posts.filter((post) => {
        return post.name
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
