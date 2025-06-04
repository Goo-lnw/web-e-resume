<script setup>
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
<style>
body {
  font-family: "Prompt", sans-serif;
}
.bg-gradient {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
}
.login-container {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
<template>
  <div class="">
    <div class="flex justify-between items-center p-2">
      <img
        src="../assets/images/logo-it-bru-Photoroom.png"
        alt="logo-bru"
        class="w-20"
      />
      <img src="../assets/images/bru-web-logo-en.png" alt="" class="w-35" />
    </div>
    <div class="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div class="flex w-full max-w-4xl rounded-xl overflow-hidden shadow-md">
        <div
          class="bg-gradient-to-r from-indigo-600 to-blue-500 md:block w-1/2 p-12 text-white flex flex-col justify-between"
        >
          <div class="mb-4">
            <h1 class="text-3xl font-bold mb-6">ระบบ Resume อิเล็กทรอนิกส์</h1>
            <p>
              สร้างและจัดการประวัติการทำงานผลงานประสบการณ์ทำงานต่างๆของคุณอย่างมืออาชีพ
            </p>
          </div>
          <div class="space-y-6">
            <div class="flex justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2"
                width="24"
                height="24"
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
              <p>สร้าง resume ที่น่าประทับใจ</p>
            </div>
            <div class="flex justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2"
                width="24"
                height="24"
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
              <p>สร้าง resume ที่น่าประทับใจ</p>
            </div>
            <div class="flex justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2"
                width="24"
                height="24"
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
              <p>สร้าง resume ที่น่าประทับใจ</p>
            </div>
            <div class="flex justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2"
                width="24"
                height="24"
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
              <p>สร้าง resume ที่น่าประทับใจ</p>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 bg-gray-100 p-8 md:p-12">
          <div class="mb-8">
            <h3 class="text-2xl font-semibold text-gray-800">ยินดีตอนรับ</h3>
            <p class="text-gray-600 mt-2">
              กรุณาเข้าสู่ระบบเพื่อเข้าจัดการ Resume ของนักเรียน/นักศึกษา
            </p>
          </div>
          <form action="" class="space-y-6" @submit.prevent="login">
            <div>
              <label
                class="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2"
              >
                อีเมล
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
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
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 transition duration-200"
              />
            </div>
            <div>
              <label
                class="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2"
              >
                รหัสผ่าน
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
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
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 transition duration-200"
              />
            </div>
            <button
              type="submit"
              class="flex justify-center items-center py-2.5 w-full bg-indigo-500 hover:bg-indigo-700 text-gray-100 rounded-lg shadow-md transition duration-500 ease-in-out cursor-pointer"
            >
              เข้าสู่ระบบ
              <svg
                class="w-5 h-5 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
      </div>
    </div>
  </div>
</template>
