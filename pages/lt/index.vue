<script lang="ts">
import { useToastStore, ToastPayload } from "~/store/toast";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  setup() {
    const user = useSupabaseUser();
    const { auth } = useSupabaseClient();
    const store = useToastStore();
    watchEffect(() => {
      if (user.value) {
        console.log(user.value);
        navigateTo("/");
      }
    });
    return {
      user,
      auth,
      store,
    };
  },
  methods: {
    signIn() {
      useAsyncData(async () => {
        const { user, session, error } = await this.auth.signIn({
          email: this.email,
        });
        if (error) {
          this.toast(error.message, "error");
          return;
        }
        this.toast("A magic link has been sent to your email.", "success");
        this.email = "";
      });
    },
    toast(message: string, type: string) {
      const payload: ToastPayload = {
        message,
        type,
        timeout: 3000,
      };
      this.store.showToast(payload);
    },
  },
};
</script>
<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <h2 class="my-6 text-center text-3xl font-extrabold u-text-white">
      Sign in to your account
    </h2>
    <input
      type="text"
      placeholder="your email goes here"
      v-model="email"
      class="input input-bordered"
    />
    <button class="btn mt-3" @click="signIn">Send Authentication Link</button>
  </div>
</template>
