<template>
  <nav
    class="animate-fade-down border-b border-gray-200 sticky top-0 z-10 min-h-16"
  >
    <div
      class="container mx-auto px-4 flex justify-between items-center flex-wrap md:flex-nowrap"
    >
      <!-- โลโก้ -->
      <div class="flex items-center gap-4 flex-shrink-0">
        <NuxtLink to="/" class="flex items-center">
          <NuxtImg
            src="./images/logo-it-bru-Photoroom.png"
            alt="logo-bru"
            class="h-12 animate-fade-down"
          />
        </NuxtLink>
        <NuxtImg
          src="./images/Eresumem-logo-removebg.png"
          alt="logo-eresume"
          class="h-18 w-28 animate-fade-down"
        />
      </div>
      <LanguageChange />
    </div>
  </nav>
  <div style="font-family: 'Mitr', sans-serif" class="md:mt-[-50px]">
    <slot />
  </div>
</template>
<script setup></script>

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
