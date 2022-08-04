<template>
  <div class="flex h-screen bg-slate-800">
    <div class="m-auto">
      <div class="card bg-white text-slate-800 align-middle">
        <div class="card-body w-96">
          <h2 class="card-title">{{ hash }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "User Link Page",
  data() {
    return {
      hash: this.$route.params.hash[0],
    };
  },
};
</script>
