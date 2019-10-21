<template>
  <div>
    <v-dialog persistent v-model="dialogOitm" scrollable style="max-height: 400px;" width="550">
      <v-card>
        <v-card-title>
          Select Item Code
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :search="search"
          v-model="selected"
          single-select
          item-key="itemCode"
          show-select
          :headers="headers"
          :items="oitm"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.itemCode="{ item }">
            <v-chip color="blue darken-4" dark>{{ item.itemCode }}</v-chip>
          </template>
          <template v-slot:item.itemName="{ item }">
            <v-chip color="blue lighten-1" dark>{{ item.itemName }}</v-chip>
          </template>
        </v-data-table>
        <v-card-actions class="p-2">
          <v-spacer></v-spacer>
          <v-btn large color="success" :disabled="!selected.length" text @click="insertCode">ADD</v-btn>
          <v-btn large color="red" text @click="closeDialogOitm">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Oitm",
  data: () => ({
    selected: [],
    search: "",
    headers: [
      {
        text: "Item Code",
        alight: "left",
        sortable: true,
        value: "itemCode"
      },
      {
        text: "Item Name",
        alight: "left",
        sortable: true,
        value: "itemName"
      }
    ]
  }),
  components: {},
  created() {
    this.getOitm = this.$store.getters["oitm/getOitm"];
  },
  computed: {
    dialogOitm() {
      return this.$store.getters["oitm/dialogOitm"];
    },

    oitm() {
      return this.$store.getters["oitm/getOitm"];
    }
  },
  methods: {
    insertCode() {
      this.$store.commit("oitm/updateSelectedOitm", this.selected[0].itemCode);
      this.selected = [];
    },
    closeDialogOitm() {
      this.selected = [];
      this.$store.commit("oitm/closeDialogOitm");
    }
  }
};
</script>

<style>
</style>
