<template>
  <div>
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