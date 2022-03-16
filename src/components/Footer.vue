<template>
  <v-footer
    class="bg-pink-darken-4 text-white text-center d-flex flex-column pb-0"
  >
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-4 text-white"
        :icon="icon"
        variant="text"
        @click="openLink(icon)"
      ></v-btn>
    </div>
    <div class="text-white pt-0 mb-3">
      <p class="text-center">Made with <v-icon>mdi-heart</v-icon> by Austin</p>
      <v-divider class="my-3"></v-divider>
      <p>
        Feel free to check out my main site,
        <a href="https://cherm.io">cherm.io</a>
      </p>
    </div>

    <v-divider></v-divider>

    <div class="text-white mx-0 px-0 mt- bg-deep-purple" style="width: 200%">
      {{ new Date().getFullYear() }} — <strong>aust.ink</strong>
    </div>
  </v-footer>
</template>
<script>
export default {
  methods: {
    openLink(icon) {
      switch (icon) {
        case "mdi-github":
          window.open("https://github.com/achermack/aust.ink", "_blank");
          break;
        case "mdi-home":
          window.open("https://cherm.io", "_blank");
          break;
      }
    },
  },
  data: () => ({
    icons: ["mdi-github", "mdi-home"],
  }),
};
</script>
