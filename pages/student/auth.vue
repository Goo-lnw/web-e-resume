<template>
  <div
    style="font-family: 'Mitr', sans-serif; min-height: 100vh"
    class="flex flex-col items-center justify-center bg-[#60B5FF]"
  >
    <NuxtImg src="/logo/logo.png" class="mx-auto" width="auto" height="auto" />
    <div class="w-full max-w-md p-8 bg-[#ffffff] rounded-2xl shadow-lg">
      <Alert />
      <slot />
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Mitr&display=swap&subset=thai",
      },
    ],
  },
});

import Alert from "~/components/Alert.vue";
</script>
