<template>
  <div class="font-[Mitr]">
    <nav
      class="bg-blue-600 text-white shadow-md fixed top-0 left-0 right-0 z-50 animate-fade-in"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center shrink-0 animate-slide-in-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 sm:h-8 sm:w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span
              class="ml-2 text-base sm:text-lg lg:text-xl font-semibold truncate"
            >
              E-Resume
            </span>
          </div>
          <div class="flex items-center gap-2 sm:gap-4 lg:gap-6 animate-slide-in-left">
            <div
              class="text-gray-200 hover:text-white cursor-pointer text-xs sm:text-sm lg:text-base transition-all duration-200 ease-in-out hover:scale-105"
            >
              <NuxtLink to="/teacher" class="flex items-center">
                หน้าแรก
              </NuxtLink>
            </div>
            <div
              class="text-gray-200 hover:text-white cursor-pointer text-xs sm:text-sm lg:text-base transition-all duration-200 ease-in-out hover:scale-105"
            >
              <NuxtLink to="/teacher/resume_list" class="flex items-center">
                รายการ resume
              </NuxtLink>
            </div>
            <div
              class="text-gray-200 hover:text-white cursor-pointer text-xs sm:text-sm lg:text-base transition-all duration-200 ease-in-out"
            >
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span
                  class="ml-1 sm:ml-1 lg:ml-2 hover:scale-105 transition-all duration-200 ease-in-out"
                >
                  Account
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24">
      <Alert />
      <slot />
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

/* มาจากทางขวา */
@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.animate-slide-in-right {
  animation: slide-in-right 0.5s ease-out;
}
/* มาจากทางซ้าย */
@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.animate-slide-in-left {
  animation: slide-in-left 0.5s ease-out;
}
</style>
