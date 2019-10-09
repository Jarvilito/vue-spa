<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="validate" ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="form.email"
                    :rules="emailRules"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    required
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    v-model="form.password"
                    :rules="passwordRules"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  ></v-text-field>

                  <v-card-actions>
                    <div class="flex-grow-1">
                      <span v-if="this.authError" class="font-weight-bold red--text">{{this.authError}}</span>
                    </div>
                    <v-btn color="primary" type="submit" value="Login">Login</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { login } from "../../helpers/auth.js";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "login",
  data() {
    return {
      valid: true,
      form: {
        email: "",
        password: ""
      },
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],

      passwordRules: [v => !!v || "Password is required"]
    };
  },
  methods: {
    validate() {
      //   if (this.authError) {
      //     emailRules = this.emailRules.push(this.authError);
      //   }
      if (this.$refs.form.validate()) {
        this.authenticate();
      }
    },
    authenticate() {
      this.$store.dispatch("login");
      login(this.$data.form)
        .then(res => {
          this.$store.commit("loginSuccess", res);
          this.$router.push({ path: "/" });
        })
        .catch(error => {
          this.$store.commit("loginFailed", { error });
        });
    }
  },
  computed: {
    ...mapGetters(["authError"])
  }
};
</script>

<style>
</style>