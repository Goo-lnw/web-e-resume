<script setup>
definePageMeta({
  layout: "teacher",
});

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const { showAlert } = useAlert();

const route = useRoute();
const id = route?.params?.id;
const resume = ref({});
const loading = ref(false);
const error = ref(null);
const { $axios } = useNuxtApp();

const formComment = ref({
  resume_teacher_comment: "",
  resume_status: "",
});

async function fetchResume() {
  loading.value = true;
  error.value = null;
  try {
    const res = await $axios.get(`/resume/${id}`);
    resume.value = res.data;
    console.log("Fetched resume data:", resume.value);

    // Pre-populate form if there's existing comment
    if (resume.value.resume?.resume_teacher_comment) {
      formComment.value.resume_teacher_comment =
        resume.value.resume.resume_teacher_comment;
      formComment.value.resume_status =
        resume.value.resume.resume_status?.toString() || "";
    }
  } catch (err) {
    console.error("Error fetching resume:", err);
    error.value = "Failed to load resume data";
  } finally {
    loading.value = false;
  }
}

async function updateComment() {
  try {
    console.log("Updating comment:", formComment.value);

    const res = await $axios.put(`/resume/${id}/edit`, {
      resume_teacher_comment: formComment.value.resume_teacher_comment,
      resume_status: parseInt(formComment.value.resume_status),
    });

    if (res.status === 200) {
      await fetchResume();
      showAlert("ยินยันพร้อมแสดงความคิดเห็นเรียบร้อย!", "success");
    }
  } catch (err) {
    console.error("Error updating comment:", err);
    showAlert("เกิดข้อผิดพลาด ลองใหม่อีกครั้ง", "error");
  }
}

