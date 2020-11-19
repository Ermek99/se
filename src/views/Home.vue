<template>
  <div class="home">
    Home Your location data is {{ userLocation.coords.latitude }},
    {{ userLocation.coords.longitude }}
    <v-card color="red lighten-2" dark>
      <v-card-title class="headline red lighten-3">
        Search for Public APIs
      </v-card-title>
      <v-card-text>
        Explore hundreds of free API's ready for consumption! For more
        information visit
        <a
          class="grey--text text--lighten-3"
          href="https://github.com/toddmotto/public-apis"
          target="_blank"
          >the Github repository</a
        >.
      </v-card-text>
      <v-card-text>
        <v-autocomplete
          v-model="model"
          :items="entries"
          :loading="isLoading"
          :search-input.sync="search"
          color="white"
          hide-no-data
          hide-selected
          item-text="address.name"
          item-value="adress.country"
          label="City"
          placeholder="Enter your city"
          prepend-icon="mdi-map"
          return-object
        ></v-autocomplete>
      </v-card-text>
      <v-divider></v-divider>
      <!-- <v-expand-transition>
        <v-list v-if="model" class="red lighten-3">
          <v-list-item v-for="(field, i) in fields" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="field.value"></v-list-item-title>
              <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expand-transition>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!model" color="grey darken-3" @click="model = null">
          Clear
          <v-icon right> mdi-close-circle </v-icon>
        </v-btn>
      </v-card-actions> -->
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      hash: this.$route.params.hash,
      userLocation: null,
      userCity: "",
      model: null,
      search: '',
      isLoading: null,
      entries: [],
    };
  },
  components: {},
  methods: {
    getCity(lat, lng) {
      axios
        .get(
          "https://us1.locationiq.com/v1/reverse.php?key=pk.c3f76fe70a708beb9b8598e1900f1048&lat=" +
            lat +
            "&lon=" +
            lng +
            "&format=json"
        )
        .then((response) => {
          this.userCity = response.data.address.city;
        });
    },
  },
  created() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.userLocation = position;
        console.log(position.coords.longitude);
        console.log(position.coords.latitude);
        this.getCity(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.log(error.message);
        console.log("error");
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 10000,
      }
    );
  },
  computed: {
    // fields() {
    //   if (!this.model) return [];

    //   return Object.keys(this.model).map((key) => {
    //     return {
    //       key,
    //       value: this.model[key] || "n/a",
    //     };
    //   });
    // },
    // items() {
    //   return this.entries.map((entry) => {
    //     const Description =
    //       entry.Description.length > this.descriptionLimit
    //         ? entry.Description.slice(0, this.descriptionLimit) + "..."
    //         : entry.Description;

    //     return Object.assign({}, entry, { Description });
    //   });
    // },
  },

  watch: {
    search() {
      // // Items have already been loaded
      // if (this.items.length > 0) return;

      // // Items have already been requested
      // if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      // fetch("https://api.publicapis.org/entries")
      //   .then((res) => res.json())
      //   .then((res) => {
      //     const { count, entries } = res;
      //     this.count = count;
      //     this.entries = entries;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   })
      //   .finally(() => (this.isLoading = false));
      axios
        .get(
          "https://api.locationiq.com/v1/autocomplete.php?key=pk.c3f76fe70a708beb9b8598e1900f1048&q=" +
            this.search, {
                  params: {
                    'tag=place':'city',
                  }
                }
        )
        .then((response) => {
          this.entries = response.data
          console.log(response)
          this.isLoading = false
        });
    },
  },
};
</script>

<style>
</style>