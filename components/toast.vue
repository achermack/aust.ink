<template>
  <transition
    enter-active-class="duration-300 east-out opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-to-class="opacity-0"
    leave-class="opacity-100"
  >
    <div v-if="store.show" class="transition ease-in-out delay-150">
      <div class="toast toast-top toast-end">
        <div
          v-for="msg in store.messages"
          :key="msg.msg"
          :class="`alert alert-${msg.type}`"
        >
          <div>
            <span>{{ msg.msg }}</span>
          </div>
        </div>
      </div>
    </div></transition
  >
</template>
<script lang="ts">
import { useToastStore } from "~/store/toast";

export default {
  name: "Toast",

  setup() {
    const store = useToastStore();

    const hide = store.$onAction(({ name, store, args, after, onError }) => {
      after((res) => {
        if (name === "showToast") {
          setTimeout(() => {
            if (store.messages.length === 1) {
              store.hideToast();
            }
            store.removeMessage(args[0].msg);
          }, 5000);
        }
      });
    });

    return {
      store,
    };
  },
};
</script>
