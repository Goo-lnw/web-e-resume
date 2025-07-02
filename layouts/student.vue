<template>
  <div class="font-[Mitr]">
    <nav
  class="text-white shadow-sm fixed top-0 left-0 right-0 z-50 animate-fade-fade-down bg-white/95 backdrop-blur-sm"
>
  <div class="flex justify-center gap-2 items-center w-full">
    <!-- Logo -->
    <NuxtImg
      src="./images/Eresumem-logo-removebg.png"
      alt=""
      class="h-16 w-25 object-contain"
    />

    <!-- Home Button -->
    <NuxtLink
      to="/student"
      class="group relative flex flex-col items-center justify-center p-2 lg:p-3 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
    >
      <Icon
        name="mdi:home"
        style="height: 24px; width: 24px"
        class="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-600 group-hover:text-blue-600 transition-colors duration-200"
      />
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

    <!-- Add Section Dropdown -->
    <div class="group relative flex flex-col items-center justify-center">
      <button 
        @click="isDesktopDropdownOpen = !isDesktopDropdownOpen"
        class="flex flex-col items-center justify-center p-2 lg:p-3 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
      >
        <Icon
          name="uil:comment-plus"
          style="height: 24px; width: 24px"
          class="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-600 group-hover:text-blue-600 transition-colors duration-200"
        />
        <div
          class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-out"
        ></div>
        <!-- Tooltip -->
        <div
          class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
        >
          เพิ่มข้อมูล
        </div>
      </button>

      <!-- Dropdown Menu -->
      <div
        v-if="isDesktopDropdownOpen"
        class="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-md z-50 border border-gray-200 min-w-48"
      >
        <ul class="text-sm text-gray-800 py-1">
          <li>
            <button
              @click="showSkillModal = true; isDesktopDropdownOpen = false"
              class="block px-4 py-2 w-full text-left hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            >
              Technical Skills
            </button>
          </li>
          <li>
            <button
              @click="showSoftSkillModal = true; isDesktopDropdownOpen = false"
              class="block px-4 py-2 w-full text-left hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            >
              Soft Skill
            </button>
          </li>
          <li>
            <button
              @click="showEducationModal = true; isDesktopDropdownOpen = false"
              class="block px-4 py-2 w-full text-left hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            >
              Education
            </button>
          </li>
          <li>
            <button
              @click="showProjectModal = true; isDesktopDropdownOpen = false"
              class="block px-4 py-2 w-full text-left hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            >
              Projects
            </button>
          </li>
          <li>
            <button
              @click="showWorkExperienceModal = true; isDesktopDropdownOpen = false"
              class="block px-4 py-2 w-full text-left hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            >
              Work Experience
            </button>
          </li>
          <li>
            <button
              @click="showInternshipModal = true; isDesktopDropdownOpen = false"
              class="block px-4 py-2 w-full text-left hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            >
              Internships
            </button>
          </li>
          <li>
            <button
              @click="showTrainingModal = true; isDesktopDropdownOpen = false"
              class="block px-4 py-2 w-full text-left hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            >
              Training
            </button>
          </li>
          <li>
            <button
              @click="showAdditionalInfoModal = true; isDesktopDropdownOpen = false"
              class="block px-4 py-2 w-full text-left hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            >
              Additional Info
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Profile Dropdown -->
    <div class="group relative flex flex-col items-center justify-center">
      <button
        @click="isProfileDropdownOpen = !isProfileDropdownOpen"
        class="flex flex-col items-center justify-center p-2 lg:p-3 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
      >
        <Icon
          name="mdi:account-reactivate"
          style="height: 24px; width: 24px"
          class="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-600 group-hover:text-blue-600 transition-colors duration-200"
        />
        <div
          class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-out"
        ></div>
        <!-- Tooltip -->
        <div
          class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
        >
          โปรไฟล์
        </div>
      </button>

      <!-- Profile Dropdown Menu -->
      <div
        v-if="isProfileDropdownOpen"
        class="absolute top-12 right-0 bg-white shadow-lg rounded-md z-50 border border-gray-200 min-w-48"
      >
        <ul class="text-sm text-gray-800 py-1">
          <li>
            <NuxtLink
              to="/student/edit_profile"
              class="block px-4 py-2 w-full text-left hover:bg-gray-100 transition-colors duration-200"
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
              class="block px-4 py-2 w-full text-left hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            >
              ออกจากระบบ
            </button>
          </li>
        </ul>
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
const { $axios } = useNuxtApp();
const router = useRouter();
import { useResumeStore } from "../stores/resumeStore";
import Footer from "~/components/common/Footer.vue";

import { watch } from "vue";

watch(isDesktopDropdownOpen, (desktopOpen) => {
  if (desktopOpen) {
    isProfileDropdownOpen.value = false;
  }
});

watch(isProfileDropdownOpen, (profileOpen) => {
  if (profileOpen) {
    isDesktopDropdownOpen.value = false;
  }
});

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
