<template>
  <div style="font-family: 'Mitr', sans-serif; min-height: 100vh" class="">
    <slot />
    <Footer />
  </div>
</template>

<script setup>
import Footer from "~/components/common/Footer.vue";
</script>
