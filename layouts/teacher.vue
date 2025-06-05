<template>
  <div class="font-[Mitr]">
    <nav
      class="text-white shadow-xl fixed top-0 left-0 right-0 z-50 animate-fade-fade-down"
    >
      <div
        class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center"
      >
        <div class="flex justify-between items-center h-16 w-full">
          <div class="flex items-center shrink-0 animate-slide-in-right 0">
            <img
              src="../assets/images/Eresumem-logo-removebg.png"
              alt=""
              class="h-24 w-40"
            />
          </div>
         
          <div
            class="flex mt-2 text-gray-200 hover:text-white cursor-pointer text-xs sm:text-sm lg:text-base animate-fade-fade-down"
          >
            <NuxtLink
              to="/teacher"
              class="group flex flex-col items-center justify-center p-2 mt-7 rounded w-24 transition text-gray-500 hover:text-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                class="transition-all duration-200 ease-in-out hover:scale-135 mt-7"
              >
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 19v-8.5a1 1 0 0 0-.4-.8l-7-5.25a1 1 0 0 0-1.2 0l-7 5.25a1 1 0 0 0-.4.8V19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1"
                />
              </svg>
              <!-- Tooltip -->
              <div
                class="flex justify-center items-center h-full mt-1 px-2 py-1 text-gray-800 text-sm rounded opacity-0 group-hover:opacity-100 transition duration-200"
              >
                หน้าแรก
              </div>
            </NuxtLink>

            <NuxtLink
              to="/teacher/resume_list"
              class="group flex flex-col items-center justify-center p-2 rounded w-24 transition mt-7 text-gray-500 hover:text-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="-2 -2 24 24"
                class="transition-all duration-200 ease-in-out hover:scale-135 mt-7"
              >
                <path
                  fill="currentColor"
                  d="M6 0h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6m6 9a1 1 0 0 0 0 2h3a1 1 0 1 0 0-2zm-2 4a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2zm0-8a1 1 0 1 0 0 2h5a1 1 0 0 0 0-2zm-4.172 5.243l-.707-.707a1 1 0 1 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.415 0l2.828-2.828A1 1 0 0 0 7.95 8.12l-2.122 2.122z"
                />
              </svg>
              <!-- Tooltip -->
              <div
                class="flex justify-center items-center h-full mt-1 px-2 py-1 text-gray-800 text-sm rounded opacity-0 group-hover:opacity-100 transition duration-200"
              >
                รายการ
              </div>
            </NuxtLink>
          </div>
          <div
            class="text-gray-200 hover:text-white cursor-pointer text-xs sm:text-sm lg:text-base transition-all duration-200 ease-in-ou animate-slide-in-left"
          >
            <div class="flex items-center">
              <NuxtLink
                to="#"
                class="group flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 hover:scale-105 transition-all duration-200 ease-in-out mt-12"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  class=""
                >
                  <path
                    fill="currentColor"
                    d="M11.95 18q.525 0 .888-.363t.362-.887t-.362-.888t-.888-.362t-.887.363t-.363.887t.363.888t.887.362m.05 4q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m.1-14.3q.625 0 1.088.4t.462 1q0 .55-.337.975t-.763.8q-.575.5-1.012 1.1t-.438 1.35q0 .35.263.588t.612.237q.375 0 .638-.25t.337-.625q.1-.525.45-.937t.75-.788q.575-.55.988-1.2t.412-1.45q0-1.275-1.037-2.087T12.1 6q-.95 0-1.812.4T8.975 7.625q-.175.3-.112.638t.337.512q.35.2.725.125t.625-.425q.275-.375.688-.575t.862-.2"
                  />
                </svg>
                <!-- Tooltip -->
                <div
                  class="flex justify-center items-center justify-centerh-full mt-6 px-2 py-1 text-gray-800 text-sm rounded opacity-0 group-hover:opacity-100 transition duration-200"
                >
                  ช่วยเหลือ
                </div>
              </NuxtLink>
              <div class="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  class="text-gray-500"
                >
                  <path
                    fill="currentColor"
                    d="M21.056 12h-2a1 1 0 0 0 0 2v2H17.87a3 3 0 0 0 .185-1a3 3 0 0 0-5.598-1.5a1 1 0 1 0 1.732 1a1 1 0 0 1 .866-.5a1 1 0 0 1 0 2a1 1 0 0 0 0 2a1 1 0 1 1 0 2a1 1 0 0 1-.866-.5a1 1 0 1 0-1.732 1a3 3 0 0 0 5.598-1.5a3 3 0 0 0-.185-1h1.185v3a1 1 0 0 0 2 0v-7a1 1 0 1 0 0-2m-11.97-.757a1 1 0 1 0 1.94-.486l-1.757-7.03a2.28 2.28 0 0 0-4.425 0l-1.758 7.03a1 1 0 1 0 1.94.486L5.585 9h2.94ZM6.086 7l.697-2.787a.292.292 0 0 1 .546 0L8.026 7Zm7.97 0h1a1 1 0 0 1 1 1v1a1 1 0 0 0 2 0V8a3.003 3.003 0 0 0-3-3h-1a1 1 0 0 0 0 2m-4 9h-1a1 1 0 0 1-1-1v-1a1 1 0 0 0-2 0v1a3.003 3.003 0 0 0 3 3h1a1 1 0 0 0 0-2"
                  />
                </svg>
                <select
                  class="text-gray-500 border-none rounded px-2 py-1 cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out"
                >
                  <option
                    value="th"
                    class="cursor-pointer text-gray-500"
                  >
                    ไทย
                  </option>
                  <option
                    value="en"
                    class="cursor-pointer text-gray-500"
                  >
                    English
                  </option>
                </select>
              </div>
              <span
                class="group flex flex-col items-center justify-center ml-1 sm:ml-1 lg:ml-2 hover:scale-105 transition-all duration-200 ease-in-out mt-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="38"
                  viewBox="0 0 32 32"
                  class="text-gray-500 hover:text-blue-600"
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
                <!-- Tooltip -->
                <div
                  class="flex justify-center items-center h-full mt-4 px-2 py-1 text-gray-800 text-sm rounded opacity-0 group-hover:opacity-100 transition duration-200"
                >
                  โปรไฟล์
                </div>
              </span>
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
</style>
