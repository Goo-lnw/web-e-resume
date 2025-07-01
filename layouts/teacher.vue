<template>
  <div class="font-[Mitr]">

    <!-- ----modal -->
      <!-- <div class="bg-red-500 p-2 w-full justify-end flex">
        <dialog :open="confirm" class="rounded-lg shadow-lg p-6 bg-white animate-fade-in" @close="confirm = false">
          <form method="dialog" class="flex flex-col items-center space-y-4" @submit.prevent>
            <div class="text-lg font-semibold text-gray-800">ยืนยันการออกจากระบบ</div>
            <div class="text-gray-600">คุณต้องการออกจากระบบหรือไม่?</div>
            <div class="flex space-x-4 mt-2">
              <button type="button" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                @click="logout(true)">
                ออกจากระบบ
              </button>
              <button type="button" class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                @click="confirm = false">
                ยกเลิก
              </button>
            </div>
          </form>
        </dialog>
      </div> -->
    <!--  -->

    <nav
      class="text-white shadow-xl fixed top-0 left-0 right-0 z-50 animate-fade-fade-down bg-white/95 backdrop-blur-sm">
      <div class="container max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 flex justify-between items-center">
        <div class="flex justify-between items-center h-14 sm:h-16 w-full">
          <!-- Logo Section -->
          <div class="flex items-center shrink-0 animate-fade-fade-down">
            <img src="../assets/images/Eresumem-logo-removebg.png" alt=""
              class="h-16 w-28 sm:h-20 sm:w-32 lg:h-24 lg:w-40 object-contain" />
          </div>

          <!-- Center Navigation -->
          <div class="hidden sm:flex items-center space-x-1 md:space-x-2 lg:space-x-3 animate-fade-fade-down">

            <NuxtLink to="/teacher"
              class="group relative flex flex-col items-center justify-center p-2 lg:p-3 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200">
              <Icon name="mdi:home" style="height: 24px; width: 24px;"
                class="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />

              <div
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-out">
              </div>
              <!-- Tooltip -->
              <div
                class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                หน้าแรก
              </div>
            </NuxtLink>

            <NuxtLink to="/teacher/resume_list"
              class="group relative flex flex-col items-center justify-center p-2 lg:p-3 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200">
              <Icon name="ic:round-list" style="height: 26px; width: 26px;"
                class="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />


              <div
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-out">
              </div>
              <!-- Tooltip -->
              <div
                class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                รายการ
              </div>
            </NuxtLink>
          </div>

          <!-- Mobile Navigation -->
          <div class="flex sm:hidden items-center space-x-2">
            <NuxtLink to="/teacher"
              class="group flex items-center justify-center p-2 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200">
              <Icon name="mdi:home" style="height: 24px; width: 24px;"
                class="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />

            </NuxtLink>

            <NuxtLink to="/teacher/resume_list"
              class="group flex items-center justify-center p-2 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200">
              <Icon name="ic:round-list" style="height: 26px; width: 26px;"
                class="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />

            </NuxtLink>
          </div>

          <!-- Right Side Controls -->
          <div class="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 animate-fade-fade-down">
            <!-- Profile Button -->
            <div class="group relative" @click.prevent="Hendlelogout()""
            > 
              <span
                class=" flex items-center justify-center p-2 rounded-full transition-all duration-200 ease-in-out
              hover:bg-gray-100 active:bg-gray-200 cursor-pointer">
              <Icon name="majesticons:logout-line" style="height: 26px; width: 26px;"
                class="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-600 group-hover:text-red-600 transition-colors duration-200" />

              </span>
              <!-- Tooltip -->
              <div
                class="absolute -bottom-9 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                ออกจากระบบ
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="container mx-auto px-2 sm:px-4 lg:px-8 pt-16 sm:pt-20">
      <Alert />
      <slot />
    </div>
  </div>



  <Footer />

</template>
<style scoped>
/* อนิเมชันสำหรับ fade-down */
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

.animate-fade-fade-down {
  animation: fade-down 1.5s;
}

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

/* Custom scrollbar for select dropdown */
select::-webkit-scrollbar {
  width: 4px;
}

select::-webkit-scrollbar-track {
  background: #f1f1f1;
}

select::-webkit-scrollbar-thumb {
  background: #888;
}

select::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

<script setup>
import Footer from '~/components/common/Footer.vue';

const { $axios } = useNuxtApp();
const confirm = ref(false)
const router = useRouter();




async function logout(action) {
  confirm.value = true

  if (action == true) {
    await Hendlelogout();
  } else {
    return null;
  }
}

async function Hendlelogout() {
  try {
    // Remove token from cookie
    const tokenCookie = useCookie("token");
    tokenCookie.value = null;

    // Remove token from localStorage if exists
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }

    // Optionally call logout API
    await $axios.post("/logout"); // Uncomment if you want to notify backend

    // Redirect to home page
    router.push("/");
  } catch (err) {
    console.log(err);
  }

}
</script>
