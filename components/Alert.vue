<script setup lang="ts">
import { useAlert } from "@/composables/useAlert";

const { alertMessage, alertType, isAlertVisible } = useAlert();

const alertTypeClass = computed(() => {
  switch (alertType.value) {
    case "success":
      return "bg-green-400 text-normal text-white";
    case "error":
      return "bg-red-600 text-normal text-white ";
    case "info":
      return "bg-yellow-600 text-normal text-white ";
    default:
      return "bg-gray-600 text-normal text-white ";
  }
});
</script>

<template>
  <div
    v-if="isAlertVisible"
    :class="[
      'fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center px-4 py-3 sm:px-6 sm:py-4 rounded-xl shadow-lg max-w-[90%] sm:max-w-sm md:max-w-md w-full text-normal animate-fade-slide-in transition-all duration-300 ease-in-out transform ',
      alertTypeClass,
    ]"
  >
    <!-- ส่วนไอคอนและข้อความ -->
    <div class="flex items-center space-x-3 flex-grow">
      <Icon v-if="alertType === 'success'" name="mdi:sucess-outline" class="w-4 h-4"></Icon>
      <!-- <svg v-if="alertType === 'success'" class="w-5 h-5 sm:w-6 sm:h-6 animate-icon-bounce" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <mask id="lineMdCheckAll0">
          <g fill="none" stroke="#fff" stroke-dasharray="24" stroke-dashoffset="24" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M2 13.5l4 4l10.75 -10.75">
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0" />
            </path>
            <path stroke="#000" stroke-width="6" d="M7.5 13.5l4 4l10.75 -10.75">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="24;0" />
            </path>
            <path d="M7.5 13.5l4 4l10.75 -10.75">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="24;0" />
            </path>
          </g>
        </mask>
        <rect width="24" height="24" fill="currentColor" mask="url(#lineMdCheckAll0)" />
      </svg> -->
      <svg v-if="alertType === 'error'" class="w-5 h-5 sm:w-6 sm:h-6 animate-icon-bounce" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path stroke-dasharray="24" stroke-dashoffset="24" d="M12 20h5c0.5 0 1 -0.5 1 -1v-14M12 20h-5c-0.5 0 -1 -0.5 -1 -1v-14">
            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0" />
          </path>
          <path stroke-dasharray="20" stroke-dashoffset="20" d="M4 5h16">
            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.2s" values="20;0" />
          </path>
          <path stroke-dasharray="8" stroke-dashoffset="8" d="M10 4h4M10 9v7M14 9v7">
            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0" />
          </path>
        </g>
      </svg>
      <!-- <svg
        v-if="alertType === 'error'"
        class="w-5 h-5 sm:w-6 sm:h-6 animate-icon-bounce"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6L18"
        />
      </svg> -->
      <svg v-if="alertType === 'info'" class="sm:w-5 h-5 sm:h-6 animate-icon-bounce" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path stroke-dasharray="20" stroke-dashoffset="20" d="M3 21h18">
            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="20;0" />
          </path>
          <path fill="currentColor" fill-opacity="0" stroke-dasharray="48" stroke-dashoffset="48" d="M7 17v-4l10 -10l4 4l-10 10h-4">
            <animate fill="freeze" attributeName="fill-opacity" begin="1.1s" dur="0.15s" values="0;0.3" />
            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.6s" values="48;0" />
          </path>
          <path stroke-dasharray="8" stroke-dashoffset="8" d="M14 6l4 4">
            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="8;0" />
          </path>
        </g>
      </svg>

      <span class="text-sm sm:text-base">{{ alertMessage }}</span>
    </div>
    <!-- ปุ่มปิด -->
    <button class="ml-2 sm:ml-4 text-white hover:text-gray-200 focus:outline-none transform hover:scale-110 transition-transform duration-200 cursor-pointer" @click="isAlertVisible = false">
      <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
/* อนิเมชันสำหรับ fade + slide-in */
@keyframes fade-slide-in {
  from {
    opacity: 0;
    transform: translateX(50px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

/* อนิเมชันสำหรับ slide-out */
@keyframes slide-out {
  from {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(50px) scale(0.95);
  }
}

/* อนิเมชันสำหรับไอคอน (bounce) */
@keyframes icon-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.animate-fade-slide-in {
  animation: fade-slide-in 0.4s ease-out forwards;
}

.animate-slide-out {
  animation: slide-out 0.4s ease-in forwards;
}

.animate-icon-bounce {
  animation: icon-bounce 0.6s ease-in-out;
}
</style>
