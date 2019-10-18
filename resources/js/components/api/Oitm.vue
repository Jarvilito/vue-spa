<template>
  <div>
    <v-dialog persistent v-model="dialogOitm" max-width="290">
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>

        <v-card-text>
          <v-list>
            <v-list-item-group>
              <v-list-item v-for="(item, i) in otim" :key="i">
                <v-list-item-content>
                  <v-list-item-title @click="insertCode(item.cardCode, i)" v-text="item.cardCode"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="closeDialogOitm">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Oitm",
  data: () => ({
    // otim: []
  }),
  components: {},
  computed: {
    dialogOitm() {
      return this.$store.getters.dialogOitm;
    },

    otim() {
      return this.$store.getters.getRequisitionSlipsHeader;
    }
  },
  methods: {
    openOitm() {
      // if(this.item)
      // {
      //     axios here...
      // }

      // dialog open here....

      axios.get("/oitm/all/api").then(response => {
        this.otim = response.data;
      });
    },

    insertCode(value, index) {
      this.$store.commit("updateSelectedOitm", value);
    },
    closeDialogOitm() {
      this.$store.commit("closeDialogOitm");
    }
  }
};
</script>

<style>
</style>
