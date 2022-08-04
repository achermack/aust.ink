<template>
  <div class="flex h-screen bg-slate-800">
    <toast :message="toast.msg" :show="toast.show" :type="toast.type" />
    <div class="m-auto">
      <div class="card bg-white text-slate-800 align-middle">
        <div class="card-body w-96">
          <h2 class="card-title">aust.ink URL Shortener</h2>
          <p class="card-text font-extralight italic">
            get a link like
            <a href="https://aust.ink/u/ZPCA0D" target="_blank" class="link"
              >aust.ink/u/ZPCA0D</a
            >
          </p>
          <div class="divider"></div>
          <label
            for="url"
            class="relative text-gray-400 focus-within:text-gray-600 block"
          >
            <svg
              class="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/3 left-3"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path
                d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z"
              />
            </svg>

            <input
              type="text"
              class="pl-14 input input-ghost input-primary w-full focus:outline-none focus:background-color-gray-100 focus:bg-white placeholder-gray-400 focus:text-gray-800"
              placeholder="your url goes here"
              v-model="url"
              @keydown="keydown"
            />
          </label>

          <div v-if="shortUrl !== ''">
            <div class="divider"></div>
            <div class="text-center space-y-3">
              <h3 class="text-gray-400 italic">
                succesfully created the following short url
              </h3>
              <input
                type="text"
                v-model="shortUrl"
                class="input input-bordered input-ghost w-full max-w-xs disabled:bg-white disabled:placeholder-gray-800 hover:cursor-default"
                disabled
              />
              <span
                class="flex absolute right-0 bg-transparent rounded text-base text-gray-600 p-2"
              >
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  class="fill-current hover:cursor-pointer w-8 h-8 transform -translate-y-14 -translate-x-6"
                  @click="copyToClipboard"
                >
                  <path
                    d="M20 24h-20v-22h3c1.229 0 2.18-1.084 3-2h8c.82.916 1.771 2 3 2h3v9h-2v-7h-4l-2 2h-3.898l-2.102-2h-4v18h16v-5h2v7zm-10-4h-6v-1h6v1zm0-2h-6v-1h6v1zm6-5h8v2h-8v3l-5-4 5-4v3zm-6 3h-6v-1h6v1zm0-2h-6v-1h6v1zm0-2h-6v-1h6v1zm0-2h-6v-1h6v1zm-1-7c0 .552.448 1 1 1s1-.448 1-1-.448-1-1-1-1 .448-1 1z"
                  />
                </svg>
              </span>
              <div
                class="flex relative w-500px h-48px group justify-center items-center z-1001 pl-8"
              ></div>
            </div>
          </div>
          <div class="card-actions justify-end mt-3">
            <button
              @click="shorten"
              class="btn btn-outline text-primary hover:bg-white"
              :disabled="loading"
            >
              Shorten
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ChermioLabsFooter />
</template>

<script lang="ts">
import { useToastStore } from "~/store/toast";

export default {
  name: "URL Shortener",
  setup() {
    useHead({
      title: "aust.ink | URL Shortener",
      viewport: "width=device-width, initial-scale=1",
      charset: "utf-8",
      meta: [
        {
          name: "description",
          content: "shorten urls with the aust.ink url shortener",
        },
      ],
      link: [{ rel: "icon", href: "/favicon.ico" }],
    });
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
      loading: false,
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
        timeout: 1000,
      };

      this.store.showToast(payload);
    },
    shorten() {
      this.loading = true;
      if (this.isUrl(this.url)) {
        $fetch("/api/url", {
          method: "POST",
          body: JSON.stringify({
            url: this.url,
          }),
        })
          .then((res) => {
            if (res.status === 200) {
              this.shortUrl = "https://aust.ink/u/" + res.data.hash;
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
      this.loading = false;
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
