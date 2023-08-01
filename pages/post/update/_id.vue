<template>
  <b-container fluid="md" class="mt-5 mb-5">
    <b-row>
      <b-col md="12">
        <b-card class="shadow-md border-0 rounded-lg">
          <h5>Update Form KTP</h5>
          <hr />
          <b-form @submit="update">
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
              ></v-file-input>
              <div class="p-2">
                <v-img
                  :src="url ? url : post.image"
                  height="150px"
                  width="250px"
                ></v-img>
              </div>
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
                placeholder="masukkan nama"
              >
              </b-form-input>
              <div v-if="validation.name" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.name[0]
                }}</b-alert>
              </div>
            </b-form-group>
            <br />

            <b-form-group label="Provinsi">
              <v-select
                v-model="post.province"
                placeholder="Pilih Provinsi"
                :class="{ 'is-invalid': validation.province }"
                :items="listProvince"
                item-text="name"
                single-line
                return-object
                @change="fetchRegencies(post.province.name)"
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
                @change="fetchDistricts(post.regency.name)"
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
                @change="fetchVillages(post.district.name)"
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
                @change="zipCode(post.village.name)"
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
                class="e-input"
                type="text"
                placeholder="Kode Pos"
                disabled
              />
            </b-form-group>
            <div v-if="validation.postal" class="mt-2">
              <b-alert show variant="danger">{{
                validation.postal[0]
              }}</b-alert>
            </div>
            <br />

            <v-btn color="light-blue" type="submit">SAVE</v-btn>
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
        province: "",
        regency: "",
        district: "",
        village: "",
        postal: "",
      },
      temporary: {
        province: "",
        regency: "",
        district: "",
        village: "",
        postal: "",
      },
      url: null,

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
      cekLoad: true,
    };
  },

  mounted() {
    //get data post by ID
    console.log("mounted");
    this.$axios.get(`/api/posts/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      (this.post.NIK = response.data.data.NIK),
        (this.post.image =  response.data.data.image),
        (this.post.name = response.data.data.name),
        (this.post.province = response.data.data.province),
        (this.post.regency = response.data.data.regency),
        (this.post.district = response.data.data.district),
        (this.post.village = response.data.data.village),
        (this.post.postal = response.data.data.postal);
      this.temporary = {
        province: response.data.data.province,
        regency: response.data.data.regency,
        district: response.data.data.district,
        village: response.data.data.village,
        postal: response.data.data.postal,
      };
    });

    // melakukan filter untuk mendapatkan kabupaten berdasarkan provinsi
    try {
      //fething ke Rest API
      this.$axios.get("/api/getProvince").then(async (response) => {
        //assign response ke state
        this.listProvince = response.data.data;
        console.log(this.listProvince);
        await this.fetchRegencies(this.post.province);
      });
    } catch (error) {
      console.log(error.response.data);
    }
  },

  methods: {
    async update(e) {
      e.preventDefault();

      console.log(this.post);

      var formData = new FormData();
      formData.append("NIK", this.post.NIK);
      formData.append("image", this.post.image);
      formData.append("name", this.post.name);
      if (typeof this.post.province == "object") {
        formData.append("province", this.post.province.name);
      } else {
        formData.append("province", this.post.province);
      }
      if (typeof this.post.regency == "object") {
        formData.append("regency", this.post.regency.name);
      } else if (this.temporary.regency){
        formData.append("regency", this.post.regency);
      }
      if (typeof this.post.district == "object") {
        formData.append("district", this.post.district.name);
      } else {
        formData.append("district", this.post.district);
      }
      if (typeof this.post.village == "object") {
        formData.append("village", this.post.village.name);
      } else {
        formData.append("village", this.post.village);
      }
      formData.append("postal", this.post.postal);

      //send data ke Rest API untuk update
      await this.$axios
        .post(
          `/api/posts/
          ${this.$route.params.id}`,

          //data yang dikirim
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((e) => {
          console.log(e);
          // redirect ke route "post"
          this.$router.push({
            name: "post",
          });
        })
        .catch((error) => {
          //assign error validasi
          this.validation = error.response.data;
        });
    },
    Preview_image() {
      this.url = URL.createObjectURL(this.post.image);
    },

    async fetchRegencies(name) {
      console.log(name);
      try {
        this.temporary = {
          province: name,
          regency: "",
          district: "",
          village: "",
          postal: "",
        };
        this.post.postal = "";
        var filterProvince = this.listProvince.filter(
          (provinsi) => provinsi.name == name
        );
        this.listDistrict = [];
        this.listVillage = [];
        var id = 0;
        if (filterProvince.length > 0) {
          id = filterProvince[0].id;
        }
        console.log(id);
        //fething ke Rest API
        this.$axios.get("/api/getRegency/" + id).then((response) => {
          //assign response ke state "posts"
          console.log(response.data.data);
          this.listRegency = response.data.data;

          console.log(this.listRegency);
          var filterRegency = this.listRegency.filter(
            (kabupaten) => kabupaten.name == this.post.regency
          );
          if (this.cekLoad) {
            this.fetchDistricts(this.post.regency);
          } else {
            (this.post.district = ""), (this.post.village = "");
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    async fetchDistricts(name) {
      console.log(name);
      console.log("fetchDistricts");
      this.temporary.regency = name;
      this.temporary.district = "";
      this.temporary.village = "";
      this.temporary.postal = "";
      this.post.postal = "";
      this.listVillage = [];

      try {
        var filterRegency = this.listRegency.filter(
          (kabupaten) => kabupaten.name == name
        );
        var id = 0;
        if (filterRegency.length > 0) {
          id = filterRegency[0].id;
        }
        console.log(id);
        //fething ke Rest API
        this.$axios.get("/api/getDistrict/" + id).then((response) => {
          //assign response ke state "posts"
          console.log(response.data.data);
          this.listDistrict = response.data.data;

          console.log(this.listDistrict);
          var filterDistrict = this.listDistrict.filter(
            (kecamatan) => kecamatan.name == this.post.district
          );
          if (this.cekLoad) {
            this.fetchVillages(this.post.district);
          } else {
            this.post.village = "";
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchVillages(name) {
      console.log(name);
      console.log("fetchVillages" + this.post.postal);
      this.temporary.district = name;
      this.temporary.village = "";
      this.temporary.postal = "";
      this.post.postal = "";
      try {
        var filterDistrict = this.listDistrict.filter(
          (kecamatan) => kecamatan.name == name
        );

        var id = 0;
        if (filterDistrict.length > 0) {
          id = filterDistrict[0].id;
        }
        console.log(id);

        //fething ke Rest API
        this.$axios.get("/api/getVillage/" + id).then((response) => {
          //assign response ke state "posts"
          console.log(response.data.data);
          this.listVillage = response.data.data;

          console.log(this.listVillage);
          var filterVillage = this.listVillage.filter(
            (kelurahan) => kelurahan.name == this.post.village
          );

          if (this.cekLoad) {
            this.zipCode(this.post.village.name);
            this.cekLoad = false;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    async zipCode() {
      console.log("zipCode" + this.post.postal);

      this.temporary.village = this.post.village;
      this.temporary.postal = "";
      this.post.postal = "";
      try {
        let village = "";
        let district = "";
        if (typeof this.temporary.village == "object") {
          village = this.temporary.village.name;
        } else {
          village = this.temporary.village;
        }
        if (typeof this.temporary.district == "object") {
          district = this.temporary.district.name;
        } else {
          district = this.temporary.district;
        }
        this.$axios.get("/api/data").then((response) => {
          console.log(this.temporary.village);
          console.log(this.temporary.district);
          this.listPostal = response.data.data;
          const filter = this.listPostal.filter((zipcode) => {
            return (
              zipcode.village.toLowerCase().match(village.toLowerCase()) &&
              zipcode.district.toLowerCase().match(district.toLowerCase())
            );
          });
          console.log(filter);
          if (filter.length > 0) {
            this.post.postal = filter[0].postal;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
