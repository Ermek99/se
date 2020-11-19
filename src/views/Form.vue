<template>
  <div>
    <v-card class="mx-auto mt-16 pt-16" max-width="500">
        <v-card-title>Credentials Form</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="user.message" label="Enter Message">
          </v-text-field>
        </v-form>
        <v-row justify="space-around" align="center">
          <v-time-picker v-model="user.time" format="24hr"> </v-time-picker>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="test" color="#86A8E7" dark>
          <span>submit</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {
        message: "",
        time: null,
      },
    };
  },
  computed: {
    url() {
      return (
        "http://ec2-3-127-36-250.eu-central-1.compute.amazonaws.com/user/" +
        this.$route.params.hash
      );
    },
  },
  methods: {
    test() {
      console.log("test was clicked");
      axios.put(this.url, this.msg).then((res) => {
        console.log(res);
        if (res.data === "false") {
          axios.put(this.url, this.msg).then((res) => {
            console.log("put didnt work");
            console.log(res);
          });
        }
      });
    },
  },
};
</script>

<style>
</style>