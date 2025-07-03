<script setup>
import { useResumeStore } from "../../stores/resumeStore";
import { computed } from "vue";

const resumeStore = useResumeStore();

definePageMeta({
  layout: "student",
});

function formatDate(dateString) {
  if (!dateString) return "Present";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

const githubUsername = computed(() => {
  const url = resumeStore.student.github || "";
  return url.replace(/^https:\/\/github\.com\//, "");
});

onMounted(() => {
  resumeStore.fetchResume();
  console.log("this is pinia", resumeStore.student);
  console.log("student name:", resumeStore.student.student_name);
});

function getProficiencyColor(proficiency) {
  switch (proficiency) {
    case "advanced":
      return "bg-green-500 w-4/4";
    case "intermediate":
      return "bg-yellow-500 w-3/4";
    case "beginner":
      return "bg-red-500 w-2/4";
    default:
      return "bg-gray-300 w-1/4";
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 py-4 sm:py-8">
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div
        class="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-b-2 border-gray-800"
      ></div>
    </div>

    <div v-else-if="error" class="max-w-4xl mx-auto px-2 sm:px-4">
      <div
        class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded"
      >
        {{ error }}
      </div>
    </div>

    <!-- Resume Paper Container -->
    <div v-else class="max-w-7xl mx-auto px-1 sm:px-2 md:px-4">
      <div class="" style="min-height: 11in">
        <!-- Paper Content -->
        <div class="p-2 sm:p-4 md:p-6 lg:p-12">
          <!-- Header Section -->
          <div
            class="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-lg"
          ></div>
          <div
            class="text-center bg-white border-gray-800 pb-4 lg:pb-2 mb-2 lg:mb-4 shadow-lg rounded p-2 sm:p-4"
          >
            <div
              class="flex flex-col sm:flex-row items-center mb-3 lg:mb-4 gap-2 sm:gap-4"
            >
              <img
                v-if="resumeStore.student.student_profile_image"
                :src="resumeStore.student.student_profile_image"
                :alt="resumeStore.student.student_name"
                class="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 border-1 border-gray-300 object-cover"
              />
              <div class="text-start w-full">
                <h1
                  v-if="resumeStore.student.student_name_thai"
                  class="text-2xl sm:text-3xl font-bold text-blue-900 mb-1"
                >
                  {{ resumeStore.student.student_name_thai }}
                </h1>
                <p
                  class="text-lg sm:text-xl font-bold text-blue-900 mb-1 sm:mb-2 tracking-wide"
                >
                  {{ resumeStore.student.student_name }}
                </p>
                <p class="text-base sm:text-xl text-gray-800 mb-2 sm:mb-3">
                  {{ resumeStore.student.position || "ไม่ระบุ" }}
                </p>
                <div
                  v-if="resumeStore.student.student_email"
                  class="flex items-center text-xs sm:text-sm text-gray-900 mb-2 sm:mb-3"
                >
                  <icon
                    name="i-heroicons-envelope-solid"
                    class="w-4 h-4 mr-2"
                  />
                  {{ $t("resume_student.email") }}:
                  {{ resumeStore.student.student_email }}
                </div>
                <div
                  v-if="resumeStore.student.student_phone"
                  class="flex items-center text-xs sm:text-sm text-gray-900 mb-2 sm:mb-3"
                >
                  <icon name="i-heroicons-phone-solid" class="w-4 h-4 mr-2" />
                  {{ $t("resume_student.phone") }}:
                  {{ resumeStore.student.student_phone }}
                </div>
                <div
                  v-if="resumeStore.student.student_main_id"
                  class="flex items-center text-xs sm:text-sm text-gray-900 mb-2 sm:mb-3"
                >
                  <icon
                    name="i-heroicons-identification-solid"
                    class="w-4 h-4 mr-2"
                  />
                  {{ $t("resume_student.student_id") }}:
                  {{ resumeStore.student.student_main_id }}
                </div>
                <div
                  v-if="resumeStore.student.github"
                  class="flex items-center text-xs sm:text-sm text-gray-900 mb-2 sm:mb-3"
                >
                  <icon name="mdi:github" class="w-4 h-4 mr-2" />
                  <a
                    :href="resumeStore.student.github"
                    target="_blank"
                    class="hover:text-gray-800 underline"
                  >
                    {{ githubUsername }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Two Column Layout -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <!-- Left Column -->
            <div class="lg:col-span-1 space-y-3 sm:space-y-4 lg:space-y-6">
              <!-- Personal Information -->
              <div class="bg-white shadow-lg rounded-lg p-3 sm:p-6">
                <h2
                  class="text-base text-shadow-sm text-blue-800 lg:text-lg font-bold mb-2 lg:mb-3 pb-1 border-b border-gray-400 uppercase tracking-wide"
                >
                  {{ $t("resume_student.personal_info") }}
                </h2>
                <div
                  class="border-l-4 border-blue-600 pl-3 sm:pl-4 space-y-2 text-xs sm:text-sm"
                >
                  <div
                    v-if="resumeStore.student.nationality"
                    class="flex justify-between font-bold"
                  >
                    <span class="text-gray-600">{{
                      $t("resume_student.nationality")
                    }}</span>
                    <span class="text-gray-800 font-medium">{{
                      resumeStore.student.nationality
                    }}</span>
                  </div>
                  <div
                    v-if="resumeStore.student.ethnicity"
                    class="flex justify-between font-bold"
                  >
                    <span class="text-gray-600">{{
                      $t("resume_student.ethnicity")
                    }}</span>
                    <span class="text-gray-800 font-medium">{{
                      resumeStore.student.ethnicity
                    }}</span>
                  </div>
                  <div
                    v-if="resumeStore.student.religion"
                    class="flex justify-between font-bold"
                  >
                    <span class="text-gray-600">{{
                      $t("resume_student.religion")
                    }}</span>
                    <span class="text-gray-800 font-medium">{{
                      resumeStore.student.religion
                    }}</span>
                  </div>
                  <div
                    v-if="resumeStore.student.height"
                    class="flex justify-between font-bold"
                  >
                    <span class="text-gray-600">{{
                      $t("resume_student.height")
                    }}</span>
                    <span class="text-gray-800 font-medium"
                      >{{ resumeStore.student.height }}
                      {{ $t("resume_student.cm") }}</span
                    >
                  </div>
                  <div
                    v-if="resumeStore.student.weight"
                    class="flex justify-between font-bold"
                  >
                    <span class="text-gray-600">{{
                      $t("resume_student.weight")
                    }}</span>
                    <span class="text-gray-800 font-medium"
                      >{{ resumeStore.student.weight }}
                      {{ $t("resume_student.kg") }}</span
                    >
                  </div>
                  <div v-if="resumeStore.student.address" class="mt-3">
                    <span class="text-gray-600 block mb-1 font-bold">{{
                      $t("resume_student.address")
                    }}</span>
                    <span class="text-gray-800 text-xs leading-relaxed">{{
                      resumeStore.student.address
                    }}</span>
                  </div>
                </div>
              </div>

              <!-- Contact & Social -->
              <div
                v-if="resumeStore.student.facebook || resumeStore.student.line"
                class="bg-white shadow-lg rounded-lg p-3 sm:p-6"
              >
                <h2
                  class="text-base lg:text-lg text-shadow-sm font-bold text-green-600 mb-2 lg:mb-3 pb-1 border-b border-gray-400 uppercase tracking-wide"
                >
                  {{ $t("resume_student.social_media") }}
                </h2>
                <div
                  class="border-l-4 border-green-600 pl-3 sm:pl-4 space-y-2 text-xs sm:text-sm"
                >
                  <div
                    v-if="resumeStore.student.facebook"
                    class="flex items-center"
                  >
                    <svg
                      class="w-4 h-4 mr-2 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                      />
                    </svg>
                    <span class="text-gray-800">{{
                      resumeStore.student.facebook
                    }}</span>
                  </div>
                  <div
                    v-if="resumeStore.student.line"
                    class="flex items-center"
                  >
                    <svg
                      class="w-4 h-4 mr-2 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771z"
                      />
                    </svg>
                    <span class="text-gray-800">{{
                      resumeStore.student.line
                    }}</span>
                  </div>
                </div>
              </div>

              <!-- Hobbies & Interests -->
              <div
                v-if="resumeStore.student.hobby"
                class="bg-white shadow-lg rounded-lg p-3 sm:p-6"
              >
                <h2
                  class="text-base lg:text-lg font-bold text-yellow-500 mb-2 lg:mb-3 pb-1 border-b border-gray-400 uppercase tracking-wide"
                >
                  {{ $t("resume_student.hobbies") }}
                </h2>
                <p
                  class="border-l-4 border-yellow-500 pl-3 sm:pl-4 text-xs sm:text-sm text-gray-700 leading-relaxed"
                >
                  {{ resumeStore.student.hobby }}
                </p>
              </div>

              <!-- Technical Skills -->
              <div class="bg-white shadow-lg rounded-lg p-3 sm:p-6">
                <h2
                  class="text-base lg:text-lg font-bold text-shadow-sm text-blue-800 mb-2 lg:mb-3 pb-1 border-b border-gray-400 uppercase tracking-wide"
                >
                  {{ $t("resume_student.technical_skills") }}
                </h2>
                <div class="space-y-2">
                  <div
                    v-for="skill in resumeStore.skills"
                    :key="skill.skill_name"
                  >
                    <div class="flex justify-between items-center">
                      <span class="text-lg font-medium text-gray-700">{{
                        skill.skill_name
                      }}</span>
                      <span
                        v-if="skill.skill_type"
                        class="text-xs px-1 py-1 bg-gray-100 rounded-full text-gray-600"
                      >
                        {{ skill.skill_type || "ไม่ระบุ" }}
                      </span>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          class="h-2 rounded-full transition-all duration-300"
                          :class="getProficiencyColor(skill.skill_proficiency)"
                        ></div>
                      </div>
                      <span class="text-xs text-gray-600 min-w-fit">
                        {{ skill.skill_proficiency }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Soft Skills -->
              <div class="bg-white shadow-lg rounded-lg p-3 sm:p-6">
                <h2
                  class="text-base lg:text-lg font-bold text-shadow-sm text-violet-800 mb-2 lg:mb-3 pb-1 border-b border-gray-400 uppercase tracking-wide"
                >
                  {{ $t("resume_student.soft_skills") }}
                </h2>
                <div
                  class="border-l-4 border-violet-600 pl-3 sm:pl-4 space-y-2 lg:space-y-3"
                >
                  <div
                    v-for="softSkill in resumeStore.softSkills"
                    :key="softSkill.soft_skill_name"
                  >
                    <h3 class="text-xs sm:text-sm font-semibold text-gray-800">
                      {{ softSkill.soft_skill_name }}
                    </h3>
                    <p
                      v-if="softSkill.soft_skill_description"
                      class="text-xs text-gray-600 leading-relaxed"
                    >
                      {{ softSkill.soft_skill_description }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Education -->
              <div class="bg-white shadow-lg rounded-lg p-3 sm:p-6">
                <h2
                  class="text-base lg:text-lg font-bold text-indigo-800 mb-2 lg:mb-3 pb-1 border-b border-gray-400 uppercase tracking-wide"
                >
                  {{ $t("resume_student.education") }}
                </h2>
                <div
                  class="space-y-2 lg:space-y-3 border-l-4 border-indigo-600 pl-3 sm:pl-4"
                >
                  <div
                    v-for="edu in resumeStore.education"
                    :key="edu.education_history_institution"
                  >
                    <h3 class="text-xs sm:text-sm font-bold text-gray-900">
                      {{ edu.education_history_institution }}
                    </h3>
                    <p class="text-xs sm:text-sm text-gray-700 font-medium">
                      {{ edu.education_history_major }}
                    </p>
                    <div
                      class="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-gray-600 space-y-1 sm:space-y-0"
                    >
                      <span>{{ edu.education_history_start_year }}</span>
                      <span class="font-semibold"
                        >GPA: {{ edu.education_history_gpa }}</span
                      >
                    </div>
                    <p
                      v-if="edu.education_history_notes"
                      class="text-xs text-gray-600 italic mt-1"
                    >
                      {{ edu.education_history_notes }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div class="lg:col-span-2 space-y-3 sm:space-y-4 lg:space-y-6">
              <!-- Work Experience -->
              <div class="bg-white shadow-lg rounded-lg p-3 sm:p-6">
                <h2
                  class="text-base lg:text-lg font-bold text-blue-800 text-shadow-sm mb-3 lg:mb-4 pb-1 border-b border-gray-400 uppercase tracking-wide"
                >
                  {{ $t("resume_student.professional_experience") }}
                </h2>
                <div
                  class="border-l-4 border-blue-600 pl-3 sm:pl-4 space-y-3 lg:space-y-4"
                >
                  <div
                    v-for="work in resumeStore.workExperience"
                    :key="work.work_experience_company_name"
                  >
                    <div
                      class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 space-y-1 sm:space-y-0"
                    >
                      <div>
                        <h3
                          class="text-sm lg:text-base font-bold text-gray-900"
                        >
                          {{ work.work_experience_position }}
                        </h3>
                        <p
                          class="text-xs lg:text-sm font-semibold text-blue-700"
                        >
                          {{ work.work_experience_company_name }}
                        </p>
                      </div>
                      <span class="text-xs text-gray-600 font-medium">
                        {{ formatDate(work.work_experience_start_date) }} -
                        {{ formatDate(work.work_experience_end_date) }}
                      </span>
                    </div>
                    <p
                      class="text-xs lg:text-sm text-gray-700 mb-2 leading-relaxed"
                    >
                      {{ work.work_experience_description }}
                    </p>
                    <div
                      v-if="work.work_experience_highlight"
                      class="text-xs lg:text-sm text-gray-800 font-medium mb-2"
                    >
                      • {{ work.work_experience_highlight }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Internships -->
              <div
                v-if="resumeStore.internships?.length"
                class="bg-white shadow-lg rounded-lg p-3 sm:p-6"
              >
                <h2
                  class="text-base lg:text-lg font-bold text-shadow-sm text-orange-800 mb-3 lg:mb-4 pb-1 border-b border-gray-400 uppercase tracking-wide"
                >
                  {{ $t("resume_student.internships") }}
                </h2>
                <div
                  class="border-l-4 border-orange-800 pl-3 sm:pl-4 space-y-3 lg:space-y-4"
                >
                  <div
                    v-for="internship in resumeStore.internships"
                    :key="internship.internship_company_name"
                  >
                    <div
                      class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 space-y-1 sm:space-y-0"
                    >
                      <div>
                        <h3
                          class="text-sm lg:text-base font-bold text-gray-900"
                        >
                          {{ internship.internship_position }}
                        </h3>
                        <p
                          class="text-xs lg:text-sm font-semibold text-gray-700"
                        >
                          {{ internship.internship_company_name }}
                        </p>
                      </div>
                      <span class="text-xs text-gray-600 font-medium">
                        {{ formatDate(internship.internship_start_date) }} -
                        {{ formatDate(internship.internship_end_date) }}
                      </span>
                    </div>
                    <p class="text-xs lg:text-sm text-gray-700 leading-relaxed">
                      {{ internship.internship_description }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Projects -->
              <div class="bg-white shadow-lg rounded-lg p-3 sm:p-6">
                <h2
                  class="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 pb-1 border-b border-gray-400 uppercase tracking-wide"
                >
                  {{ $t("resume_student.projects") }}
                </h2>
                <div class="space-y-3 lg:space-y-4">
                  <div
                    v-for="project in resumeStore.projects"
                    :key="project.project_name"
                  >
                    <div
                      class="border border-gray-200 rounded-lg p-2 sm:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 space-y-1 sm:space-y-0"
                    >
                      <h3
                        class="text-sm lg:text-base font-bold text-orange-900"
                      >
                        {{ project.project_name }}
                      </h3>
                      <a
                        v-if="project.project_attachment_link"
                        :href="project.project_attachment_link"
                        target="_blank"
                        class="text-xs text-blue-600 underline hover:text-blue-800 self-start sm:self-auto hover:scale-105 transition-all duration-200 ease-in-out"
                      >
                        {{ $t("resume_student.view_project") }}
                      </a>
                    </div>
                    <p
                      class="text-xs lg:text-sm font-semibold text-gray-700 mb-1 pl-2 sm:pl-4"
                    >
                      {{ project.project_technology_used }}
                    </p>
                    <p
                      class="text-xs lg:text-sm text-gray-700 mb-2 leading-relaxed pl-2 sm:pl-4"
                    >
                      {{ project.project_description }}
                    </p>
                    <p
                      class="text-xs lg:text-sm text-blue-800 font-medium pl-2 sm:pl-4"
                    >
                      • {{ project.project_impact }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Training -->
              <div
                v-if="resumeStore.training?.length"
                class="bg-white shadow-lg rounded-lg p-3 sm:p-6"
              >
                <h2
                  class="text-base lg:text-lg font-bold text-yellow-700 mb-3 lg:mb-4 pb-1 border-b border-gray-400 uppercase tracking-wide"
                >
                  {{ $t("resume_student.training") }}
                </h2>
                <div class="space-y-2 lg:space-y-3">
                  <div
                    v-for="training in resumeStore.training"
                    :key="training.training_history_course_id"
                  >
                    <div
                      class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 space-y-1 sm:space-y-0"
                    >
                      <div>
                        <h3 class="text-xs lg:text-sm font-bold text-gray-900">
                          {{ training.training_history_course_name }}
                        </h3>
                        <p class="text-xs lg:text-sm text-gray-700">
                          {{ training.training_history_organization }}
                        </p>
                        <p class="text-xs text-gray-600">
                          {{ training.training_history_location }}
                        </p>
                      </div>
                      <span class="text-xs text-gray-600 font-medium">
                        {{ formatDate(training.training_history_date) }}
                      </span>
                    </div>
                    <div
                      v-if="training.training_history_certificate_file"
                      class="mt-1"
                    >
                      <a
                        :href="training.training_history_certificate_file"
                        target="_blank"
                        class="text-xs text-blue-600 underline hover:text-blue-800 self-start sm:self-auto hover:scale-105 transition-all duration-200 ease-in-out"
                      >
                        {{ $t("resume_student.view_certificate") }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Additional Info -->
              <div
                v-if="resumeStore.additionalInfo?.length"
                class="bg-white shadow-lg rounded-lg p-3 sm:p-6"
              >
                <h2
                  class="text-base lg:text-lg font-bold text-yellow-700 mb-3 lg:mb-4 pb-1 border-b border-gray-400 uppercase tracking-wide"
                >
                  {{ $t("resume_student.additional_info") }}
                </h2>
                <div class="space-y-2 lg:space-y-3">
                  <div
                    v-for="info in resumeStore.additionalInfo"
                    :key="info.additional_info_id"
                  >
                    <h3 class="text-xs lg:text-sm font-bold text-gray-900">
                      {{ info.additional_info_title }}
                    </h3>
                    <p class="text-xs lg:text-sm text-gray-700 leading-relaxed">
                      {{ info.additional_info_description }}
                    </p>
                    <div
                      v-if="info.additional_info_file_attachment"
                      class="mt-1"
                    >
                      <a
                        :href="info.additional_info_file_attachment"
                        target="_blank"
                        class="text-xs text-blue-600 underline hover:text-blue-800 self-start sm:self-auto hover:scale-105 transition-all duration-200 ease-in-out"
                      >
                        {{ $t("resume_student.view_file") }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Resume Status Footer -->
          <div
            class="mt-4 sm:mt-6 lg:mt-8 pt-2 sm:pt-3 lg:pt-4 border-t border-gray-300"
          >
            <div
              class="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-gray-600 space-y-2 sm:space-y-0"
            >
              <div>
                {{ $t("resume_student.status") }}
                <span class="font-semibold capitalize ml-1">
                  {{ resumeStore.resume.resume_status || "Draft" }}
                </span>
              </div>
              <div class="flex flex-col sm:flex-row sm:space-x-4">
                <span>
                  {{ $t("resume_student.submitted") }}
                  {{ formatDate(resumeStore.resume.submitted_at) }}
                </span>
                <span v-if="resumeStore.resume.approved_at">
                  {{ $t("resume_student.approved") }}
                  {{ formatDate(resumeStore.resume.approved_at) }}
                </span>
              </div>
            </div>
            <div v-if="resumeStore.resume.resume_teacher_comment" class="mt-2">
              <p class="text-xs text-gray-600">
                <span class="font-semibold">Teacher Comment:</span>
                {{ resumeStore.resume.resume_teacher_comment }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Print styles */
@media print {
  .bg-gray-100 {
    background: white !important;
  }

  .shadow-2xl {
    box-shadow: none !important;
  }

  .min-h-screen {
    min-height: auto !important;
  }

  .py-8 {
    padding: 0 !important;
  }

  .px-4 {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}
</style>
