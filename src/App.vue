<template>
  <v-app dark class="app-container">
    <v-main>
      <v-container
        fluid
        class="d-flex justify-center align-center app-container"
      >
        <Shortener />
      </v-container>
      <Footer></Footer>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Shortener from "./components/Shortener.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",

  components: {
    HelloWorld,
    Shortener,
    Footer,
  },

  data: () => ({
    snackbar: false,
    text: "",
    timeout: 2000,
  }),
};
</script>
<style>
.app-container {
  height: 100vh;
  background: url("./assets/endless-constellation.svg") center center fixed !important;
  background-size: cover;
}
</style>
