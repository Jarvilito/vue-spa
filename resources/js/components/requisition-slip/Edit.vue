<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-dialog persistent v-model="dialog" max-width="80%">
      <v-overlay :value="overlayInside">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-card class="text-uppercase">
        <v-list-item>
          <v-list-item-avatar color="light-blue ">
            <v-icon dark>mdi-file-document-edit-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline">EDIT REQUISITION SLIP</v-list-item-title>
            <v-list-item-subtitle>Created By {{this.form.preparedBy}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-text class="mt-4">
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
                  :items="urgency"
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
                          readonly
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
          <v-btn
            color="green darken-1"
            text
            :disabled="!valid"
            x-large
            @click="updateConfirmationModal = true"
          >UPDATE</v-btn>
          <v-btn color="red darken-1" text x-large @click="cancelConfimationDialog = true">CANCEL</v-btn>
        </v-card-actions>
      </v-card>

      <!-- CANCEL  CONFIRMATION DIALOG -->
      <v-dialog v-model="cancelConfimationDialog" max-width="450px">
        <v-card>
          <v-card-title class="headline red--text">Cancel Requisition Slip?</v-card-title>
          <v-card-text>Cancelling your form will reset all your input, Are you sure you want to cancel this form?</v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn x-large color="green darken-1" text @click="close">Yes</v-btn>
            <v-btn x-large color="red darken-1" text @click="cancelConfimationDialog = false">No</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- UPDATE CONFIRMATION -->
      <!-- SUBMIT CONFIRMATION DIALOG -->
      <v-dialog v-model="updateConfirmationModal" width="350">
        <v-card>
          <v-card-title class="headline blue--text">Update Requisition Slip?</v-card-title>
          <v-card-text>Are you sure you want to update your form?</v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn x-large color="green darken-1" text @click="updateItem">Yes</v-btn>

            <v-btn x-large color="red darken-1" text @click="updateConfirmationModal = false">No</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-dialog>
  </div>
  <!-- cancel snackbar -->
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

import { mapActions } from "vuex";

export default {
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
    name: "EditRequisition",
    loading: true,
    overlay: true,
    dialog: false,
    overlayInside: false,
    updateConfirmationModal: false,
    cancelConfimationDialog: false,
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
      urgencyPriority: "",
      checkedBy: "",
      id: "",
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
      ],
      lineDetailsDeleted: []
    }
  }),

  watch: {
    selectedApiValue() {
      this.insertSelectedItem();
    }
  },

  created() {
    this.$store
      .dispatch("requisitionSlip/getItemInfo", this.$route.params.id)
      .then(response => {
        let result = response.data;
        let resultHeader = result.header[0];
        console.log(result);
        this.form = {
          projectId: resultHeader.U_ProjectID,
          projectName: resultHeader.U_ProjName,
          location: resultHeader.U_Location,
          supplier: resultHeader.U_CardCode,
          preferredSupplier: resultHeader.U_PrefSupplier,
          preparedBy: resultHeader.U_PreparedBy,
          documentNumber: resultHeader.U_DocNum,
          status: resultHeader.U_DocStatus,
          documentDate: resultHeader.U_TaxDate,
          requiredDate: resultHeader.U_ReqDate,
          urgencyPriority: resultHeader.U_Urgency,
          checkedBy: resultHeader.U_CheckedBy,
          id: resultHeader.DocEntry,
          lineDetails: [],
          lineDetailsDeleted: []
        };
        let lineDetails = result.lineDetails.map(val => {
          return {
            id: val.id,
            itemCode: val.U_ItemCode,
            itemDescription: val.U_Dscription,
            scopeOfWork: val.U_Scope,
            scopeDescription: val.U_ScopeDesc,
            materialCode: val.U_MaterialCode,
            materialDescription: val.U_MaterialDesc,
            lineRemarks: val.U_LineRemarks,
            infoPrice: val.U_InfoPrice,
            quantity: val.U_Quantity,
            uom: val.U_UomCode
          };
        });
        this.form.lineDetails = lineDetails;
      })
      .then(response => {
        this.overlay = !this.overlay;
        this.dialog = !this.dialog;
      });
  },

  computed: {
    selectedApiValue() {
      return this.$store.getters["oitm/watchApiChange"];
    },
    getToken() {
      return this.$store.getters["auth/getToken"];
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
    addLineDetails() {
      this.form.lineDetails.push({
        id: 0,
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

    removeLineDetails(index) {
      if (this.form.lineDetails.length !== 1) {
        if (this.form.lineDetails[index].id) {
          this.form.lineDetailsDeleted.push(this.form.lineDetails[index].id);
        }
        this.form.lineDetails.splice(index, 1);
      }
    },
    confirmClose() {
      this.cancelConfimationDialog = true;
    },
    close() {
      this.$router.back();
    },

    getOitm(index) {
      this.overlayInside = true;
      this.$store.dispatch("oitm/getOitm", index).then(response => {
        this.overlayInside = false;
      });
    },

    insertSelectedItem() {
      let index = this.$store.getters["oitm/getSelectedIndex"];
      let value = this.$store.getters["oitm/getApiSelectedValue"];

      this.form.lineDetails[index].materialCode = value;
    },

    updateItem() {
      if (this.$refs.form.validate()) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${this.getToken}`;

        axios
          .patch(`/requisition-slip/update`, this.$data.form)
          .then(response => {
            this.$store.dispatch(
              "requisitionSlip/retrieveRequisitionSlipsAction"
            );
            Swal.fire({
              type: "success",
              title: "Item Updated!",
              showConfirmButton: true,
              timer: 3000
            });
            this.close();
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        this.updateConfirmationModal = false;
        Swal.fire({
          type: "error",
          showCloseButton: true,
          title: "Missing / Invalid Input",
          text: "Please check your form for some missing required inputs"
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