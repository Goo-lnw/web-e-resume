<template>
  <div class="font-[Mitr]">
    <nav
      class="text-white shadow-sm fixed top-0 left-0 right-0 z-50 animate-fade-fade-down bg-white/95 backdrop-blur-sm"
    >
      <div class="flex justify-center gap-2 items-center w-full">
        <!-- Logo Section -->
        <div class="flex items-center shrink-0 animate-fade-fade-down">
          <NuxtImg
            src="./images/Eresumem-logo-removebg.png"
            alt=""
            class="h-16 w-25 object-contain"
          />
        </div>
        <!-- Center Navigation -->
        <div
          class="hidden sm:flex items-center space-x-1 md:space-x-2 lg:space-x-3 animate-fade-fade-down"
        >
          <NuxtLink
            to="/student"
            class="group relative flex flex-col items-center justify-center p-2 lg:p-3 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
          >
            <Icon
              name="mdi:home"
              style="height: 24px; width: 24px"
              class="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-600 group-hover:text-blue-600 transition-colors duration-200"
            />

            <!-- <svg
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
              </svg> -->

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

          <!-- Dropdown Menu -->
          <div class="relative group hidden sm:flex">
            <button
              class="flex flex-col items-center justify-center p-2 lg:p-3 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
            >
              <Icon
                name="ri:add-fill"
                style="height: 24px; width: 24px"
                class="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-600 group-hover:text-blue-600 transition-colors duration-200"
              />
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
                    @click="showWorkExperienceModal = true"
                    class="block px-4 py-2 w-full text-left hover:bg-slate-200 cursor-pointer"
                  >
                    Work Experience
                  </button>
                </li>
                <li>
                  <button
                    @click="showInternshipModal = true"
                    class="block px-4 py-2 w-full text-left hover:bg-slate-200 cursor-pointer"
                  >
                    Internships
                  </button>
                </li>
                <li>
                  <button
                    @click="showTrainingModal = true"
                    class="block px-4 py-2 w-full text-left hover:bg-slate-200 cursor-pointer"
                  >
                    Training
                  </button>
                </li>
                <li>
                  <button
                    @click="showAdditionalInfoModal = true"
                    class="block px-4 py-2 w-full text-left hover:bg-slate-200 cursor-pointer"
                  >
                    Additional Info
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="flex sm:hidden items-center">
          <NuxtLink
            to="/student"
            class="group flex items-center justify-center p-2 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200"
          >
            <Icon
              name="mdi:home"
              style="height: 24px; width: 24px"
              class="text-gray-600 group-hover:text-blue-600 transition-colors duration-200"
            />
          </NuxtLink>

          <!-- Dropdown for Mobile -->
          <div class="relative sm:hidden">
            <button
              @click="isDropdownOpen = !isDropdownOpen"
              class="flex items-center justify-center p-2 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200"
            >
              <Icon
                name="ri:add-fill"
                style="height: 24px; width: 24px"
                class="text-gray-600 group-hover:text-blue-600 transition-colors duration-200"
              />
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
                    class="block px-4 py-2 w-full text-left hover:bg-slate-200 cursor-pointer"
                  >
                    Work Experience
                  </button>
                </li>
                <li>
                  <button
                    @click="showInternshipModal = true"
                    class="block px-4 py-2 w-full text-left hover:bg-slate-200 cursor-pointer"
                  >
                    Internships
                  </button>
                </li>
                <li>
                  <button
                    @click="showTrainingModal = true"
                    class="block px-4 py-2 w-full text-left hover:bg-slate-200 cursor-pointer"
                  >
                    Training
                  </button>
                </li>
                <li>
                  <button
                    @click="showAdditionalInfoModal = true"
                    class="block px-4 py-2 w-full text-left hover:bg-slate-200 cursor-pointer"
                  >
                    Additional Info
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Right Side Controls -->
        <!-- Desktop Profile Dropdown -->
        <div
          class="hidden sm:flex items-center space-x-1 sm:space-x-2 lg:space-x-3 animate-fade-fade-down"
        >
          <!-- Profile Button -->
          <div class="group relative">
            <span
              class="flex items-center justify-center p-2 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
            >
              <Icon
                name="mdi:account-reactivate"
                style="height: 20px; width: 20px"
                class="text-gray-600 group-hover:text-blue-600 transition-colors duration-200"
              />
            </span>

            <div
              class="absolute top-full mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50"
            >
              <ul class="text-sm text-gray-800">
                <li>
                  <NuxtLink
                    to="/student/edit_profile"
                    class="block px-4 py-2 w-full text-left hover:bg-gray-200"
                  >
                    แก้ไขโปรไฟล์
                  </NuxtLink>
                </li>

                <li>
                  <button
                    @click.prevent="logout()"
                    class="block px-4 py-2 w-full text-left hover:bg-gray-200 cursor-pointer"
                  >
                    ออกจากระบบ
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Mobile Profile Dropdown -->
        <div class="flex sm:hidden items-center">
          <div class="relative">
            <button
              @click="isProfileDropdownOpen = !isProfileDropdownOpen"
              class="flex items-center justify-center p-2 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200"
            >
              <Icon
                name="mdi:account-reactivate"
                style="height: 20px; width: 20px"
                class="text-gray-600 group-hover:text-blue-600 transition-colors duration-200"
              />
            </button>
            <div
              v-if="isProfileDropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50"
            >
              <ul class="text-sm text-gray-800">
                <li>
                  <NuxtLink
                    to="/student/edit_profile"
                    class="block px-4 py-2 w-full text-left hover:bg-gray-200"
                    @click="isProfileDropdownOpen = false"
                  >
                    แก้ไขโปรไฟล์
                  </NuxtLink>
                </li>
                <li>
                  <button
                    @click.prevent="
                      logout();
                      isProfileDropdownOpen = false;
                    "
                    class="block px-4 py-2 w-full text-left hover:bg-gray-200 cursor-pointer"
                  >
                    ออกจากระบบ
                  </button>
                </li>
              </ul>
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
  <internshipModal
    v-if="showInternshipModal"
    @close="showInternshipModal = false"
  />
  <trainingModal v-if="showTrainingModal" @close="showTrainingModal = false" />
  <additionalInfoModal
    v-if="showAdditionalInfoModal"
    @close="showAdditionalInfoModal = false"
  />
