<template>
  <div>
    <v-btn @click.stop="createNew" class="mt-4 mr-4" fab dark color="green">
      <v-icon dark>mdi-pencil</v-icon>
    </v-btn>
    <v-dialog v-model="requisitionDialog" max-width="80%">
      <v-card class="text-uppercase">
        <v-card-title>
          <span class="teal--text text--darken-4">Create Requisition Slip</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation class="px-3">
            <v-row>
              <v-col sm="12" md="5">
                <v-text-field
                  dense
                  :rules="rules.projectIdRules"
                  required
                  prepend-icon="vpn_key"
                  clearable
                  v-model="form.projectId"
                  label="Project ID"
                ></v-text-field>
              </v-col>
              <v-col offset-md="2" sm="12" md="5">
                <v-text-field
                  color="purple darken-2"
                  required
                  prepend-icon="mdi-file-document-box-plus-outline"
                  readonly
                  v-model="form.documentNumber"
                  label="Document Number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="12" md="5">
                <v-text-field
                  dense
                  :rules="rules.projectNameRules"
                  required
                  prepend-icon="mdi-account-card-details-outline"
                  clearable
                  v-model="form.projectName"
                  label="Project Name"
                ></v-text-field>
              </v-col>
              <v-col offset-md="2" sm="12" md="5">
                <v-text-field
                  dense
                  prepend-icon="check_circle_outline"
                  readonly
                  v-model="form.status"
                  label="Status"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col sm="12" md="5">
                <v-text-field
                  dense
                  :rules="rules.locationRules"
                  required
                  prepend-icon="place"
                  clearable
                  v-model="form.location"
                  label="Location"
                ></v-text-field>
              </v-col>
              <v-col offset-md="2" sm="12" md="5">
                <v-text-field
                  dense
                  prepend-icon="date_range"
                  readonly
                  v-model="form.documentDate"
                  label="Document Date"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col sm="12" md="5">
                <v-text-field
                  dense
                  :rules="rules.supplierRules"
                  required
                  prepend-icon="fas fa-parachute-box"
                  clearable
                  v-model="form.supplier"
                  label="Supplier"
                ></v-text-field>
              </v-col>
              <v-col offset-md="2" sm="12" md="5">
                <v-menu max-width="290">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      dense
                      :rules="rules.requiredDateRules"
                      required
                      prepend-icon="date_range"
                      label="Required Date"
                      readonly
                      v-on="on"
                      :value="form.requiredDate"
                    ></v-text-field>
                  </template>
                  <v-date-picker :min="dateToday" color="success" v-model="form.requiredDate"></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row>
              <v-col sm="12" md="5">
                <v-text-field
                  dense
                  :rules="rules.preferredSupplierRules"
                  required
                  prepend-icon="far fa-thumbs-up"
                  clearable
                  v-model="form.preferredSupplier"
                  label="Preferred Supplier"
                ></v-text-field>
              </v-col>
              <v-col offset-md="2" sm="12" md="5">
                <v-select
                  height="35"
                  :items="form.urgency"
                  item-value="value"
                  item-text="text"
                  menu-props="auto"
                  :rules="rules.urgencyPriorityRules"
                  required
                  prepend-icon="access_time"
                  clearable
                  v-model="form.urgencyPriority"
                  label="Urgency Priority"
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col offset-md="7" sm="12" md="5">
                <v-text-field
                  dense
                  prepend-icon="person_pin"
                  readonly
                  v-model="form.preparedBy"
                  label="Prepared by"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col offset-md="7" sm="12" md="5">
                <v-text-field
                  dense
                  prepend-icon="how_to_reg"
                  readonly
                  v-model="form.checkedBy"
                  label="Checked By"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>

            <v-simple-table fixed-header class="mb-2 line-detail-table">
              <div class="customWidth">
                <template>
                  <thead class="purple darken-2 text-center display-1 text-uppercase" width="100%">
                    <tr>
                      <th></th>
                      <th>#</th>
                      <th>Item Code</th>
                      <th>Item Description</th>
                      <th>Scope of Work</th>
                      <th>Scope Description</th>
                      <th>Material Code</th>
                      <th>Material Description</th>
                      <th>Quantity</th>
                      <th>Info Price</th>
                      <th>UoM</th>
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
                        <v-text-field
                          required
                          :rules="rules.itemCodeRules"
                          v-model="lineDetail.itemCode"
                          clearable
                          placeholder="Item Code"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          required
                          :rules="rules.itemDescriptionRules"
                          v-model="lineDetail.itemDescription"
                          clearable
                          placeholder="Item Description"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          required
                          :rules="rules.scopeOfWorkRules"
                          v-model="lineDetail.scopeOfWork"
                          clearable
                          placeholder="Scope of Work"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          required
                          :rules="rules.scopeDescriptionRules"
                          v-model="lineDetail.scopeDescription"
                          clearable
                          placeholder="Scope Description"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          required
                          @click="getOitm(index)"
                          :rules="rules.materialCodeRules"
                          v-model="lineDetail.materialCode"
                          clearable
                          placeholder="Material Code"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          required
                          :rules="rules.materialDescriptionRules"
                          v-model="lineDetail.materialDescription"
                          clearable
                          placeholder="Material Description"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          required
                          :rules="rules.quantityRules"
                          v-model="lineDetail.quantity"
                          clearable
                          type="number"
                          placeholder="Quantity"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          required
                          :rules="rules.infoPriceRules"
                          v-model="lineDetail.infoPrice"
                          clearable
                          type="number"
                          placeholder="Info Price"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          required
                          :rules="rules.uomRules"
                          v-model="lineDetail.uom"
                          clearable
                          placeholder="UoM"
                        ></v-text-field>
                      </td>

                      <td>
                        <v-text-field
                          v-model="lineDetail.lineRemarks"
                          clearable
                          placeholder="Line Remarks"
                        ></v-text-field>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </div>
            </v-simple-table>

            <v-divider></v-divider>

            <v-btn v-on:click="addLineDetails" class="mx-2" fab dark color="indigo">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn :disabled="!valid" color="green darken-1" x-large text @click="createItem">CREATE</v-btn>
          <v-btn color="red darken-1" x-large text @click="cancelConfimationDialog = true">CANCEL</v-btn>
        </v-card-actions>
      </v-card>

      <!-- CANCEL  CONFIRMATION DIALOG -->
      <v-dialog v-model="cancelConfimationDialog" width="350">
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
    <Oitm />
    <!-- cancel snackbar -->
  </div>
