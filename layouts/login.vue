<template>
  <div style="font-family: 'Mitr', sans-serif; min-height: 100vh" class="">
    <nav class="bg-blue-600 p-4 shadow-lg sticky top-0 z-10">
      <div class="flex justify-between items-center p-2 w-full">
        <div class="flex justify-center items-center space-x-4">
          <NuxtLink to="/">
            <img
              src="~/assets/images/logo-it-bru-Photoroom.png"
              alt="logo-bru"
              class="animate-fade-up w-20"
            />
          </NuxtLink>

          <!-- ลิงก์และตัวเลือก -->
        </div>
        <div class="hidden md:flex items-center space-x-4">
          <NuxtLink to="/" class="text-white hover:text-gray-200">
            ช่วยเหลือ</NuxtLink
          >
          <select
            class="text-white border-none rounded px-2 py-1 cursor-pointer"
          >
            <option value="th" class="cursor-pointer bg-blue-500 text-gray-200">ไทย</option>
            <option value="en" class="cursor-pointer bg-blue-500 text-gray-200">English</option>
          </select>
        </div>
      </div>
      <!-- เมนู dropdown สำหรับหน้าจอเล็ก -->
      <div class="md:hidden p-4 mt-2 rounded-b-lg">
        <div>
          <NuxtLink
            class="block text-gray-200 hover:text-white py-2 cursor-pointer pl-3"
            >ช่วยเหลือ</NuxtLink
          >
        </div>
        <div class="relative">
          <select
            class="w-full text-gray-200 hover:text-white rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-400/50 focus:outline-none transition duration-200 appearance-none cursor-pointer hover:bg-indigo-800"
          >
            <option value="th" class="bg-blue-500 text-gray-200">
              ภาษาไทย
            </option>
            <option value="en" class="bg-blue-500 text-gray-200">
              English
            </option>
          </select>
          <!-- ไอคอนลูกศร -->
          <div
            class="absolute inset-y-0 right-2 flex items-center pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>

<script setup></script>

<style scoped>
/* อนิเมชันสำหรับ fade-up */
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fade-up 1.5s;
}
</style>

<script setup></script>

<style scoped>
/* อนิเมชันสำหรับ fade-up */
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fade-up 1.5s;
}
</style>
