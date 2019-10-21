<template>
  <div>
    <v-dialog persistent v-model="dialog" max-width="70%">
      <v-card>
        <v-card-title>
          <v-icon class="mr-2">mdi-animation-outline</v-icon>
          <p class="display-1 text--primary">{{form.projectName}}</p>
        </v-card-title>
        <v-card-subtitle>
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <span class="font-italic font-weight-light">
                  Prepared By
                  <span class="font-italic font-weight-bold">{{form.preparedBy}}</span>
                </span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card-subtitle>

        <v-card-text>
          <v-form class="px-3">
            <v-row>
              <v-col sm="12" md="5">
                <v-text-field
                  readonly
                  dense
                  prepend-icon="vpn_key"
                  :value="form.projectId"
                  label="Project ID"
                ></v-text-field>
              </v-col>
              <v-col offset-md="2" sm="12" md="5">
                <v-text-field
                  readonly
                  color="purple darken-2"
                  prepend-icon="mdi-file-document-box-plus-outline"
                  v-model="form.documentNumber"
                  label="Document Number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="12" md="5">
                <v-text-field
                  readonly
                  dense
                  prepend-icon="mdi-account-card-details-outline"
                  v-model="form.projectName"
                  label="Project Name"
                ></v-text-field>
              </v-col>
              <v-col offset-md="2" sm="12" md="5">
                <v-text-field
                  readonly
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
                  readonly
                  dense
                  prepend-icon="place"
                  v-model="form.location"
                  label="Location"
                ></v-text-field>
              </v-col>
              <v-col offset-md="2" sm="12" md="5">
                <v-text-field
                  readonly
                  dense
                  prepend-icon="date_range"
                  v-model="form.documentDate"
                  label="Document Date"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col sm="12" md="5">
                <v-text-field
                  readonly
                  dense
                  prepend-icon="fas fa-parachute-box"
                  v-model="form.supplier"
                  label="Supplier"
                ></v-text-field>
              </v-col>
              <v-col offset-md="2" sm="12" md="5">
                <v-text-field
                  readonly
                  dense
                  prepend-icon="date_range"
                  label=" Date"
                  :value="form.requiredDate"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col sm="12" md="5">
                <v-text-field
                  readonly
                  dense
                  prepend-icon="far fa-thumbs-up"
                  v-model="form.preferredSupplier"
                  label="Preferred Supplier"
                ></v-text-field>
              </v-col>
              <v-col offset-md="2" sm="12" md="5">
                <v-text-field
                  readonly
                  dense
                  prepend-icon="access_time"
                  v-model="form.urgencyPriority"
                  label="Preferred Supplier"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col offset-md="7" sm="12" md="5">
                <v-text-field
                  readonly
                  dense
                  prepend-icon="person_pin"
                  v-model="form.preparedBy"
                  label="Prepared by"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col offset-md="7" sm="12" md="5">
                <v-text-field
                  readonly
                  dense
                  prepend-icon="how_to_reg"
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
                      <td>{{index + 1}}</td>
                      <td>
                        <v-text-field
                          readonly
                          v-model="lineDetail.itemCode"
                          placeholder="Item Code"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          readonly
                          v-model="lineDetail.itemDescription"
                          placeholder="Item Description"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          readonly
                          v-model="lineDetail.scopeOfWork"
                          placeholder="Scope of Work"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          readonly
                          v-model="lineDetail.scopeDescription"
                          placeholder="Scope Description"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          readonly
                          v-model="lineDetail.materialCode"
                          placeholder="Material Code"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          readonly
                          v-model="lineDetail.materialDescription"
                          placeholder="Material Description"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          readonly
                          v-model="lineDetail.quantity"
                          type="number"
                          placeholder="Quantity"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          readonly
                          v-model="lineDetail.infoPrice"
                          type="number"
                          placeholder="Info Price"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field readonly v-model="lineDetail.uom" placeholder="UoM"></v-text-field>
                      </td>

                      <td>
                        <v-text-field
                          readonly
                          v-model="lineDetail.lineRemarks"
                          placeholder="Line Remarks"
                        ></v-text-field>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </div>
            </v-simple-table>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="red darken-1" text @click="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
export default {
  name: "view-item",
  data: () => ({}),

  computed: {
    dialog() {
      return this.$store.getters["requisitionSlip/getViewDialog"];
    },

    form() {
      return this.$store.getters["requisitionSlip/getCurrentItem"];
    }
  },

  methods: {
    close() {
      this.$store.commit("requisitionSlip/openViewDialog");
    }
  }
};
</script>

<style>
</style>