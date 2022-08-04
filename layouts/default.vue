<template>
  <div>
    <div class="toast toast-top toast-end">
      <transition-group
        enter-active-class="duration-300 east-out opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-to-class="opacity-0"
        leave-class="opacity-100"
      >
        <div
          v-for="(item, show) in store.messages"
          :key="item"
          :v-if="show"
          class="alert"
          :class="{
            'alert-error': item.type === 'error',
            'alert-success': item.type === 'success',
            'alert-warning': item.type === 'warning',
          }"
        >
          <div>
            <IconLib name="InfoIcon" />
            <span>{{ item.message }}</span>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
  <slot />
</template>
<script lang="ts">
import { useToastStore } from "~/store/toast";

export default {
  name: "Toast",

  setup() {
    const store = useToastStore();

    store.$onAction(({ name, store, args, after, onError }) => {
      after((res) => {
        if (name === "showToast") {
          setTimeout(() => {
            store.hideMessage(args[0]);
          }, args[0].timeout);
          setTimeout(() => {
            store.removeMessage(args[0]);
          }, args[0].timeout + 1000);
        }
      });
    });

    return {
      store,
    };
  },
};
</script>
