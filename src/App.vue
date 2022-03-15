<template>
  <v-app>
    <v-main>
      <v-container
        fluid
        class="d-flex justify-center align-center"
        style="height: 100vh"
      >
        <Shortener />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Shortener from "./components/Shortener.vue";
export default {
  name: "App",

  components: {
    HelloWorld,
    Shortener,
  },

  data: () => ({
    snackbar: false,
    text: "",
    timeout: 2000,
  }),
};
</script>
