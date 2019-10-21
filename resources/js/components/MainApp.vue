<template>
  <div>
    <v-app>
      <Navbar />
      <div class="container-fluid my-4">
        <v-content>
          <router-view></router-view>
        </v-content>
      </div>

      <Footer />
    </v-app>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
export default {
  name: "MainApp",
  components: {
    Navbar,
    Footer
  },

  data: () => ({}),
  created() {
    this.$store.dispatch("auth/getUserInfo");
  }
};
</script>
