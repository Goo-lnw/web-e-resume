<script setup lang="ts">
import { useAlert } from "@/composables/useAlert";

const { alertMessage, alertType, isAlertVisible } = useAlert();

const alertTypeClass = computed(() => {
  switch (alertType.value) {
    case "success":
      return "bg-green-500 text-white";
    case "error":
      return "bg-[#FF9149] text-white";
    case "info":
      return "bg-blue-500 text-white";
    default:
      return "";
  }
});
</script>
<template>
  <div
    v-if="isAlertVisible"
    :class="[
      'fixed top-4 right-4 px-4 py-2 rounded shadow-lg transition',
      alertTypeClass,
    ]"
  >
    {{ alertMessage }}
  </div>
</template>
