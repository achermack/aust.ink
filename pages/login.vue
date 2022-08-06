<script setup lang="ts">
const user = useSupabaseUser();
const { auth } = useSupabaseClient();

watchEffect(() => {
  if (user.value) {
    console.log(user.value);
    navigateTo("/");
  }
});
</script>

<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <h2>Sign in your account</h2>
  </div>
</template>
