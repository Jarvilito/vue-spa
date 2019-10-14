<template>
  <v-data-table
    :headers="headers"
    :search="search"
    :items="requisitionSlips"
    sort-by="docNum"
    sort-desc
    class="elevation-3"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Requisition Slip</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        <div class="flex-grow-1"></div>
        <Create />
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
      <v-icon small @click="deleteItem(item)">delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import Create from "./Create.vue";
export default {
  name: "DataTable",
  components: {
    Create
  },
  data: () => ({
    search: "",
    headers: [
      {
        text: "Document Entry",
        align: "left",
        sortable: true,
        value: "docNum"
      },
      { text: "Project Name", value: "projectName" },
      { text: "Card Code", value: "cardCode" },
      { text: "Document Date", value: "taxDate" },
      { text: "Prepared By", value: "preparedBy" },
      { text: "Status", value: "status" },
      { text: "Actions", value: "action", sortable: false }
    ],
    requisitionSlips: []
  }),
  created() {
    this.$store.dispatch("retrieveRequisitionSlips").then(response => {
      this.initialize();
    });
  },
  watch: {
    requisitionSlipData() {
      this.initialize();
    }
  },
  computed: {
    requisitionSlipData() {
      return this.$store.getters.getRequisitionSlipsHeader;
    }
  },
  methods: {
    initialize() {
      this.requisitionSlips = this.requisitionSlipData;
      // this.$store.getters.getRequisitionSlips.result.map(val => {
      //   this.requisitionSlips.push({
      //     docNum: val.DocEntry,
      //     projectName: val.U_ProjName,
      //     cardCode: val.U_CardCode,
      //     taxDate: val.U_TaxDate,
      //     preparedBy: val.U_PreparedBy,
      //     status: val.U_DocStatus
      //   });
      // });
    }
  }
};
</script>

<style>
</style>