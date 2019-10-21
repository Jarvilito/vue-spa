<template>
  <v-footer fixed color="grey darken-3">
    <v-spacer></v-spacer>
    <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
      <v-icon size="24px">{{ icon }}</v-icon>
    </v-btn>
    <div>
      <span class="white--text">
        &copy; {{ new Date().getFullYear() }} —
        <strong>Fast Track Web Dev Team</strong>
      </span>
    </div>
  </v-footer>
</template>

<script>
export default {
  name: "footer",
  data: () => ({
    icons: [
      "fab fa-facebook",
      "fab fa-twitter",
      "fab fa-google-plus",
      "fab fa-linkedin",
      "fab fa-instagram"
    ]
  })
};
</script>

<style>
</style>