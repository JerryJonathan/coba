<template>
  <b-container fluid="md" class="mt-5 mb-5">
    <b-row>
      <b-col md="12">
        <b-card class="shadow-md border-0 rounded-lg">
          <h5>Input Form KTP</h5>
          <hr />
          <b-form @submit.prevent="store">
            <b-form-group label="NIK">
              <b-form-input
                type="text"
                v-model="post.NIK"
                :class="{ 'is-invalid': validation.NIK }"
                placeholder="masukkan NIK"
              >
              </b-form-input>
              <div v-if="validation.NIK" class="mt-2">
                <b-alert show variant="danger">{{ validation.NIK[0] }}</b-alert>
              </div>
            </b-form-group>
            <br />

            <b-form-group label="Foto KTP">
              <v-file-input
                accept="image/*"
                @change="Preview_image"
                v-model="post.image"
                placeholder="Pilih gambar"
              >
              </v-file-input>
              <v-img :src="url" height="150px" width="250px"></v-img>
              <div v-if="validation.image" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.image[0]
                }}</b-alert>
              </div>
            </b-form-group>
            <br />

            <b-form-group label="Nama">
              <b-form-input
                type="text"
                v-model="post.name"
                :class="{ 'is-invalid': validation.name }"
                placeholder="masukkan nama "
              >
              </b-form-input>
              <div v-if="validation.name" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.name[0]
                }}</b-alert>
              </div>
            </b-form-group>
            <br />

            <b-form-group label="Province">
              <v-select
                v-model="post.province"
                placeholder="Pilih Provinsi"
                :class="{ 'is-invalid': validation.province }"
                :items="listProvince"
                item-text="name"
                single-line
                return-object
                required
                @change="fetchRegencies"
              >
              </v-select>
              <div v-if="validation.province" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.province[0]
                }}</b-alert>
              </div>
             
            </b-form-group>
            <br />

            <b-form-group label="Kabupaten/Kota">
              <v-select
                v-model="post.regency"
                placeholder="Pilih Kabupaten/Kota"
                :class="{ 'is-invalid': validation.regency }"
                :items="listRegency"
                item-text="name"
                single-line
                return-object
                @change="fetchDistricts"
              >
              </v-select>
              <div v-if="validation.regency" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.regency[0]
                }}</b-alert>
              </div>
            </b-form-group>
            <br />

            <b-form-group label="Kecamatan">
              <v-select
                v-model="post.district"
                placeholder="Pilih Kecamatan"
                :class="{ 'is-invalid': validation.district }"
                :items="listDistrict"
                item-text="name"
                single-line
                return-object
                @change="fetchVillages"
              >
              </v-select>
              <div v-if="validation.district" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.district[0]
                }}</b-alert>
              </div>
            </b-form-group>
            <br />

            <b-form-group label="Kelurahan">
              <v-select
                v-model="post.village"
                placeholder="Pilih Kelurahan"
                :class="{ 'is-invalid': validation.village }"
                :items="listVillage"
                item-text="name"
                single-line
                return-object
                @change="zipCode"
              >
              </v-select>

              <div v-if="validation.village" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.village[0]
                }}</b-alert>
              </div>
            </b-form-group>
            <br />

            <b-form-group label="Kode Pos">
              <b-form-input
                v-model="post.postal"
                class="e-input "
                type="text"
                placeholder="Kode Pos"
                disabled
              />
              <div v-if="validation.postal" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.postal[0]
                }}</b-alert>
              </div>
            </b-form-group>
            <br />

            <!-- <b-form-group label="Agama">
              <v-select
                v-model="select"
                :items="items"
                item-text="agama"
                persistent-hint
                return-object
                single-line
                placeholder="Masukkan agama"
              ></v-select>
               
              <div v-if="validation.agama" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.agama[0]
                }}</b-alert>
              </div>
            </b-form-group> -->

            <v-btn color="light-blue" type="submit">SUBMIT</v-btn>
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
  data() {
    return {
      //state post
      post: {
        NIK: "",
        image: null,
        name: "",
        province: { id: "", name: "" },
        regency: { id: "", name: "" },
        district: { id: "", name: "" },
        village: { id: "", name: "" },
        postal: "",
        // agama: "",
      },
      url: null,
      // image: null,
      selectedProvince: { id: "", name: "" },
      listProvince: [],

      selectedRegency: { id: "", province_id: "", name: "" },
      listRegency: [],

      selectedDistrict: { id: "", regency_id: "", name: "" },
      listDistrict: [],

      selectedVillage: { id: "", district_id: "", name: "" },
      listVillage: [],

      listPostal: [],

      //state validation
      validation: [],

      // select: { agama: ""},
      // items: [
      //   {agama: 'Kristen'},
      //   {agama: 'Islam'},
      //   {agama: 'Buddha'},
      //   {agama: 'Hindu'},
      //   {agama: 'Katolik'},
      //   {agama: 'Konghucu'},
      // ],
    };
  },

  mounted() {
    try {
      //fething ke Rest API
      this.$axios.get("/api/getProvince").then((response) => {
        //assign response ke state "posts"
        console.log(response.data.data);
        this.listProvince = response.data.data;
      });
    } catch (error) {
      console.log(error.response.data);
    }
  },

  methods: {
    //method "store"
    async store(e) {
      e.preventDefault();
      //send data ke Rest API
      console.log(this.post);
      // this.post.agama = this.select.agama;

      var formData = new FormData();
      formData.append("NIK", this.post.NIK);
      formData.append("image", this.post.image);
      formData.append("name", this.post.name);
      formData.append("province", this.post.province.name);
      formData.append("regency", this.post.regency.name);
      formData.append("district", this.post.district.name);
      formData.append("village", this.post.village.name);
      formData.append("postal", this.post.postal);
      // formData.append("agama", this.post.agama);

        await this.$axios
        .post(
          "/api/posts",

          //data yang dikirim ke server
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((e) => {
          console.log(e);

          //redirect ke route "post"
          this.$router.push({
            name: "post",
          });
        })
        .catch((error) => {
          //assign validation
          this.validation = error.response.data;
        });  
    },
    Preview_image() {
      this.url = URL.createObjectURL(this.post.image);
    },

    async fetchRegencies() {
      try {
        console.log(this.post.province);
        var id = this.post.province.id;
        console.log(id);

        this.post.regency = { id: "", name: "" };
        this.post.district = { id: "", name: "" };
        this.post.village = { id: "", name: "" };
        this.post.postal = "";

        //fething ke Rest API
        this.$axios.get("/api/getRegency/" + id).then((response) => {
          //assign response ke state "posts"

          console.log(response.data.data);
          this.listRegency = response.data.data;
        });
      } catch (error) {
        console.log(error);
      }
      console.log(this.selectedRegency);
    },

    async fetchDistricts() {
      try {
        console.log(this.post.regency);
        var id = this.post.regency.id;
        console.log(id);

        this.post.district = { id: "", name: "" };
        this.post.village = { id: "", name: "" };
        this.post.postal = "";
        //fething ke Rest API
        this.$axios.get("/api/getDistrict/" + id).then((response) => {
          //assign response ke state "posts"
          console.log(response.data.data);
          this.listDistrict = response.data.data;
        });
      } catch (error) {
        console.log(error);
      }
      console.log(this.selectedDistrict);
    },

    async fetchVillages() {
      try {
        console.log(this.post.district);
        var id = this.post.district.id;
        console.log(id);

        this.post.village = { id: "", name: "" };
        this.post.postal = "";
        //fething ke Rest API
        this.$axios.get("/api/getVillage/" + id).then((response) => {
          //assign response ke state "posts"
          console.log(response.data.data);
          this.listVillage = response.data.data;
        });
      } catch (error) {
        console.log(error);
      }
      console.log(this.selectedVillage);
    },

    async zipCode() {
      try {
        this.$axios.get("/api/data").then((response) => {
          console.log(this.post.village);
          console.log(response.data.data);
          this.listPostal = response.data.data;
          const filter = this.listPostal.filter((zipcode) => {
            return (
              zipcode.village
                .toLowerCase()
                .match(this.post.village.name.toLowerCase()) &&
              zipcode.district
                .toLowerCase()
                .match(this.post.district.name.toLowerCase())
            );
          });
          console.log(filter);
          this.post.postal = filter[0].postal;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
