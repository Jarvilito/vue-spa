<template>
  <div>
    <v-btn @click.stop="createNew" class="mt-4 mr-4" fab dark color="green">
      <v-icon dark>mdi-pencil</v-icon>
    </v-btn>
    <v-dialog v-model="requisitionDialog" max-width="80%">
      <v-card>
        <v-card-title>
          <span class="headline">Create Requisition Slip</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form class="px-3">
            <v-row>
              <v-col sm="12" md="5">
                <v-text-field v-model="form.projectId" label="Project ID"></v-text-field>
              </v-col>
              <v-col offset-md="2" sm="12" md="5">
                <v-text-field v-model="form.documentNumber" label="Document Number"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="12" md="5">
                <v-text-field v-model="form.projectName" label="Project Name"></v-text-field>
              </v-col>
              <v-col offset-md="2" sm="12" md="5">
                <v-text-field v-model="form.status" label="Status"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col sm="12" md="5">
                <v-text-field v-model="form.location" label="Location"></v-text-field>
              </v-col>
              <v-col offset-md="2" sm="12" md="5">
                <v-text-field v-model="form.documentDate" label="Document Date"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col sm="12" md="5">
                <v-text-field v-model="form.supplier" label="Supplier"></v-text-field>
              </v-col>
              <v-col offset-md="2" sm="12" md="5">
                <v-text-field v-model="form.requiredDate" label="Required Date"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col sm="12" md="5">
                <v-text-field v-model="form.preferredSupplier" label="Preferred Supplier"></v-text-field>
              </v-col>
              <v-col offset-md="2" sm="12" md="5">
                <v-text-field v-model="form.urgencyPriority" label="Urgency Priority"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col offset-md="7" sm="12" md="5">
                <v-text-field v-model="form.preparedBy" label="Prepared by"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col offset-md="7" sm="12" md="5">
                <v-text-field v-model="form.checkedBy" label="Checked By"></v-text-field>
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
                  <tr v-for="(lineDetail, index) in form.lineDetails" :key="index">
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
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="green darken-1" text @click="createItem">CREATE</v-btn>
          <v-btn color="red darken-1" text @click="cancelConfimationDialog = true">CANCEL</v-btn>
        </v-card-actions>
      </v-card>

      <!-- CANCEL  CONFIRMATION DIALOG -->
      <v-dialog v-model="cancelConfimationDialog" max-width="350px">
        <v-card>
          <v-card-title class="headline red--text">Cancel Requisition Slip?</v-card-title>
          <v-card-text>Cancelling your form will reset all your input, Are you sure you want to cancel this form?</v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="green darken-1" text @click="close">Yes</v-btn>

            <v-btn color="red darken-1" text @click="cancelConfimationDialog = false">No</v-btn>
            <v-btn color="blue darken-1" text @click="saveAsDraft">Save as draft</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-dialog>

    <!-- cancel snackbar -->
  </div>
</template>

<script>
export default {
  name: "create",
  data() {
    return {
      cancelConfimationDialog: false,
      requisitionDialog: false,
      form: {
        projectId: "",
        projectName: "",
        location: "",
        supplier: "",
        preferredSupplier: "",
        preparedBy: "",
        documentNumber: "",
        status: "O",
        documentDate: "",
        requiredDate: "",
        urgencyPriority: "",
        checkedBy: "",
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
        ]
      }
    };
  },
  computed: {
    getToken() {
      return this.$store.state.token;
    },

    getRequisitionSlips() {
      return this.$store.getters.getRequisitionSlips;
    }
  },
  methods: {
    addLineDetails() {
      this.form.lineDetails.push({
        itemCode: "",
        itemDescription: "",
        scopeOfWork: "",
        scopeDesription: "",
        materialCode: "",
        materialDescription: "",
        lineRemarks: ""
      });
    },

    saveAsDraft() {
      this.requisitionDialog = false;
      this.cancelConfimationDialog = false;
    },

    removeLineDetails(index) {
      if (this.form.lineDetails.length !== 1) {
        this.form.lineDetails.splice(index, 1);
      }
    },
    confirmClose() {
      this.cancelConfimationDialog = true;
    },
    close() {
      this.cancelConfimationDialog = false;
      this.requisitionDialog = false;
      setTimeout(() => {
        this.form = {
          projectId: "",
          projectName: "",
          location: "",
          supplier: "",
          preferredSupplier: "",
          documentNumber: "",
          status: "O",
          documentDate: "",
          requiredDate: "",
          urgencyPriority: "",
          preparedBy: "",
          checkedBy: "",
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
          ]
        };
      }, 300);
    },

    createNew() {
      this.form.documentNumber =
        this.getRequisitionSlips[this.getRequisitionSlips.length - 1].DocEntry +
        1;
      this.form.checkedBy = this.$store.getters.getCurrentUser.name;
      this.requisitionDialog = true;
    },

    createItem() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.getToken;

      axios
        .post("/requisition-slip/create", this.$data.form)
        .then(response => {
          this.$store.dispatch("retrieveRequisitionSlips");
          this.close();
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style>
</style>