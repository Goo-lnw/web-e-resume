<template>
    <div style="font-family: 'Mitr', sans-serif; min-height: 100vh" class="">
        <slot />
        <Footer />
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ["auth"],
});
import Footer from "~/components/common/Footer.vue";
</script>
