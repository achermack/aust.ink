<template>
  <div class="flex h-screen">
    <toast :message="toast.msg" :show="toast.show" :type="toast.type" />
    <div class="m-auto">
      <div class="card bg-white text-slate-800">
        <div class="card-body w-96">
          <h2 class="card-title">URL Shortener</h2>
          <div class="divider"></div>
          <input
            type="text"
            class="input input-ghost input-primary w-full max-w-xs"
            placeholder="your url goes here"
            v-model="url"
            @keydown="keydown"
          />
          <div v-if="shortUrl !== ''">
            <div class="divider"></div>
            <div class="text-center space-y-3">
              <div class="badge badge-primary badge-outline">Success!</div>
              <input
                type="text"
                :placeholder="shortUrl"
                class="input input-bordered input-ghost w-full max-w-xs"
                disabled
              />
              <button class="btn btn-primary" @click="copyToClipboard">
                Copy
              </button>
            </div>
          </div>
          <div class="card-actions justify-end mt-3">
            <button @click="shorten" class="btn btn-outline">Shorten</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useToastStore } from "~/store/toast";

export default {
  name: "URL Shortener",
  setup() {
    const store = useToastStore();
    return {
      store,
    };
  },
  data() {
    return {
      url: "",
      toast: {
        msg: "",
        show: false,
        type: "info",
        timeout: 3000,
      },
      shortUrl: "",
    };
  },
  methods: {
    isUrl(url: string) {
      return /^(http|https):\/\/[^ "]+$/.test(url);
    },
    keydown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        this.shorten();
      }
    },
    displayToast(msg: string, type: string) {
      const payload = {
        msg,
        type,
      };

      this.store.showToast(payload);
    },
    shorten() {
      if (this.isUrl(this.url)) {
        $fetch("/url", {
          method: "POST",
          body: JSON.stringify({
            url: this.url,
          }),
        })
          .then((res) => {
            if (res.status === 200) {
              this.shortUrl = "https://aust.ink/go/" + res.data.hash;
              this.displayToast("Created URL: " + this.shortUrl, "success");
              this.url = "";
              this.copyToClipboard();
            } else {
              this.displayToast("Error Creating url", "error");
              this.displayToast(res, "error");
            }
          })
          .catch((err) => {
            this.displayToast(err, "error");
          });
      } else {
        this.displayToast("Invalid URL", "error");
      }

      // this.displayToast("Shortening", "success");
      // console.log(this.isUrl(this.url));
    },
    copyToClipboard() {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.shortUrl);
        this.displayToast("Copied to clipboard", "success");
      } else {
        this.displayToast("Error copying to clipboard", "error");
      }
    },
  },
};
</script>