</template>
<script setup>
import { ref } from "vue";
import SkillModal from "../components/modal/skillModal.vue";
import SoftSkillModal from "../components/modal/softSkillModal.vue";
import educationModal from "../components/modal/educationModal.vue";
import projectModal from "../components/modal/projectModal.vue";
import workExperienceModal from "../components/modal/workExperienceModal.vue";
import internshipModal from "../components/modal/internshipModal.vue";
import trainingModal from "../components/modal/trainingModal.vue";
import additionalInfoModal from "../components/modal/additionalInfoModal.vue";
import { onMounted, onBeforeUnmount } from "vue";
const isDesktopDropdownOpen = ref(false);

const isProfileDropdownOpen = ref(false);
const showSkillModal = ref(false);
const showSoftSkillModal = ref(false);
const showEducationModal = ref(false);
const showProjectModal = ref(false);
const showWorkExperienceModal = ref(false);
const showInternshipModal = ref(false);
const showTrainingModal = ref(false);
const showAdditionalInfoModal = ref(false);
const isDropdownOpen = ref(false);
const { $axios } = useNuxtApp();
const router = useRouter();
import { useResumeStore } from "../stores/resumeStore";
import Footer from "~/components/common/Footer.vue";
const resumeStore = useResumeStore();


onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleOutsideClick);
});

function handleOutsideClick(event) {
  const dropdown = document.getElementById("desktop-dropdown");
  if (dropdown && !dropdown.contains(event.target)) {
    isDesktopDropdownOpen.value = false;
  }
}

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
