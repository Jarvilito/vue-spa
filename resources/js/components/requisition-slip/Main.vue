<template>
  <div>
    <v-app-bar color="teal darken-3" dark>
      <v-icon class="mr-2">mdi-animation-outline</v-icon>
      <v-toolbar-title class="text-uppercase">Requisition Slip</v-toolbar-title>
    </v-app-bar>
    <v-divider></v-divider>
    <DataTable />
    <router-view></router-view>
  </div>
</template>


<script>
import DataTable from "./DataTable.vue";
export default {
  name: "MainRequisition",
  components: {
    DataTable
  },
  data: () => ({}),

  computed: {},

  watch: {},

  methods: {}
};

// computed: {
//   welcome(){
//       return this.$store.getters.welcome;
//   },
</script>

<style scoped>
.row .col {
  padding: 0 !important;
}
.line-detail-table table {
  table-layout: fixed !important;
}

.v-data-table table thead {
  overflow: scroll !important;
  width: 1200px !important;
}
</style>