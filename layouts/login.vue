<template>
  <div style="font-family: 'Mitr', sans-serif; min-height: 100vh">
    <nav
      class="animate-fade-down bg-blue-600 shadow-lg sticky top-0 z-10 min-h-16"
    >
      <div
        class="container mx-auto px-4 flex justify-between items-center flex-wrap md:flex-nowrap"
      >
        <!-- โลโก้ -->
        <div class="flex items-center gap-4 flex-shrink-0">
          <NuxtLink to="/" class="flex items-center">
            <img
              src="@/assets/images/logo-it-bru-Photoroom.png"
              alt="logo-bru"
              class="h-12 animate-fade-down"
            />
          </NuxtLink>
          <img
            src="@/assets/images/Eresumem-logo-removebg.png"
            alt="logo-eresume"
            class="h-18 w-28 filter brightness-0 invert animate-fade-down"
          />
        </div>
        <!-- เมนู -->
        <div
          class="flex flex-wrap gap-4 items-center justify-end w-full md:w-auto mt-2 md:mt-0 animate-slide-in-right"
        >
          <NuxtLink
            to="/"
            class="text-gray-200 hover:text-white hover:scale-105 transition-all duration-200 ease-in-out"
          >
            ช่วยเหลือ
          </NuxtLink>
          <!-- เพิ่มเมนูอื่น ๆ ที่คุณมีตรงนี้ -->
          <NuxtLink
            to="/"
            class="text-gray-200 hover:text-white hover:scale-105 transition-all duration-200 ease-in-out"
          >
            เกี่ยวกับเรา
          </NuxtLink>
          <NuxtLink
            to="/"
            class="text-gray-200 hover:text-white hover:scale-105 transition-all duration-200 ease-in-out"
          >
            ติดต่อเรา
          </NuxtLink>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>
<script setup>
</script>

<!-- <style scoped>
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

<style scoped>
/* อนิเมชันสำหรับ fade-down*/
@keyframes fade-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-down {
  animation: fade-down 1.5s;
}
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

/* มาจากทางขวา */
@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.animate-slide-in-right {
  animation: slide-in-right 0.5s ease-out;
}
</style> -->
