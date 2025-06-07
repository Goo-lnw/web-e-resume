<script setup>
import { useResumeStore } from '../../stores/resumeStore'

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

onMounted(() => {
  resumeStore.fetchResume()
  console.log("this is pinia", resumeStore.student)
  console.log("student name:", resumeStore.student.student_name)
});

</script>

<template>
  <div class="min-h-screen bg-gray-200 py-8">
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div
        class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"
      ></div>
    </div>

    <div v-else-if="error" class="max-w-4xl mx-auto px-4">
      <div
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
      >
        {{ error }}
      </div>
    </div>

    <div v-else class="max-w-4xl mx-auto px-4">
      <!-- Header Section -->
      <div class="bg-white rounded-lg shadow-lg mb-6 overflow-hidden">
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6">
          <div class="flex items-center space-x-6">
            <div v-if="resumeStore.student.student_profile_image" class="flex-shrink-0">
              <img
                :src="resumeStore.student.student_profile_image"
                :alt="resumeStore.student.student_name"
                class="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
            </div>
            <div class="text-white">
              <h1 class="text-3xl font-bold mb-2">
                {{ resumeStore.student.student_name || "N/A" }}
              </h1>
              <p class="text-blue-100 text-lg mb-2">Full Stack Developer</p>
              <div class="flex flex-wrap gap-4 text-sm">
                <div v-if="resumeStore.student.student_email" class="flex items-center">
                  <svg
                    class="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                    ></path>
                    <path
                      d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                    ></path>
                  </svg>
                  {{ resumeStore.student.student_email }}
                </div>
                <div v-if="resumeStore.student.student_phone" class="flex items-center">
                  <svg
                    class="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                    ></path>
                  </svg>
                  {{ resumeStore.student.student_phone }}
                </div>
                <div v-if="resumeStore.student.student_main_id" class="flex items-center">
                  <svg
                    class="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  ID: {{ resumeStore.student.student_main_id }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Skills Section -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2
              class="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2"
            >
              Technical Skills
            </h2>
            <div class="space-y-4">
              <div
                v-for="skill in resumeStore.skills"
                :key="skill.skill_name"
                class="flex lg:flex-col items-start gap-3"
              >
                <div>
                  <div>
                    <span class="font-medium text-gray-700">{{
                      skill.skill_name
                    }}</span>
                    <span
                      class="text-xs text-gray-500 ml-2 px-2 py-1 bg-gray-100 rounded"
                    >
                      {{ skill.skill_type }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      class="h-2 rounded-full transition-all duration-300"
                      :class="{
                        'bg-green-500 w-4/5':
                          skill.skill_proficiency === 'advanced',
                        'bg-yellow-500 w-3/5':
                          skill.skill_proficiency === 'intermediate',
                        'bg-red-500 w-2/5':
                          skill.skill_proficiency === 'beginner',
                      }"
                    ></div>
                  </div>
                  <span class="text-xs text-gray-600 ml-2 capitalize">{{
                    skill.skill_proficiency
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Soft Skills Section -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2
              class="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2"
            >
              Soft Skills
            </h2>
            <div class="space-y-4">
              <div
                v-for="softSkill in resumeStore.softSkills"
                :key="softSkill.soft_skill_name"
                class="border-l-4 border-blue-500 pl-4"
              >
                <h3 class="font-medium text-gray-800 mb-2">
                  {{ softSkill.soft_skill_name }}
                </h3>
                <p class="text-sm text-gray-600">
                  {{ softSkill.soft_skill_description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Education Section -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2
              class="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2"
            >
              Education
            </h2>
            <div class="space-y-4">
              <div
                v-for="edu in resumeStore.education"
                :key="edu.education_history_institution"
                class="border-l-4 border-green-500 pl-4"
              >
                <h3 class="font-bold text-gray-800">
                  {{ edu.education_history_institution }}
                </h3>
                <p class="text-blue-600 font-medium">
                  {{ edu.education_history_major }}
                </p>
                <div class="flex justify-between items-center mt-2">
                  <span class="text-sm text-gray-600">{{
                    edu.education_history_start_year
                  }}</span>
                  <span
                    class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium"
                  >
                    GPA: {{ edu.education_history_gpa }}
                  </span>
                </div>
                <p
                  v-if="edu.education_history_notes"
                  class="text-sm text-gray-600 mt-2 italic"
                >
                  {{ edu.education_history_notes }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Projects Section -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2
              class="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2"
            >
              Projects
            </h2>
            <div class="grid gap-6">
              <div
                v-for="project in resumeStore.projects"
                :key="project.project_name"
                class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div class="flex justify-between items-start mb-3">
                  <h3 class="font-bold text-lg text-gray-800">
                    {{ project.project_name }}
                  </h3>
                  <a
                    v-if="project.project_attachment_link"
                    :href="project.project_attachment_link"
                    target="_blank"
                    class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    View Project
                  </a>
                </div>
                <p class="text-blue-600 font-medium mb-2">
                  {{ project.project_technology_used }}
                </p>
                <p class="text-gray-700 mb-2">
                  {{ project.project_description }}
                </p>
                <div class="bg-gray-50 p-3 rounded">
                  <p class="text-sm font-medium text-gray-800">Impact:</p>
                  <p class="text-sm text-gray-600">
                    {{ project.project_impact }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Work Experience Section -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2
              class="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2"
            >
              Work Experience
            </h2>
            <div class="space-y-6">
              <div
                v-for="work in resumeStore.workExperience"
                :key="work.work_experience_company_name"
                class="border-l-4 border-purple-500 pl-4"
              >
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-bold text-lg text-gray-800">
                      {{ work.work_experience_position }}
                    </h3>
                    <p class="text-purple-600 font-medium">
                      {{ work.work_experience_company_name }}
                    </p>
                  </div>
                  <span
                    class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm"
                  >
                    {{ formatDate(work.work_experience_start_date) }} -
                    {{ formatDate(work.work_experience_end_date) }}
                  </span>
                </div>
                <p class="text-gray-700 mb-2">
                  {{ work.work_experience_description }}
                </p>
                <div
                  v-if="work.work_experience_highlight"
                  class="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400"
                >
                  <p class="text-sm font-medium text-yellow-800">
                    Key Achievement:
                  </p>
                  <p class="text-sm text-yellow-700">
                    {{ work.work_experience_highlight }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Internships Section -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2
              class="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2"
            >
              Internships
            </h2>
            <div class="space-y-6">
              <div
                v-for="internship in resumeStore.internships"
                :key="internship.internship_company_name"
                class="border-l-4 border-orange-500 pl-4"
              >
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-bold text-lg text-gray-800">
                      {{ internship.internship_position }}
                    </h3>
                    <p class="text-orange-600 font-medium">
                      {{ internship.internship_company_name }}
                    </p>
                  </div>
                  <span
                    class="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm"
                  >
                    {{ formatDate(internship.internship_start_date) }} -
                    {{ formatDate(internship.internship_end_date) }}
                  </span>
                </div>
                <p class="text-gray-700 mb-2">
                  {{ internship.internship_description }}
                </p>
                <div v-if="internship.internship_related_files" class="mt-2">
                  <a
                    :href="internship.internship_related_files"
                    target="_blank"
                    class="text-blue-600 hover:text-blue-800 text-sm underline"
                  >
                    View Related Files
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2
              class="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2"
            >
              training
            </h2>
            <div class="space-y-6">
              <div
                v-for="trainings in resumeStore.training"
                :key="trainings.training_history_course_id"
                class="border-l-4 border-yellow-500 pl-4"
              >
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-bold text-lg text-gray-800">
                      {{ trainings.training_history_course_name }}
                    </h3>
                    <p class="text-yellow-600 font-medium">
                      {{ trainings.training_history_organization }}
                    </p>
                    <p class="text-yellow-600 font-medium">
                      {{ trainings.training_history_location }}
                    </p>
                  </div>
                  <span
                    class="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm"
                  >
                    {{ formatDate(trainings.training_history_date) }}
                  </span>
                </div>
                <p class="text-gray-700 mb-2">
                  {{ trainings.internship_description }}
                </p>
                <div
                  v-if="trainings.training_history_certificate_file"
                  class="mt-2"
                >
                  <a
                    :href="trainings.training_history_certificate_file"
                    target="_blank"
                    class="text-blue-600 hover:text-blue-800 text-sm underline"
                  >
                    View Certificate
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2
              class="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2"
            >
              additional Info
            </h2>
            <div class="space-y-6">
              <div
                v-for="additionalInfos in resumeStore.additionalInfo"
                :key="additionalInfos.additional_info_id"
                class="border-l-4 border-indigo-500 pl-4"
              >
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-bold text-lg text-gray-800">
                      {{ additionalInfos.additional_info_title }}
                    </h3>
                  </div>
                </div>
                <p class="text-indigo-700 mb-2">
                  {{ additionalInfos.additional_info_description }}
                </p>
                <div
                  v-if="additionalInfos.additional_info_file_attachment"
                  class="mt-2"
                >
                  <a
                    :href="additionalInfos.additional_info_file_attachment"
                    target="_blank"
                    class="text-blue-600 hover:text-blue-800 text-sm underline"
                  >
                    View file attachment
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Resume Status -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2
              class="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2"
            >
              Resume Status
            </h2>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-700">
                  <span class="font-medium">Status:</span>
                  <span
                    class="ml-2 px-3 py-1 rounded-full text-sm font-medium"
                    :class="{
                      'bg-yellow-100 text-yellow-800':
                        resumeStore.resume.resume_status === 'draft',
                      'bg-green-100 text-green-800':
                        resumeStore.resume.resume_status === 'approved',
                      'bg-blue-100 text-blue-800':
                        resumeStore.resume.resume_status === 'submitted',
                    }"
                  >
                    {{
                      resumeStore.resume.resume_status?.charAt(0).toUpperCase() +
                      resumeStore.resume.resume_status?.slice(1)
                    }}
                  </span>
                </p>
                <p class="text-gray-600 text-sm mt-1">
                  Submitted: {{ formatDate(resumeStore.resume.submitted_at) }}
                </p>
              </div>
              <div v-if="resumeStore.resume.resume_teacher_comment" class="max-w-md">
                <p class="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  <span class="font-medium">Teacher Comment:</span><br />
                  {{ resumeStore.resume.resume_teacher_comment }}
                </p>
              </div>
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
</style>
