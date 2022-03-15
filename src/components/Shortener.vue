<template>
  <v-card min-width="50%">
    <v-card-title>aust.ink URL Shortener</v-card-title>
    <v-card-text> enter a long url you would like to shorten </v-card-text>
    <v-text-field
      placeholder="Example: https://cherm.io"
      label="URL"
      class="pa-4"
      clearable
      color="primary"
      variant="outlined"
      v-model="url"
      :loading="loading"
    ></v-text-field>
    <v-flex class="pl-4" v-if="shortUrl != ''">
      <v-chip color="success" text-color="white" label class="ma-2">
        <v-icon>mdi-check</v-icon>
      </v-chip>
      URL Created Successfully!
      <v-card-subtitle>
        <v-text-field
          :append-inner-icon="
            copied ? 'mdi-clipboard-check' : 'mdi-clipboard-check-outline'
          "
          readonly
          variant="outlined"
          v-model="shortUrl"
          @click:append-inner="copyToClipboard"
        >
        </v-text-field>
      </v-card-subtitle>
    </v-flex>
    <v-card-actions>
      <v-btn @click="shorten" color="primary">Shorten</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import axios from "axios";
import { useToast } from "vue-toastification";
const toast = useToast();
export default {
  methods: {
    isUrl(string) {
      let url;
      try {
        url = new URL(string);
      } catch (_) {
        return false;
      }
      return url.protocol === "https:" || url.protocol === "http:";
    },
    snackbar(message) {
      this.$emit("snackbar", message);
    },
    shorten() {
      if (this.$data.url !== "" && this.isUrl(this.$data.url)) {
        this.$data.loading = true;
        axios
          .post("https://cxw18c0wod.execute-api.us-east-1.amazonaws.com/url", {
            url: this.$data.url,
          })
          .then((response) => {
            toast.success(
              "Short URL created successfully and copied to clipboard!",
              {
                timeout: 5000,
              }
            );
            this.$data.loading = false;
            this.$data.url = "";
            this.$data.shortUrl = `https://aust.ink/go/${response.data.item.hash}`;
            navigator.clipboard.writeText(this.$data.shortUrl);
          })
          .catch((error) => {
            this.$data.loading = false;
            this.$data.shortUrl = "";
            console.log(error);
          });
      }
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.$data.shortUrl);
      this.$data.copied = true;
      setTimeout(() => {
        this.$data.copied = false;
      }, 1000);
      toast.success("Short URL copied to clipboard!", {
        timeout: 2000,
      });
    },
  },
  data() {
    return {
      loading: false,
      url: "",
      shortUrl: "",
      copied: false,
      snackbar: false,
      text: "",
    };
  },
};
</script>
<style scoped>
.pointer {
  cursor: pointer;
}
</style>
