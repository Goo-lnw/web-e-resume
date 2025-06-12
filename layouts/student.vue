<template>
  <div class="font-[Mitr]">
    <nav
      class="text-white shadow-xl fixed top-0 left-0 right-0 z-50 animate-fade-fade-down bg-white/95 backdrop-blur-sm"
    >
      <div
        class="container max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 flex justify-between items-center"
      >
        <div class="flex justify-between items-center h-14 sm:h-16 w-full">
          <!-- Logo Section -->
          <div class="flex items-center shrink-0 animate-fade-fade-down">
            <img
              src="../assets/images/Eresumem-logo-removebg.png"
              alt=""
              class="h-16 w-28 sm:h-20 sm:w-32 lg:h-24 lg:w-40 object-contain"
            />
          </div>
          <!-- Center Navigation -->
          <div
            class="hidden sm:flex items-center space-x-1 md:space-x-2 lg:space-x-3 animate-fade-fade-down"
          >
            <NuxtLink
              to=""
              class="group relative flex flex-col items-center justify-center p-2 lg:p-3 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                class="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-600 group-hover:text-blue-600 transition-colors duration-200"
              >
                <path
                  fill="currentColor"
                  d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1"
                />
              </svg>

              <!--bottom indicator -->
              <div
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-out"
              ></div>
              <!-- Tooltip -->
              <div
                class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
              >
                หน้าแรก
              </div>
            </NuxtLink>

            <NuxtLink
              to="/student"
              class="group relative flex flex-col items-center justify-center p-2 lg:p-3 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                class="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-600 group-hover:text-blue-600 transition-colors duration-200"
              >
                <path
                  fill="currentColor"
                  d="M4 13c.55 0 1-.45 1-1s-.45-1-1-1s-1 .45-1 1s.45 1 1 1m0 4c.55 0 1-.45 1-1s-.45-1-1-1s-1 .45-1 1s.45 1 1 1m0-8c.55 0 1-.45 1-1s-.45-1-1-1s-1 .45-1 1s.45 1 1 1m4 4h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1m0 4h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1M7 8c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1"
                />
              </svg>

              <!-- bottom indicator -->
              <div
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-out"
              ></div>
              <!-- Tooltip -->
              <div
                class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
                @click="isDropdownOpen(true)"
              >
                แก้ไขรายการ
              </div>
            </NuxtLink>

            <!-- Dropdown Menu -->
            <div class="relative group hidden sm:flex">
              <button
                class="flex flex-col items-center justify-center p-2 lg:p-3 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  class="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-600 group-hover:text-blue-600 transition-colors duration-200"
                >
                  <path fill="currentColor" d="M12 16l-6-6h12z" />
                </svg>
                <span
                  class="text-xs mt-1 text-gray-600 group-hover:text-blue-600"
                  >Resume Sections</span
                >
              </button>

              <div
                class="absolute top-full mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50"
              >
                <ul class="text-sm text-gray-800">
                  <li>
                    <button
                      @click="showSkillModal = true"
                      class="block px-4 py-2 w-full text-left hover:bg-slate-200 cursor-pointer"
                    >
                      Technical Skills
                    </button>
                  </li>

                  <li>
                    <button
                      @click="showSoftSkillModal = true"
                      class="block px-4 py-2 w-full text-left hover:bg-slate-200 cursor-pointer"
                    >
                      Soft Skill
                    </button>
                  </li>
                  <li>
                    <button
                      @click="showEducationModal = true"
                      class="block px-4 py-2 w-full text-left hover:bg-slate-200 cursor-pointer"
                    >
                      Education
                    </button>
                  </li>
                  <li>
                    <button
                      @click="showProjectModal = true"
                      class="block px-4 py-2 w-full text-left hover:bg-slate-200 cursor-pointer"
                    >
                      Projects
                    </button>
                  </li>
                  <li>
                    <button
                      @click = "showWorkExperienceModal = true"
                      class="block px-4 py-2 w-full text-left hover:bg-slate-200 cursor-pointer"
                      >Work Experience</button
                    >
                  </li>
                  <li>
                    <NuxtLink
                      to="/internships"
                      class="block px-4 py-2 w-full text-left hover:bg-slate-200 cursor-pointer"
                      >Internships</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      to="/training"
                      class="block px-4 py-2 w-full text-left hover:bg-slate-200 cursor-pointer"
                      >Training</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      to="/additional-info"
                      class="block px-4 py-2 w-full text-left hover:bg-slate-200 cursor-pointer"
                      >Additional Info</NuxtLink
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Mobile Navigation -->
          <div class="flex sm:hidden items-center space-x-2">
            <NuxtLink
              to=""
              class="group flex items-center justify-center p-2 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="text-gray-600 group-hover:text-blue-600 transition-colors duration-200"
              >
                <path
                  fill="currentColor"
                  d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1"
                />
              </svg>
            </NuxtLink>

            <NuxtLink
              to=""
              class="group flex items-center justify-center p-2 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="text-gray-600 group-hover:text-blue-600 transition-colors duration-200"
              >
                <path
                  fill="currentColor"
                  d="M4 13c.55 0 1-.45 1-1s-.45-1-1-1s-1 .45-1 1s.45 1 1 1m0 4c.55 0 1-.45 1-1s-.45-1-1-1s-1 .45-1 1s.45 1 1 1m0-8c.55 0 1-.45 1-1s-.45-1-1-1s-1 .45-1 1s.45 1 1 1m4 4h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1m0 4h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1M7 8c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1"
                />
              </svg>
            </NuxtLink>
            <!-- Dropdown for Mobile -->
            <div class="relative sm:hidden">
              <button
                @click="isDropdownOpen = !isDropdownOpen"
                class="flex items-center justify-center p-2 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  class="text-gray-600 group-hover:text-blue-600 transition-colors duration-200"
                >
                  <path fill="currentColor" d="M12 16l-6-6h12z" />
                </svg>
              </button>

              <div
                v-if="isDropdownOpen"
                class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50"
              >
                <ul class="text-sm text-gray-800">
                  <li>
                    <button
                      @click="showSkillModal = true"
                      class="block px-4 py-2 w-full text-left hover:bg-gray-100"
                    >
                      Technical Skills
                    </button>
                  </li>
                  <li>
                    <button
                      @click="showSoftSkillModal = true"
                      class="block px-4 py-2 w-full text-left hover:bg-gray-100"
                    >
                      Soft Skill
                    </button>
                  </li>
                  <li>
                    <button
                      @click="showEducationModal = true"
                      class="block px-4 py-2 w-full text-left hover:bg-gray-100"
                    >
                      Education
                    </button>
                  </li>
                  <li>
                    <button
                      @click="showProjectModal = true"
                      class="block px-4 py-2 w-full text-left hover:bg-gray-100"
                    >
                      Projects
                    </button>
                  </li>

                  <li>
                    <button
                      @click="showWorkExperienceModal = true"
                      class="block px-4 py-2 hover:bg-gray-100"
                      >Work Experience</button
                    >
                  </li>
                  <li>
                    <NuxtLink
                      to="/internships"
                      class="block px-4 py-2 hover:bg-gray-100"
                      >Internships</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      to="/training"
                      class="block px-4 py-2 hover:bg-gray-100"
                      >Training</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      to="/additional-info"
                      class="block px-4 py-2 hover:bg-gray-100"
                      >Additional Info</NuxtLink
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Right Side Controls -->
          <div
            class="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 animate-fade-fade-down"
          >
            <!-- Help Button -->
            <NuxtLink
              to="#"
              class="group relative flex items-center justify-center p-2 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                class="sm:w-5 sm:h-5 text-gray-900 group-hover:text-blue-600 transition-colors duration-200"
              >
                <path
                  fill="currentColor"
                  d="M11.95 18q.525 0 .888-.363t.362-.887t-.362-.888t-.888-.362t-.887.363t-.363.887t.363.888t.887.362m.05 4q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m.1-14.3q.625 0 1.088.4t.462 1q0 .55-.337.975t-.763.8q-.575.5-1.012 1.1t-.438 1.35q0 .35.263.588t.612.237q.375 0 .638-.25t.337-.625q.1-.525.45-.937t.75-.788q.575-.55.988-1.2t.412-1.45q0-1.275-1.037-2.087T12.1 6q-.95 0-1.812.4T8.975 7.625q-.175.3-.112.638t.337.512q.35.2.725.125t.625-.425q.275-.375.688-.575t.862-.2"
                />
              </svg>
              <!-- Tooltip -->
              <div
                class="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
              >
                ช่วยเหลือ
              </div>
            </NuxtLink>
            <p class="text-black">{{ resumeStore.student?.student_name }}</p>
            <!-- Profile Button -->
            <div class="group relative">
              <span
                class="flex items-center justify-center p-2 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  class="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-900 group-hover:text-blue-600 transition-colors duration-200"
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
              </span>
              <div
                class="absolute top-full mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50"
              >
                <ul class="text-sm text-gray-800">
                  <li>
                    <NuxtLink
                      to="/student/edit_profile"
                      class="block px-4 py-2 w-full text-left hover:bg-gray-100"
                    >
                      แก้ไขโปรไฟล์
                    </NuxtLink>
                  </li>

                  <li>
                    <button
                      @click.prevent="logout()"
                      class="block px-4 py-2 w-full text-left hover:bg-gray-100 cursor-pointer"
                    >
                      ออกจากระบบ
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="w-full pt-16">
      <Alert />
      <slot />
    </div>
  </div>
  <Footer />
  <SkillModal v-if="showSkillModal" @close="showSkillModal = false" />
  <SoftSkillModal
    v-if="showSoftSkillModal"
    @close="showSoftSkillModal = false"
  />
  <educationModal
    v-if="showEducationModal"
    @close="showEducationModal = false"
  />
  <projectModal v-if="showProjectModal" @close="showProjectModal = false" />
  <workExperienceModal
    v-if="showWorkExperienceModal"
    @close="showWorkExperienceModal = false"
  />
</template>
<script setup>
import { ref } from "vue";
import SkillModal from "../components/modal/skillModal.vue";
import SoftSkillModal from "../components/modal/softSkillModal.vue";
import educationModal from "../components/modal/educationModal.vue";
import projectModal from "../components/modal/projectModal.vue";
import workExperienceModal from "../components/modal/workExperienceModal.vue";

const showSkillModal = ref(false);
const showSoftSkillModal = ref(false);
const showEducationModal = ref(false);
const showProjectModal = ref(false);
const showWorkExperienceModal = ref(false);

const isDropdownOpen = ref(false);
const { $axios } = useNuxtApp();

const router = useRouter();

import { useResumeStore } from "../stores/resumeStore";
import Footer from "~/components/common/Footer.vue";
const resumeStore = useResumeStore();

async function logout() {
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
