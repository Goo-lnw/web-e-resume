<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Test Page</h1>
    <p class="mb-4">If you can see this page, Nuxt is working correctly.</p>
    <button @click="testAlert" class="bg-blue-500 text-white px-4 py-2 rounded">
      Test Alert
    </button>
  </div>
</template>

<script setup>
const { showAlert } = useAlert();

function testAlert() {
  showAlert("Test alert working!", "success");
}
</script> 