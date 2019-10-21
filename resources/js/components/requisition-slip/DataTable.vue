<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-skeleton-loader :loading="isLoading" transition="scale-transition" height="500" type="table">
      <v-data-table
        :headers="headers"
        :search="search"
        :items="requisitionSlipData"
        sort-by="docNum"
        sort-desc
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              <v-avatar left class="pl-4">
                <v-icon class="mr-2">mdi-animation-outline</v-icon>
              </v-avatar>
              <span class="font-weight-light title">REQUISITION SLIP</span>
            </v-toolbar-title>

            <v-divider class="mx-4" inset vertical></v-divider>
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
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-chip
                :to="`/requisition-slip/${item.docNum}`"
                v-on="on"
                class="ma-2"
                color="primary"
              >
                <v-icon>edit</v-icon>
              </v-chip>
            </template>
            <span>Edit Requisition Slip</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-chip class="ml-2" color="success" v-on="on" @click="viewItem(item.docNum)">
                <v-icon>visibility</v-icon>
              </v-chip>
            </template>
            <span>View Requisition Slip</span>
          </v-tooltip>
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip :color="getColor(item.status)" dark>
            <span class="px-2">{{ item.status }}</span>
          </v-chip>
        </template>
      </v-data-table>
    </v-skeleton-loader>
    <ViewItem />
  </div>
</template>

<script>
import Create from "./Create.vue";
import ViewItem from "./ViewItem.vue";
export default {
  name: "RequisitionLists",
  components: {
    Create,
    ViewItem
  },
  data: () => ({
    loading: true,
    overlay: false,
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
      { text: "Actions", align: "center", value: "action", sortable: false }
    ]
  }),
  created() {
    this.$store.dispatch("requisitionSlip/retrieveRequisitionSlipsAction");
  },
  computed: {
    isLoading() {
      return this.requisitionSlipData.length ? false : true;
    },
    requisitionSlipData() {
      return this.$store.getters["requisitionSlip/getRequisitionSlipsHeader"];
    }
  },
  methods: {
    getColor(status) {
      if (status == "O") return "orange darken-2";
      else if (status == "A") return "green";
      else return "blue";
    },

    viewItem(id) {
      this.overlay = true;
      this.$store.dispatch("requisitionSlip/getItemInfo", id).then(response => {
        this.$store.commit("requisitionSlip/openViewDialog");
        this.overlay = !this.overlay;
      });
    }
  }
};
</script>

<style>
</style>