// Format date function
function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Get status badge class
function getStatusBadge(status) {
  switch (status) {
    case "draft":
      return "bg-gray-500 text-white";
    case "submitted":
      return "bg-blue-500 text-white";
    case "approved":
      return "bg-green-500 text-white";
    case "rejected":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}

// Get proficiency color
function getProficiencyColor(proficiency) {
  switch (proficiency) {
    case "advanced":
      return "bg-green-500 w-4/5";
    case "intermediate":
      return "bg-yellow-500 w-3/5";
    case "beginner":
      return "bg-red-500 w-2/5";
    default:
      return "bg-gray-300 w-1/5";
  }
}

function viewCertificate(training) {
  const name = btoa(
    encodeURIComponent(resume.value.student?.student_name || "Unknown")
  );
  const file = btoa(
    encodeURIComponent(training.training_history_certificate_file)
  );
  window.open(`/teacher/resume_list/cerdetail/${name}?file=${file}`, "_blank");
}

onMounted(() => {
  fetchResume();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div
        class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"
      ></div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex justify-center items-center min-h-screen"
    >
      <div
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
      >
        {{ $t("resume_detail.err") }}
      </div>
    </div>

    <!-- Resume Content -->
    <div v-else class="max-w-7xl mx-auto p-6 space-y-8">
      <!-- Header with gradient -->
      <div
        class="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-lg"
      ></div>

      <!-- Student Profile Section -->
      <div class="bg-white shadow-lg rounded-lg p-6">
        <div
          class="flex flex-col md:flex-row items-center md:items-start gap-6"
        >
          <div
            class="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center"
          >
            <NuxtImg
              v-if="resume.student?.student_profile_image"
              :src="resume.student.student_profile_image"
              :alt="`${resume.student?.student_name} Profile`"
              class="w-full h-full object-cover"
            />
            <span v-else class="text-white text-2xl font-bold">
              {{ resume.student?.student_name?.charAt(0) || "U" }}
            </span>
          </div>

          <div class="flex-1 text-center md:text-left">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">
              {{ resume.student?.student_name || $t("resume_detail.na") }}
            </h1>
            <p class="text-gray-600 mb-2">
              {{ $t("resume_detail.id") }}
              {{ resume.student?.student_main_id || $t("resume_detail.na") }}
            </p>

            <!-- Resume Status -->
            <div class="mb-4">
              <span
                class="px-3 py-1 rounded-full text-sm font-medium"
                :class="getStatusBadge(resume.resume?.resume_status)"
              >
                {{
                  resume.resume?.resume_status?.toUpperCase() ||
                  $t("resume_detail.unknown")
                }}
              </span>
              <div class="text-sm text-gray-500 mt-2">
                <p>
                  {{ $t("resume_detail.submitted") }}:
                  {{ formatDate(resume.resume?.submitted_at) }}
                </p>
                <p v-if="resume.resume?.approved_at">
                  {{ $t("resume_detail.approved") }}:
                  {{ formatDate(resume.resume?.approved_at) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Contact Information -->
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2
              class="text-xl font-semibold mb-4 text-blue-600 flex items-center gap-2"
            >
              📧 {{ $t("resume_detail.contact_info") }}
            </h2>
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <span class="text-blue-500">📧</span>
                <span class="text-gray-700">
                  {{ resume.student?.student_email || $t("resume_detail.na") }}
                </span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-blue-500">📞</span>
                <span class="text-gray-700">
                  {{ resume.student?.student_phone || $t("resume_detail.na") }}
                </span>
              </div>
            </div>
          </div>

          <!-- Skills -->
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2
              class="text-xl font-semibold mb-4 text-blue-600 flex items-center gap-2"
            >
              💻 {{ $t("resume_detail.skills") }}
            </h2>
            <div class="space-y-4">
              <div
                v-for="(skill, index) in resume.skills?.filter(
                  (s) => s.skill_name
                )"
                :key="index"
                class="space-y-2"
              >
                <div class="flex justify-between items-center">
                  <span class="font-medium text-gray-700">{{
                    skill.skill_name
                  }}</span>
                  <span
                    class="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
                  >
                    {{ skill.skill_type }}
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      class="h-2 rounded-full transition-all duration-300"
                      :class="getProficiencyColor(skill.skill_proficiency)"
                    ></div>
                  </div>
                  <span class="text-xs text-gray-600 capitalize min-w-fit">
                    {{ skill.skill_proficiency }}
                  </span>
                </div>
              </div>
              <p
                v-if="!resume.skills?.some((s) => s.skill_name)"
                class="text-gray-500 italic"
              >
                {{ $t("resume_detail.no_skills") }}
              </p>
            </div>
          </div>

          <!-- Soft Skills -->
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2
              class="text-xl font-semibold mb-4 text-purple-600 flex items-center gap-2"
            >
              🧠 {{ $t("resume_detail.soft_skills") }}
            </h2>
            <div class="space-y-3">
              <div
                v-for="(softSkill, index) in resume.softSkills?.filter(
                  (s) => s.soft_skill_name
                )"
                :key="index"
              >
                <h4 class="font-medium text-gray-700 mb-1">
                  {{ softSkill.soft_skill_name }}
                </h4>
                <p class="text-sm text-gray-600">
                  {{ softSkill.soft_skill_description }}
                </p>
              </div>
              <p
                v-if="!resume.softSkills?.some((s) => s.soft_skill_name)"
                class="text-gray-500 italic"
              >
                {{ $t("resume_detail.no_soft_skills") }}
              </p>
            </div>
          </div>

          <!-- Additional Information -->
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2
              class="text-xl font-semibold mb-4 text-indigo-600 flex items-center gap-2"
            >
              📎 {{ $t("resume_detail.additional_info") }}
            </h2>
            <div class="space-y-3">
              <div
                v-for="(info, index) in resume.additionalInfo?.filter(
                  (i) => i.additional_info_title
                )"
                :key="index"
              >
                <h4 class="font-medium text-gray-700">
                  {{ info.additional_info_title }}
                </h4>
                <p class="text-sm text-gray-600 mb-2">
                  {{ info.additional_info_description }}
                </p>
                <a
                  v-if="info.additional_info_file_attachment"
                  :href="info.additional_info_file_attachment"
                  target="_blank"
                  class="text-blue-500 hover:text-blue-700 text-sm underline"
                >
                  {{ $t("resume_detail.view_attachment") }}
                </a>
              </div>
              <p
                v-if="
                  !resume.additionalInfo?.some((i) => i.additional_info_title)
                "
                class="text-gray-500 italic"
              >
                {{ $t("resume_detail.no_additional_info") }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Work Experience -->
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2
              class="text-xl font-semibold mb-4 text-orange-600 flex items-center gap-2"
            >
              💼 {{ $t("resume_detail.work_experience") }}
            </h2>
            <div class="space-y-4">
              <div
                v-for="(work, index) in resume.workExperience?.filter(
                  (w) => w.work_experience_company_name
                )"
                :key="index"
                class="border-l-4 border-orange-400 pl-4 py-2"
              >
                <div
                  class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2"
                >
                  <h3 class="font-semibold text-gray-800">
                    {{ work.work_experience_position }}
                  </h3>
                  <span class="text-sm text-gray-500">
                    {{ formatDate(work.work_experience_start_date) }} -
                    {{ formatDate(work.work_experience_end_date) }}
                  </span>
                </div>
                <p class="font-medium text-gray-700 mb-1">
                  {{ work.work_experience_company_name }}
                </p>
                <p class="text-gray-600 mb-2">
                  {{ work.work_experience_description }}
                </p>
                <p
                  v-if="work.work_experience_highlight"
                  class="text-sm text-green-600 font-medium"
                >
                  🏆 {{ work.work_experience_highlight }}
                </p>
              </div>
              <p
                v-if="
                  !resume.workExperience?.some(
                    (w) => w.work_experience_company_name
                  )
                "
                class="text-gray-500 italic"
              >
                {{ $t("resume_detail.no_work_experience") }}
              </p>
            </div>
          </div>

          <!-- Projects -->
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2
              class="text-xl font-semibold mb-4 text-green-600 flex items-center gap-2"
            >
              🚀 {{ $t("resume_detail.projects") }}
            </h2>
            <div class="grid gap-4">
              <div
                v-for="(project, index) in resume.projects?.filter(
                  (p) => p.project_name
                )"
                :key="index"
                class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div
                  class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2"
                >
                  <h3 class="font-semibold text-gray-800">
                    {{ project.project_name }}
                  </h3>
                  <a
                    v-if="project.project_attachment_link"
                    :href="project.project_attachment_link"
                    target="_blank"
                    class="text-blue-500 hover:text-blue-700 text-sm underline"
                  >
                    {{ $t("resume_detail.view_project") }}
                  </a>
                </div>
                <p class="text-sm text-blue-600 mb-2">
                  {{ project.project_technology_used }}
                </p>
                <p class="text-gray-600 mb-2">
                  {{ project.project_description }}
                </p>
                <p v-if="project.project_impact" class="text-sm text-green-600">
                  {{ $t("resume_detail.impact") }}: {{ project.project_impact }}
                </p>
              </div>
              <p
                v-if="!resume.projects?.some((p) => p.project_name)"
                class="text-gray-500 italic"
              >
                {{ $t("resume_detail.no_projects") }}
              </p>
            </div>
          </div>

          <!-- Education -->
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2
              class="text-xl font-semibold mb-4 text-indigo-600 flex items-center gap-2"
            >
              🎓 {{ $t("resume_detail.education") }}
            </h2>
            <div class="space-y-4">
              <div
                v-for="(edu, index) in resume.education?.filter(
                  (e) => e.education_history_institution
                )"
                :key="index"
                class="border-l-4 border-indigo-400 pl-4 py-2"
              >
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <h3 class="font-semibold text-gray-800">
                      {{ edu.education_history_institution }}
                    </h3>
                    <p class="text-gray-600">
                      {{ edu.education_history_major }}
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-gray-500">
                      {{ edu.education_history_start_year }}
                    </p>
                    <p class="font-medium text-green-600">
                      {{ $t("resume_detail.gpa") }}:
                      {{ edu.education_history_gpa }}
                    </p>
                  </div>
                </div>
                <p
                  v-if="edu.education_history_notes"
                  class="text-sm text-gray-600 mt-2"
                >
                  {{ edu.education_history_notes }}
                </p>
              </div>
              <p
                v-if="
                  !resume.education?.some(
                    (e) => e.education_history_institution
                  )
                "
                class="text-gray-500 italic"
              >
                {{ $t("resume_detail.no_education") }}
              </p>
            </div>
          </div>

          <!-- Training -->
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2
              class="text-xl font-semibold mb-4 text-purple-600 flex items-center gap-2"
            >
              📚 {{ $t("resume_detail.training") }}
            </h2>
            <div class="space-y-4">
              <div
                v-for="(training, index) in resume.training?.filter(
                  (t) => t.training_history_course_name
                )"
                :key="index"
                class="border border-gray-200 rounded-lg p-4"
              >
                <div class="flex justify-between items-start mb-2">
                  <h3 class="font-semibold text-gray-800">
                    {{ training.training_history_course_name }}
                  </h3>
                  <span class="text-sm text-gray-500">
                    {{ formatDate(training.training_history_date) }}
                  </span>
                </div>
                <p class="text-gray-600 mb-1">
                  {{ training.training_history_organization }}
                </p>
                <p class="text-sm text-gray-500 mb-2">
                  📍 {{ training.training_history_location }}
                </p>
                <button
                  v-if="training.training_history_certificate_file"
                  @click="viewCertificate(training)"
                  class="text-blue-500 hover:text-blue-700 text-sm underline"
                  style="
                    background: none;
                    border: none;
                    padding: 0;
                    cursor: pointer;
                  "
                >
                  {{ $t("resume_detail.view_certificate") }}
                </button>
              </div>
              <p
                v-if="
                  !resume.training?.some((t) => t.training_history_course_name)
                "
                class="text-gray-500 italic"
              >
                {{ $t("resume_detail.no_training") }}
              </p>
            </div>
          </div>

          <!-- Internships -->
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2
              class="text-xl font-semibold mb-4 text-teal-600 flex items-center gap-2"
            >
              🏢 {{ $t("resume_detail.internships") }}
            </h2>
            <div class="space-y-4">
              <div
                v-for="(internship, index) in resume.internships?.filter(
                  (i) => i.internship_company_name
                )"
                :key="index"
                class="border-l-4 border-teal-400 pl-4 py-2"
              >
                <div
                  class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2"
                >
                  <div>
                    <h3 class="font-semibold text-gray-800">
                      {{ internship.internship_position }}
                    </h3>
                    <p class="font-medium text-gray-700">
                      {{ internship.internship_company_name }}
                    </p>
                  </div>
                  <span class="text-sm text-gray-500">
                    {{ formatDate(internship.internship_start_date) }} -
                    {{ formatDate(internship.internship_end_date) }}
                  </span>
                </div>
                <p class="text-gray-600 mb-2">
                  {{ internship.internship_description }}
                </p>
                <a
                  v-if="internship.internship_related_files"
                  :href="internship.internship_related_files"
                  target="_blank"
                  class="text-blue-500 hover:text-blue-700 text-sm underline"
                >
                  {{ $t("resume_detail.view_related_files") }}
                </a>
              </div>
              <p
                v-if="
                  !resume.internships?.some((i) => i.internship_company_name)
                "
                class="text-gray-500 italic"
              >
                {{ $t("resume_detail.no_internships") }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Teacher Comment Section -->
      <div class="bg-white shadow-lg rounded-lg p-6">
        <h2
          class="text-xl font-semibold mb-4 text-red-600 flex items-center gap-2"
        >
          📝 {{ $t("resume_detail.teacher_evaluation") }}
        </h2>

        <!-- Existing Teacher Comment Display -->
        <div
          v-if="resume.resume?.resume_teacher_comment"
          class="mb-4 p-4 bg-gray-50 rounded-lg"
        >
          <h3 class="font-medium text-gray-700 mb-2">
            {{ $t("resume_detail.current_comment") }}
          </h3>
          <p class="text-gray-600">
            {{ resume.resume.resume_teacher_comment }}
          </p>
        </div>

        <!-- Comment Form -->
        <form @submit.prevent="updateComment" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t("resume_detail.teacher_comment") }}
            </label>
            <textarea
              v-model="formComment.resume_teacher_comment"
              rows="4"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
              :placeholder="$t('resume_detail.comment_placeholder')"
            ></textarea>
          </div>

          <div
            class="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <div class="flex gap-6">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  v-model="formComment.resume_status"
                  type="radio"
                  value="3"
                  class="w-4 h-4 text-green-600 focus:ring-green-500"
                />
                <svg
                  class="w-6 h-6 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="text-gray-700 font-medium">
                  {{ $t("resume_detail.approve") }}
                </span>
              </label>

              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  v-model="formComment.resume_status"
                  type="radio"
                  value="4"
                  class="w-4 h-4 text-red-600 focus:ring-red-500"
                />
                <svg
                  class="w-6 h-6 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                <span class="text-gray-700 font-medium">
                  {{ $t("resume_detail.reject") }}
                </span>
              </label>
            </div>

            <button
              type="submit"
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
            >
              {{ $t("resume_detail.save_evaluation") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Hover effects */
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
