<script setup>
definePageMeta({
  layout: "login",
});
const toast = useToast();
const { $axios } = useNuxtApp();
const router = useRouter();

const formData = ref({
  email: "",
  password: "",
});

async function login() {
  try {
    const response = await $axios.post("/login", formData.value);
    console.log(response.data);
    if (response.status === 200) {
      const token = response.data.token;
      const tokenCookie = useCookie("token");
      tokenCookie.value = token;

      const role = response.data.data.role;
      //   console.log(response.data.data);

      if (role === "student") {
        router.push("/student");
      } else if (role === "teacher") {
        router.push("/teacher");
      }
    }
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <div class="font-[Mitr] min-h-screen bg-gray-100 flex flex-col">
    <!-- Main Content -->
    <div
      class="flex-grow flex justify-center items-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
    >
      <div
        class="flex flex-col md:flex-row w-full max-w-sm sm:max-w-md md:max-w-4xl rounded-xl overflow-hidden shadow-xl/30 animate-fade-up animate-once animate-ease-linear bg-white"
      >
        <!-- ส่วนข้อมูลด้านซ้าย -->
        <div
          class="bg-gradient-to-r from-indigo-600 to-blue-500 w-full md:w-1/2 p-4 sm:p-6 md:p-12 text-white flex flex-col justify-between"
        >
          <div class="mb-4">
            <h1
              class="text-lg sm:text-xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-6"
            >
              ระบบ Resume อิเล็กทรอนิกส์
            </h1>
            <p class="text-xs sm:text-sm md:text-base">
              สร้างและจัดการประวัติการทำงานผลงานประสบการณ์ทำงานต่างๆของคุณอย่างมืออาชีพ
            </p>
          </div>
          <div class="space-y-3 sm:space-y-4 md:space-y-6">
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                  <path d="m9 11l3 3L22 4" />
                </g>
              </svg>
              <p class="text-xs sm:text-sm md:text-base">
                สร้าง resume ที่น่าประทับใจ
              </p>
            </div>
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                  <path d="m9 11l3 3L22 4" />
                </g>
              </svg>
              <p class="text-xs sm:text-sm md:text-base">
                เพิ่มโอกาศการเข้าทำงาน
              </p>
            </div>
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                  <path d="m9 11l3 3L22 4" />
                </g>
              </svg>
              <p class="text-xs sm:text-sm md:text-base">
                มีพื้นที่แสดงผลผลงานในระดับมืออาชีพ
              </p>
            </div>
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                  <path d="m9 11l3 3L22 4" />
                </g>
              </svg>
              <p class="text-xs sm:text-sm md:text-base">
                แชร์ผลงานหรือโปรเจคจากในหรือนอกห้องเรียนสุดเจ๋ง
              </p>
            </div>
          </div>
        </div>

        <!-- ฟอร์มล็อกอินด้านขวา -->
        <div class="w-full md:w-1/2 p-4 sm:p-6 md:p-12">
          <div class="mb-4 sm:mb-6 md:mb-8">
            <h3
              class="text-base sm:text-lg md:text-2xl font-semibold text-gray-800"
            >
              ยินดีต้อนรับ
            </h3>
            <p
              class="text-gray-600 text-xs sm:text-sm md:text-base mt-1 sm:mt-2"
            >
              กรุณาเข้าสู่ระบบเพื่อเข้าจัดการ Resume ของนักเรียน/นักศึกษา
            </p>
          </div>
          <form
            action=""
            class="space-y-3 sm:space-y-4 md:space-y-6"
            @submit.prevent="login"
          >
            <div>
              <label
                class="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1 gap-2"
              >
                อีเมล
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="none"
                    d="M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0M20.5 12.5A4.5 4.5 0 1 1 16 8a4.5 4.5 0 0 1 4.5 4.5"
                  />
                  <path
                    fill="currentColor"
                    d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.9 13.9 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3q.418.457.87.87q.14.124.28.242q.48.415.99.782c.044.03.084.069.128.1v-.012a13.9 13.9 0 0 0 16 0v.012c.044-.031.083-.07.128-.1q.51-.368.99-.782q.14-.119.28-.242q.451-.413.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24ZM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0"
                  />
                </svg>
              </label>
              <input
                type="email"
                v-model="formData.email"
                placeholder="youremail@gmail.com"
                class="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 transition duration-200"
              />
            </div>
            <div>
              <label
                class="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1 gap-2"
              >
                รหัสผ่าน
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M7 15q1.25 0 2.125-.875T10 12t-.875-2.125T7 9t-2.125.875T4 12t.875 2.125T7 15m0 3q-2.5 0-4.25-1.75T1 12t1.75-4.25T7 6q2.025 0 3.538 1.15T12.65 10h8.375L23 11.975l-3.5 4L17 14l-2 2l-2-2h-.35q-.625 1.8-2.175 2.9T7 18"
                  />
                </svg>
              </label>
              <input
                type="password"
                v-model="formData.password"
                placeholder="Password"
                class="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 transition duration-200"
              />
            </div>
            <button
              type="submit"
              class="flex justify-center items-center py-2 sm:py-2.5 w-full bg-indigo-500 hover:bg-indigo-700 text-gray-100 rounded-lg shadow-md transition duration-500 ease-in-out cursor-pointer"
            >
              เข้าสู่ระบบ
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12h8m-4 4l4-4l-4-4" />
                </g>
              </svg>
            </button>
          </form>
        </div>
        <!-- รูปภาพ student_1.png -->
        <div class="w-full md:w-1/3 relative mt-4 md:mt-0 animate-fade-up">
          <img
            src="../assets/images/student_1.png"
            alt="Teacher 3D"
            class="w-full max-w-[150px] sm:max-w-[200px] md:max-w-[250px] h-auto object-contain mx-auto md:absolute md:bottom-0 md:right-0"
          />
        </div>
      </div>
    </div>
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
