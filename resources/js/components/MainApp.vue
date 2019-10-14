<template>
  <v-app>
    <Navbar />
    <div class="container-fluid mt-4">
      <v-content>
        <router-view></router-view>
      </v-content>
    </div>
  </v-app>
</template>

<script>
import Navbar from "./Navbar.vue";
export default {
  name: "MainApp",
  components: {
    Navbar
  },
  created() {
    this.$store.dispatch("getUserInfo");
  }
};
</script>
