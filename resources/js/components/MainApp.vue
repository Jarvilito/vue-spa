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
import { mapState } from "vuex";
import Navbar from "./Navbar.vue";
import Dashboard from "./Dashboard.vue";
import RequisitionSlip from "./RequisitionSlip.vue";
export default {
  name: "MainApp",
  components: {
    Navbar,
    Dashboard,
    RequisitionSlip
  }
};
</script>
