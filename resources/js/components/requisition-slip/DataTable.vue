<template>
  <div>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="requisitionSlipData"
      sort-by="docNum"
      sort-desc
      class="elevation-3"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-text-field
            clearable
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <div class="flex-grow-1"></div>
          <Create />
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <router-link :to="`/requisition-slip/${item.docNum}`">
          <v-icon class="mr-2">edit</v-icon>
        </router-link>
        <v-icon @click="deleteItem(item)">delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Create from "./Create.vue";
import Edit from "./Edit.vue";
export default {
  name: "RequisitionLists",
  components: {
    Create,
    Edit
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
    ]
  }),
  created() {
    this.$store.dispatch("retrieveRequisitionSlips");
  },
  computed: {
    requisitionSlipData() {
      return this.$store.getters.getRequisitionSlipsHeader;
    }
  },
  methods: {
    editRequisitionSlip(item) {
      console.log(item.docNum);
    }
  }
};
</script>

<style>
</style>