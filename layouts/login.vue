<template>
  <div style="font-family: 'Mitr', sans-serif; min-height: 100vh" class="">
    <nav class="bg-blue-600 p-4 shadow-lg sticky top-0 z-10">
      <div class="flex justify-center items-center p-2  shadow-lg">
        <div class="flex justify-between items-center max-w-7xl mx-auto">
          <img
            src="../assets/images/logo-it-bru-Photoroom.png"
            alt="logo-bru"
            class="w-20"
          />
        </div>
        <NuxtLink
          to=""
          class="flex items-center px-6 py-2 rounded-lg transition duration-200 gap-2"
        >
          <span class="cursor-pointer text-gray-200 hover:text-white">ช่วยเหลือ</span>
        </NuxtLink>
        <select name="" id="" class="text-gray-200 cursor-pointer hover:text-white">
          <option value="th" class="bg-blue-600 hover:bg-blue-600 text-gray-200 cursor-pointer">ภาษาไทย</option>
          <option value="en" class="bg-blue-600 hover:bg-blue-600 text-gray-200 cursor-pointer">English</option>
        </select>
      </div>
    </nav>
    <slot />
  </div>
</template>

<script setup></script>
