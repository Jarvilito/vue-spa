<template>
  <v-data-table
    :headers="headers"
    :search="search"
    :items="desserts"
    sort-by="calories"
    class="elevation-3"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Requisition Slip {{post}}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        <div class="flex-grow-1"></div>
        <v-btn @click.stop="requisitionDialog = true" class="mt-4 mr-4" fab dark color="green">
          <v-icon dark>mdi-pencil</v-icon>
        </v-btn>

        <v-dialog v-model="requisitionDialog" max-width="80%">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-form class="px-3">
                <v-row>
                  <v-col sm="12" md="5">
                    <v-text-field label="Project ID"></v-text-field>
                  </v-col>
                  <v-col offset-md="2" sm="12" md="5">
                    <v-text-field label="Document Number"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col sm="12" md="5">
                    <v-text-field label="Project Name"></v-text-field>
                  </v-col>
                  <v-col offset-md="2" sm="12" md="5">
                    <v-text-field label="Status"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col sm="12" md="5">
                    <v-text-field label="Location"></v-text-field>
                  </v-col>
                  <v-col offset-md="2" sm="12" md="5">
                    <v-text-field label="Document Date"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col sm="12" md="5">
                    <v-text-field label="Supplier"></v-text-field>
                  </v-col>
                  <v-col offset-md="2" sm="12" md="5">
                    <v-text-field label="Required Date"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col sm="12" md="5">
                    <v-text-field label="Preferred Supplier"></v-text-field>
                  </v-col>
                  <v-col offset-md="2" sm="12" md="5">
                    <v-text-field label="Urgency Priority"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col offset-md="7" sm="12" md="5">
                    <v-text-field label="Prepared by"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col offset-md="7" sm="12" md="5">
                    <v-text-field label="Checked By"></v-text-field>
                  </v-col>
                </v-row>
                <v-divider></v-divider>

                <v-simple-table fixed-header class="mb-2 line-detail-table">
                  <template>
                    <thead class="purple darken-2 text-center display-1 text-uppercase">
                      <tr>
                        <th></th>
                        <th>#</th>
                        <th>Item Code</th>
                        <th>Item Description</th>
                        <th>Scope of Work</th>
                        <th>Scope Description</th>
                        <th>Material Code</th>
                        <th>Material Description</th>
                        <th>Line Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(lineDetail, index) in lineDetails" :key="index">
                        <th>
                          <v-btn v-on:click="removeLineDetails(index)" fab small color="red">
                            <v-icon dark>mdi-minus</v-icon>
                          </v-btn>
                        </th>
                        <td>{{index + 1}}</td>
                        <td>
                          <v-text-field v-model="lineDetail.itemCode" placeholder="Item Code"></v-text-field>
                        </td>
                        <td>
                          <v-text-field placeholder="Item Description"></v-text-field>
                        </td>
                        <td>
                          <v-text-field placeholder="Scope of Work"></v-text-field>
                        </td>
                        <td>
                          <v-text-field placeholder="Scope Description"></v-text-field>
                        </td>
                        <td>
                          <v-text-field placeholder="Material Code"></v-text-field>
                        </td>
                        <td>
                          <v-text-field placeholder="Material Description"></v-text-field>
                        </td>

                        <td>
                          <v-text-field placeholder="Line Remarks"></v-text-field>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>

                <v-divider></v-divider>

                <v-btn v-on:click="addLineDetails" class="mx-2" fab dark color="indigo">
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
              </v-form>
              <!-- <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>-->
            </v-card-text>
            <ItemCode />
            <v-card-actions>
              <div class="flex-grow-1"></div>

              <v-btn color="blue darken-1" text @click="close">CANCEL</v-btn>
              <v-btn color="blue darken-1" text @click="save">SAVE</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
export default {
  name: "requisition-slip",
  data: () => ({
    search: "",
    lineDetails: [
      {
        itemCode: "",
        itemDescription: "",
        scopeOfWork: "",
        scopeDesription: "",
        materialCode: "",
        materialDescription: "",
        lineRemarks: ""
      }
    ],
    requisitionDialog: false,
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "left",
        sortable: true,
        value: "name"
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Actions", value: "action", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "New Requisition Slip"
        : "Edit Requisition Slip";
    },

    post() {
      return this.$store.getters.post;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    addLineDetails() {
      this.lineDetails.push({
        itemCode: "",
        itemDescription: "",
        scopeOfWork: "",
        scopeDesription: "",
        materialCode: "",
        materialDescription: "",
        lineRemarks: ""
      });
    },

    removeLineDetails(index) {
      if (this.lineDetails.length !== 1) {
        this.lineDetails.splice(index, 1);
      }
    },
    initialize() {
      this.desserts = [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.requisitionDialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }

  // computed: {
  //   welcome(){
  //       return this.$store.getters.welcome;
  //   },
};
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