</template>

<script>
import Oitm from "../api/Oitm.vue";
export default {
  name: "create",
  components: {
    Oitm
  },
  data: () => ({
    valid: true,
    rules: {
      projectNameRules: [v => !!v || "Project namme is required"],
      projectIdRules: [v => !!v || "Project Id is required"],
      locationRules: [v => !!v || "Location is required"],
      supplierRules: [v => !!v || "Supplier is required"],
      requiredDateRules: [v => !!v || "Required date is required"],
      preferredSupplierRules: [v => !!v || "Preferred Supplier is required"],
      urgencyPriorityRules: [v => !!v || "urgency priority is required"],
      itemCodeRules: [v => !!v || "Item code is required"],

      itemDescriptionRules: [v => !!v || "Item description is required"],
      scopeOfWorkRules: [v => !!v || "scope of work is required"],
      scopeDescriptionRules: [v => !!v || "scope description is required"],
      materialCodeRules: [v => !!v || "material code is required"],
      materialDescriptionRules: [
        v => !!v || "material description is required"
      ],
      infoPriceRules: [v => !!v || "info price is required"],
      quantityRules: [v => !!v || "quantity is required"],
      uomRules: [v => !!v || "uom code is required"]
    },

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
      documentDate: moment().format("MM-DD-YYYY"),
      requiredDate: "",
      urgency: [
        {
          text: "Low Prioirty",
          value: "LP"
        },
        {
          text: "Medium Priority",
          value: "MP"
        },
        {
          text: "High Priority",
          value: "High"
        }
      ],
      urgencyPriority: "",
      checkedBy: "",
      lineDetails: [
        {
          itemCode: "",
          itemDescription: "",
          scopeOfWork: "",
          scopeDescription: "",
          materialCode: "",
          materialDescription: "",
          lineRemarks: "",
          infoPrice: 0,
          quantity: "",
          uom: ""
        }
      ]
    }
  }),

  watch: {
    selectedApiValue() {
      this.insertSelectedItem();
    }
  },

  computed: {
    selectedApiValue() {
      return this.$store.state.watchApiChange;
    },
    getToken() {
      return this.$store.state.token;
    },

    getRequisitionSlips() {
      return this.$store.getters.getRequisitionSlips;
    },
    dateToday() {
      return moment().format("YYYY-MM-DD");
    },

    formatRequiredDate() {
      return this.form.requiredDate
        ? (this.form.requiredDate = moment(this.form.requiredDate).format(
            "MM-DD-YYYY"
          ))
        : null;

      return null;
    }
  },
  methods: {
    getOitm(index) {
      this.$store.dispatch("getOitm", index);
    },

    insertSelectedItem() {
      let index = this.$store.getters.getSelectedIndex;
      let value = this.$store.getters.getApiSelectedValue;

      this.form.lineDetails[index].materialCode = value;
    },
    addLineDetails() {
      this.form.lineDetails.push({
        itemCode: "",
        itemDescription: "",
        scopeOfWork: "",
        scopeDesription: "",
        materialCode: "",
        materialDescription: "",
        lineRemarks: "",
        infoPrice: 0,
        quantity: "",
        uom: ""
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
        this.$refs.form.reset();
        this.form.lineDetails = [
          {
            itemCode: "",
            itemDescription: "",
            scopeOfWork: "",
            scopeDesription: "",
            materialCode: "",
            materialDescription: "",
            lineRemarks: "",
            infoPrice: 0,
            quantity: "",
            uom: ""
          }
        ];
      }, 300);
    },

    createNew() {
      this.requisitionDialog = true;
      if (this.getRequisitionSlips.length) {
        this.form.documentNumber =
          this.getRequisitionSlips[this.getRequisitionSlips.length - 1]
            .DocEntry + 1;
      } else {
        this.form.documentNumber = 1;
      }

      this.form.preparedBy = this.$store.getters.getCurrentUser.name;
      this.form.status = "O";
      this.form.documentDate = moment().format("MM-DD-YYYY");
    },

    createItem() {
      if (this.$refs.form.validate()) {
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
  }
};
</script>

<style>
.customWidth {
  width: 2000px !important;
}
</style>