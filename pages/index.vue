<script setup lang="ts">
definePageMeta({ layout: "login" });
const err = ref("");
const { showAlert } = useAlert();
const { $axios } = useNuxtApp();
const router = useRouter();
const formData = ref({
  email: "",
  password: "",
});
const loading = ref(false);

async function HandleLogin() {
  if (loading.value) return;
  loading.value = true;
  try {
    const response = await $axios.post("/login", formData.value);
    const { token, data } = response.data;

    if (response.status === 200 && token) {
      const tokenCookie = useCookie("token", {
        maxAge: 60 * 60 * 24 * 7,
      });
      tokenCookie.value = token;
      const role = data?.role;
      if (role === "student") {
        showAlert("เข้าสู่ระบบสำเร็จ (นักเรียน)", "success");
        navigateTo("/student", { replace: true, external: true });
      } else if (role === "teacher") {
        showAlert("เข้าสู่ระบบสำเร็จ (อาจารย์)", "success");
        navigateTo("/teacher", { replace: true, external: true });
      } else {
        showAlert("ไม่พบสิทธิ์ในการเข้าถึงระบบ", "error");
      }
    }
  } catch (error: any) {
    console.log(error.status);
    if (error.status === 401) {
      err.value = "รหัสผ่านหรือชื่อผู้ใช้ไม่ถูกต้อง";
      loading.value = false;
    }
  }
}
</script>

<template>
  <div class="font-[Mitr] justify-between items-center mt-1 md:mt-25">
    <!-- Main Content -->
    <div class="flex-grow flex justify-center items-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div
        class="flex flex-col md:flex-row w-full max-w-sm sm:max-w-md md:max-w-4xl rounded-xl overflow-hidden border border-gray-200 animate-fade-up animate-once animate-ease-linear bg-white">
        <!-- ส่วนข้อมูลด้านซ้าย -->
        <div
          class="hidden bg-gradient-to-r bg-indigo-500  w-full md:w-1/2 p-4 sm:p-6 md:p-12 text-white md:flex flex-col justify-between">
          <div class="mb-4">
            <h1 class="text-md  md:text-xl text-nowrap font-bold mb-3">
              ระบบ Resume อิเล็กทรอนิกส์
            </h1>
            <p class="text-xs sm:text-sm md:text-base">
              สร้างและจัดการประวัติการทำงานผลงานประสบการณ์ทำงานต่างๆของคุณอย่างมืออาชีพ
            </p>
          </div>
          <div class="space-y-3 sm:space-y-4 md:space-y-6">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-white"
                viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                  <path d="m9 11l3 3L22 4" />
                </g>
              </svg>
              <span class="text-sm md:text-base leading-tight">
                สร้าง resume ที่น่าประทับใจ
              </span>
            </div>
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-white"
                viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                  <path d="m9 11l3 3L22 4" />
                </g>
              </svg>
              <span class="text-sm md:text-base leading-tight">
                เพิ่มโอกาศการเข้าทำงาน
              </span>
            </div>
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-white"
                viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                  <path d="m9 11l3 3L22 4" />
                </g>
              </svg>
              <span class="text-sm md:text-base leading-tight">
                มีพื้นที่แสดงผลผลงานในระดับมืออาชีพ
              </span>
            </div>
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-white"
                viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                  <path d="m9 11l3 3L22 4" />
                </g>
              </svg>
              <span class="text-sm md:text-base leading-tight">
                แชร์ผลงานหรือโปรเจคจากในหรือนอกห้องเรียนสุดเจ๋ง
              </span>
            </div>
          </div>
        </div>

        <!-- ฟอร์  มล็อกอินด้านขวา -->
        <div class="w-full md:w-1/2 p-4 sm:p-6 md:p-12">
          <div class="mb-4 sm:mb-6 md:mb-8">
            <h3 class="text-base sm:text-lg md:text-2xl font-semibold text-gray-800">
              ยินดีต้อนรับ
            </h3>
            <p class="text-gray-600 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
              กรุณาเข้าสู่ระบบเพื่อเข้าจัดการ Resume ของนักเรียน/นักศึกษา
            </p>
          </div>

          <form @submit.prevent="HandleLogin" class="space-y-3 sm:space-y-4 md:space-y-6">
            <div>
              <label class="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1 gap-2">
                อีเมล
                <Icon name="qlementine-icons:user-16" style="width: 20px; height: 20px; color: #3b82f6"
                  class="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </label>
              <input type="email" v-model="formData.email" placeholder="youremail@gmail.com"
                class="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 transition duration-200" />
            </div>
            <div>
              <label class="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1 gap-2">
                รหัสผ่าน
                <Icon name="bi:key-fill" style="width: 20px; height: 20px; color: #3b82f6"
                  class="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </label>
              <input type="password" v-model="formData.password" placeholder="Password"
                class="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 transition duration-200" />
            </div>
            <div class="text-red-500 font-bold" v-if="err">
              {{ err }}
            </div>
            <button :disabled="loading" type="submit"
              class="flex justify-center items-center py-2 sm:py-2.5 w-full bg-indigo-500 hover:bg-indigo-700 text-gray-100 rounded-lg shadow-md transition duration-500 ease-in-out cursor-pointer"
              :class="{ 'opacity-60 cursor-not-allowed': loading }">
              เข้าสู่ระบบ

              <Icon v-if="!loading" name="si:sign-in-alt-duotone" style="width: 20px; height: 20px; padding-left: 10%"
                class="sm:w-5 sm:h-5 md:w-6 md:h-6" />

              <Icon v-if="loading" name="line-md:loading-twotone-loop"
                style="width: 20px; height: 20px; padding-left: 10%" class="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
          </form>
        </div>
        <!-- รูปภาพ student_1.png -->
        <div class="w-full md:w-1/3 relative mt-4 md:mt-0 animate-fade-up">
          <NuxtImg src="./images/student_1.png" alt="Teacher 3D"
            class="w-full max-w-[150px] sm:max-w-[200px] md:max-w-[250px] h-auto object-contain mx-auto md:absolute md:bottom-0 md:right-0" />
        </div>
      </div>
    </div>
  </div>
</template>
