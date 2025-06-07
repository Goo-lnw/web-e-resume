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
  <div class="min-h-screen bg-gray-100 py-8">
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-800"></div>
    </div>

    <div v-else-if="error" class="max-w-4xl mx-auto px-4">
      <div class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
        {{ error }}
      </div>
    </div>

    <!-- Resume Paper Container -->
    <div v-else class="max-w-4xl mx-auto px-2 sm:px-4">
      <div class="bg-white shadow-lg lg:shadow-2xl rounded-sm" style="min-height: 11in;">
        <!-- Paper Content -->
        <div class="p-4 sm:p-6 lg:p-12">
          <!-- Header Section -->
          <div class="text-center border-b-2 border-gray-800 pb-4 lg:pb-6 mb-6 lg:mb-8">
            <div class="flex justify-center mb-3 lg:mb-4">
              <img
                v-if="resumeStore.student.student_profile_image"
                :src="resumeStore.student.student_profile_image"
                :alt="resumeStore.student.student_name"
                class="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-2 border-gray-300 object-cover"
              />
            </div>
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 tracking-wide">
              {{ resumeStore.student.student_name || "N/A" }}
            </h1>
            <p class="text-lg lg:text-xl text-gray-600 mb-3 lg:mb-4">Full Stack Developer</p>
            <div class="flex flex-col sm:flex-row justify-center sm:space-x-6 lg:space-x-8 space-y-2 sm:space-y-0 text-xs sm:text-sm text-gray-700">
              <div v-if="resumeStore.student.student_email" class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                {{ resumeStore.student.student_email }}
              </div>
              <div v-if="resumeStore.student.student_phone" class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                {{ resumeStore.student.student_phone }}
              </div>
              <div v-if="resumeStore.student.student_main_id" class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                </svg>
                ID: {{ resumeStore.student.student_main_id }}
              </div>
            </div>
          </div>

          <!-- Two Column Layout -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <!-- Left Column (1/3 width on desktop, full width on mobile) -->
            <div class="lg:col-span-1 space-y-4 lg:space-y-6">
              <!-- Technical Skills -->
              <div>
                <h2 class="text-base lg:text-lg font-bold text-gray-900 mb-2 lg:mb-3 pb-1 border-b border-gray-400 uppercase tracking-wide">
                  Technical Skills
                </h2>
                <div class="space-y-2">
                  <div v-for="skill in resumeStore.skills" :key="skill.skill_name">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 space-y-1 sm:space-y-0">
                      <span class="text-xs sm:text-sm font-medium text-gray-800">{{ skill.skill_name }}</span>
                      <span class="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded self-start sm:self-auto">
                        {{ skill.skill_type }}
                      </span>
                    </div>
                    <div class="flex items-center">
                      <div class="flex-1 bg-gray-200 rounded-full h-1.5 mr-2">
                        <div
                          class="h-1.5 rounded-full bg-gray-800 transition-all duration-300"
                          :style="{
                            width: skill.skill_proficiency === 'advanced' ? '90%' :
                                   skill.skill_proficiency === 'intermediate' ? '70%' : '50%'
                          }"
                        ></div>
                      </div>
                      <span class="text-xs text-gray-600 capitalize whitespace-nowrap">{{ skill.skill_proficiency }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Soft Skills -->
              <div>
                <h2 class="text-base lg:text-lg font-bold text-gray-900 mb-2 lg:mb-3 pb-1 border-b border-gray-400 uppercase tracking-wide">
                  Soft Skills
                </h2>
                <div class="space-y-2 lg:space-y-3">
                  <div v-for="softSkill in resumeStore.softSkills" :key="softSkill.soft_skill_name">
                    <h3 class="text-xs sm:text-sm font-semibold text-gray-800">{{ softSkill.soft_skill_name }}</h3>
                    <p class="text-xs text-gray-600 leading-relaxed">{{ softSkill.soft_skill_description }}</p>
                  </div>
                </div>
              </div>

              <!-- Education -->
              <div>
                <h2 class="text-base lg:text-lg font-bold text-gray-900 mb-2 lg:mb-3 pb-1 border-b border-gray-400 uppercase tracking-wide">
                  Education
                </h2>
                <div class="space-y-2 lg:space-y-3">
                  <div v-for="edu in resumeStore.education" :key="edu.education_history_institution">
                    <h3 class="text-xs sm:text-sm font-bold text-gray-900">{{ edu.education_history_institution }}</h3>
                    <p class="text-xs sm:text-sm text-gray-700 font-medium">{{ edu.education_history_major }}</p>
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-gray-600 space-y-1 sm:space-y-0">
                      <span>{{ edu.education_history_start_year }}</span>
                      <span class="font-semibold">GPA: {{ edu.education_history_gpa }}</span>
                    </div>
                    <p v-if="edu.education_history_notes" class="text-xs text-gray-600 italic mt-1">
                      {{ edu.education_history_notes }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column (2/3 width on desktop, full width on mobile) -->
            <div class="lg:col-span-2 space-y-4 lg:space-y-6">
              <!-- Work Experience -->
              <div>
                <h2 class="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 pb-1 border-b border-gray-400 uppercase tracking-wide">
                  Professional Experience
                </h2>
                <div class="space-y-3 lg:space-y-4">
                  <div v-for="work in resumeStore.workExperience" :key="work.work_experience_company_name">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 space-y-1 sm:space-y-0">
                      <div>
                        <h3 class="text-sm lg:text-base font-bold text-gray-900">{{ work.work_experience_position }}</h3>
                        <p class="text-xs lg:text-sm font-semibold text-gray-700">{{ work.work_experience_company_name }}</p>
                      </div>
                      <span class="text-xs text-gray-600 font-medium">
                        {{ formatDate(work.work_experience_start_date) }} - {{ formatDate(work.work_experience_end_date) }}
                      </span>
                    </div>
                    <p class="text-xs lg:text-sm text-gray-700 mb-2 leading-relaxed">{{ work.work_experience_description }}</p>
                    <div v-if="work.work_experience_highlight" class="text-xs lg:text-sm text-gray-800 font-medium mb-2">
                      • {{ work.work_experience_highlight }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Internships -->
              <div v-if="resumeStore.internships?.length">
                <h2 class="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 pb-1 border-b border-gray-400 uppercase tracking-wide">
                  Internships
                </h2>
                <div class="space-y-3 lg:space-y-4">
                  <div v-for="internship in resumeStore.internships" :key="internship.internship_company_name">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 space-y-1 sm:space-y-0">
                      <div>
                        <h3 class="text-sm lg:text-base font-bold text-gray-900">{{ internship.internship_position }}</h3>
                        <p class="text-xs lg:text-sm font-semibold text-gray-700">{{ internship.internship_company_name }}</p>
                      </div>
                      <span class="text-xs text-gray-600 font-medium">
                        {{ formatDate(internship.internship_start_date) }} - {{ formatDate(internship.internship_end_date) }}
                      </span>
                    </div>
                    <p class="text-xs lg:text-sm text-gray-700 leading-relaxed">{{ internship.internship_description }}</p>
                  </div>
                </div>
              </div>

              <!-- Projects -->
              <div>
                <h2 class="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 pb-1 border-b border-gray-400 uppercase tracking-wide">
                  Key Projects
                </h2>
                <div class="space-y-3 lg:space-y-4">
                  <div v-for="project in resumeStore.projects" :key="project.project_name">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 space-y-1 sm:space-y-0">
                      <h3 class="text-sm lg:text-base font-bold text-gray-900">{{ project.project_name }}</h3>
                      <a
                        v-if="project.project_attachment_link"
                        :href="project.project_attachment_link"
                        target="_blank"
                        class="text-xs text-gray-600 underline hover:text-gray-800 self-start sm:self-auto"
                      >
                        View Project
                      </a>
                    </div>
                    <p class="text-xs lg:text-sm font-semibold text-gray-700 mb-1">{{ project.project_technology_used }}</p>
                    <p class="text-xs lg:text-sm text-gray-700 mb-2 leading-relaxed">{{ project.project_description }}</p>
                    <p class="text-xs lg:text-sm text-gray-800 font-medium">• {{ project.project_impact }}</p>
                  </div>
                </div>
              </div>

              <!-- Training -->
              <div v-if="resumeStore.training?.length">
                <h2 class="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 pb-1 border-b border-gray-400 uppercase tracking-wide">
                  Training & Certifications
                </h2>
                <div class="space-y-2 lg:space-y-3">
                  <div v-for="training in resumeStore.training" :key="training.training_history_course_id">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 space-y-1 sm:space-y-0">
                      <div>
                        <h3 class="text-xs lg:text-sm font-bold text-gray-900">{{ training.training_history_course_name }}</h3>
                        <p class="text-xs lg:text-sm text-gray-700">{{ training.training_history_organization }}</p>
                        <p class="text-xs text-gray-600">{{ training.training_history_location }}</p>
                      </div>
                      <span class="text-xs text-gray-600 font-medium">
                        {{ formatDate(training.training_history_date) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Additional Info -->
              <div v-if="resumeStore.additionalInfo?.length">
                <h2 class="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 pb-1 border-b border-gray-400 uppercase tracking-wide">
                  Additional Information
                </h2>
                <div class="space-y-2 lg:space-y-3">
                  <div v-for="info in resumeStore.additionalInfo" :key="info.additional_info_id">
                    <h3 class="text-xs lg:text-sm font-bold text-gray-900">{{ info.additional_info_title }}</h3>
                    <p class="text-xs lg:text-sm text-gray-700 leading-relaxed">{{ info.additional_info_description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Resume Status Footer -->
          <div class="mt-6 lg:mt-8 pt-3 lg:pt-4 border-t border-gray-300">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-gray-600 space-y-2 sm:space-y-0">
              <div>
                Status: 
                <span class="font-semibold capitalize ml-1">
                  {{ resumeStore.resume.resume_status || 'Draft' }}
                </span>
              </div>
              <div>
                Submitted: {{ formatDate(resumeStore.resume.submitted_at) }}
              </div>
            </div>
            <div v-if="resumeStore.resume.resume_teacher_comment" class="mt-2">
              <p class="text-xs text-gray-600">
                <span class="font-semibold">Teacher Comment:</span> {{ resumeStore.resume.resume_teacher_comment }}
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
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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