<template>
  <v-card min-width="50%" style="background-color: #e0e0e0" elevation="10">
    <v-card-title>aust.ink URL Shortener</v-card-title>
    <v-card-text> enter a long url you would like to shorten </v-card-text>
    <v-col class="d-flex py-0 mb-0" cols="12">
      <v-text-field
        placeholder="Example: https://cherm.io"
        label="URL goes here"
        prepend-icon="mdi-link"
        clearable
        color="accent"
        variant="outlined"
        v-model="url"
        :loading="loading"
        @keydown="keyDown"
      ></v-text-field>
    </v-col>
    <v-container fluid class="pl-2" v-if="shortUrl != ''">
      <v-chip color="success" text-color="white" label class="ma-2">
        <v-icon>mdi-check</v-icon>
      </v-chip>
      URL Created Successfully!
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
    </v-container>
    <v-card-actions>
      <v-spacer> </v-spacer>
      <v-btn :disabled="loading" @click="shorten" color="primary"
        ><v-icon>mdi-link-plus</v-icon>Shorten
      </v-btn>
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
    keyDown(event) {
      if (event.keyCode === 13) {
        this.shorten();
      }
    },
    shorten() {
      if (this.$data.url !== "" && this.isUrl(this.$data.url)) {
        this.$data.loading = true;
        axios
          .post("https://cxw18c0wod.execute-api.us-east-1.amazonaws.com/url", {
            url: this.$data.url,
          })
          .then((response) => {
            toast.success("Short URL created successfully!", {
              timeout: 5000,
            });
            this.$data.loading = false;
            this.$data.url = "";
            this.$data.shortUrl = `https://aust.ink/go/${response.data.item.hash}`;
            this.copyToClipboard();
          })
          .catch((error) => {
            this.$data.loading = false;
            this.$data.shortUrl = "";
            console.log(error);
          });
      }
    },
    copyToClipboard() {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.$data.shortUrl);
        this.$data.copied = true;
        setTimeout(() => {
          this.$data.copied = false;
        }, 1000);
        toast.success("Short URL copied to clipboard!", {
          timeout: 2000,
        });
      } else {
        toast.error("Your browser does not support clipboard!", {
          timeout: 2000,
        });
      }
    },
  },
  data() {
    return {
      loading: false,
      url: "",
      shortUrl: "",
      copied: false,
    };
  },
};
</script>
<style scoped>
.pointer {
  cursor: pointer;
}
</style>
