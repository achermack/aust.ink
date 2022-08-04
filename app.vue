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
  <footer class="footer items-center p-4 bg-neutral text-neutral-content">
    <div class="items-center grid-flow-col">
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
        class="fill-current"
      >
        <path
          d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"
        ></path>
      </svg>
      <a href="https://cherm.io" target="_blank">
        <p>cherm.io labs © {{ new Date().getFullYear() }} | austin@cherm.io</p>
      </a>
    </div>
    <div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
      <a
        href="https://github.com/achermack"
        target="_blank"
        rel="noopener noreferrer"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
          />
        </svg>
      </a>
    </div>
  </footer>
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
