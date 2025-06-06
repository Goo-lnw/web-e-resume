<script setup>
definePageMeta({
  layout: "teacher",
});

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

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
    console.log('Fetched resume data:', resume.value);
    
    // Pre-populate form if there's existing comment
    if (resume.value.resume?.resume_teacher_comment) {
      formComment.value.resume_teacher_comment = resume.value.resume.resume_teacher_comment;
      formComment.value.resume_status = resume.value.resume.resume_status?.toString() || "";
    }
  } catch (err) {
    console.error('Error fetching resume:', err);
    error.value = "Failed to load resume data";
  } finally {
    loading.value = false;
  }
}

async function updateComment() {
  try {
    console.log('Updating comment:', formComment.value);
    
    const res = await $axios.put(`/resume/${id}/edit`, {
      resume_teacher_comment: formComment.value.resume_teacher_comment,
      resume_status: parseInt(formComment.value.resume_status),
    });
    
    if (res.status === 200) {
      await fetchResume();
      alert('Comment updated successfully!');
    }
  } catch (err) {
    console.error('Error updating comment:', err);
    alert('Failed to update comment');
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
  switch(status) {
    case 'draft': return 'bg-gray-500 text-white';
    case 'submitted': return 'bg-blue-500 text-white';
    case 'approved': return 'bg-green-500 text-white';
    case 'rejected': return 'bg-red-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
}

// Get proficiency color
function getProficiencyColor(proficiency) {
  switch(proficiency) {
    case 'advanced': return 'bg-green-500 w-4/5';
    case 'intermediate': return 'bg-yellow-500 w-3/5';
    case 'beginner': return 'bg-red-500 w-2/5';
    default: return 'bg-gray-300 w-1/5';
  }
}

onMounted(() => {
  fetchResume();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex justify-center items-center min-h-screen">
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {{ error }}
      </div>
    </div>

    <!-- Resume Content -->
    <div v-else class="max-w-7xl mx-auto p-6 space-y-8">
      <!-- Header with gradient -->
      <div class="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-lg"></div>
      
      <!-- Student Profile Section -->
      <div class="bg-white shadow-lg rounded-lg p-6">
        <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div class="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
            <NuxtImg
              v-if="resume.student?.student_profile_image"
              :src="resume.student.student_profile_image"
              :alt="`${resume.student?.student_name} Profile`"
              class="w-full h-full object-cover"
            />
            <span v-else class="text-white text-2xl font-bold">
              {{ resume.student?.student_name?.charAt(0) || 'U' }}
            </span>
          </div>
          
          <div class="flex-1 text-center md:text-left">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">
              {{ resume.student?.student_name || 'N/A' }}
            </h1>
            <p class="text-gray-600 mb-2">ID: {{ resume.student?.student_main_id || 'N/A' }}</p>
            
            <!-- Resume Status -->
            <div class="mb-4">
              <span class="px-3 py-1 rounded-full text-sm font-medium" 
                    :class="getStatusBadge(resume.resume?.resume_status)">
                {{ resume.resume?.resume_status?.toUpperCase() || 'UNKNOWN' }}
              </span>
              <div class="text-sm text-gray-500 mt-2">
                <p>Submitted: {{ formatDate(resume.resume?.submitted_at) }}</p>
                <p v-if="resume.resume?.approved_at">Approved: {{ formatDate(resume.resume?.approved_at) }}</p>
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
            <h2 class="text-xl font-semibold mb-4 text-blue-600 flex items-center gap-2">
              📧 Contact Information
            </h2>
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <span class="text-blue-500">📧</span>
                <span class="text-gray-700">{{ resume.student?.student_email || 'N/A' }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-blue-500">📞</span>
                <span class="text-gray-700">{{ resume.student?.student_phone || 'N/A' }}</span>
              </div>
            </div>
          </div>

          <!-- Skills -->
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-4 text-blue-600 flex items-center gap-2">
              💻 Technical Skills
            </h2>
            <div class="space-y-4">
              <div v-for="(skill, index) in resume.skills?.filter(s => s.skill_name)" :key="index" 
                   class="space-y-2">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-gray-700">{{ skill.skill_name }}</span>
                  <span class="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                    {{ skill.skill_type }}
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="flex-1 bg-gray-200 rounded-full h-2">
                    <div class="h-2 rounded-full transition-all duration-300"
                         :class="getProficiencyColor(skill.skill_proficiency)">
                    </div>
                  </div>
                  <span class="text-xs text-gray-600 capitalize min-w-fit">
                    {{ skill.skill_proficiency }}
                  </span>
                </div>
              </div>
              <p v-if="!resume.skills?.some(s => s.skill_name)" class="text-gray-500 italic">
                No skills listed
              </p>
            </div>
          </div>

          <!-- Soft Skills -->
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-4 text-purple-600 flex items-center gap-2">
              🧠 Soft Skills
            </h2>
            <div class="space-y-3">
              <div v-for="(softSkill, index) in resume.softSkills?.filter(s => s.soft_skill_name)" :key="index">
                <h4 class="font-medium text-gray-700 mb-1">{{ softSkill.soft_skill_name }}</h4>
                <p class="text-sm text-gray-600">{{ softSkill.soft_skill_description }}</p>
              </div>
              <p v-if="!resume.softSkills?.some(s => s.soft_skill_name)" class="text-gray-500 italic">
                No soft skills listed
              </p>
            </div>
          </div>

          <!-- Additional Information -->
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-4 text-indigo-600 flex items-center gap-2">
              📎 Additional Information
            </h2>
            <div class="space-y-3">
              <div v-for="(info, index) in resume.additionalInfo?.filter(i => i.additional_info_title)" :key="index">
                <h4 class="font-medium text-gray-700">{{ info.additional_info_title }}</h4>
                <p class="text-sm text-gray-600 mb-2">{{ info.additional_info_description }}</p>
                <a v-if="info.additional_info_file_attachment" 
                   :href="info.additional_info_file_attachment" 
                   target="_blank"
                   class="text-blue-500 hover:text-blue-700 text-sm underline">
                  View Attachment
                </a>
              </div>
              <p v-if="!resume.additionalInfo?.some(i => i.additional_info_title)" class="text-gray-500 italic">
                No additional information
              </p>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Work Experience -->
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-4 text-orange-600 flex items-center gap-2">
              💼 Work Experience
            </h2>
            <div class="space-y-4">
              <div v-for="(work, index) in resume.workExperience?.filter(w => w.work_experience_company_name)" :key="index"
                   class="border-l-4 border-orange-400 pl-4 py-2">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <h3 class="font-semibold text-gray-800">{{ work.work_experience_position }}</h3>
                  <span class="text-sm text-gray-500">
                    {{ formatDate(work.work_experience_start_date) }} - {{ formatDate(work.work_experience_end_date) }}
                  </span>
                </div>
                <p class="font-medium text-gray-700 mb-1">{{ work.work_experience_company_name }}</p>
                <p class="text-gray-600 mb-2">{{ work.work_experience_description }}</p>
                <p v-if="work.work_experience_highlight" class="text-sm text-green-600 font-medium">
                  🏆 {{ work.work_experience_highlight }}
                </p>
              </div>
              <p v-if="!resume.workExperience?.some(w => w.work_experience_company_name)" class="text-gray-500 italic">
                No work experience listed
              </p>
            </div>
          </div>

          <!-- Projects -->
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-4 text-green-600 flex items-center gap-2">
              🚀 Projects
            </h2>
            <div class="grid gap-4">
              <div v-for="(project, index) in resume.projects?.filter(p => p.project_name)" :key="index"
                   class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <h3 class="font-semibold text-gray-800">{{ project.project_name }}</h3>
                  <a v-if="project.project_attachment_link" 
                     :href="project.project_attachment_link" 
                     target="_blank"
                     class="text-blue-500 hover:text-blue-700 text-sm underline">
                    View Project
                  </a>
                </div>
                <p class="text-sm text-blue-600 mb-2">{{ project.project_technology_used }}</p>
                <p class="text-gray-600 mb-2">{{ project.project_description }}</p>
                <p v-if="project.project_impact" class="text-sm text-green-600">
                  Impact: {{ project.project_impact }}
                </p>
              </div>
              <p v-if="!resume.projects?.some(p => p.project_name)" class="text-gray-500 italic">
                No projects listed
              </p>
            </div>
          </div>

          <!-- Education -->
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-4 text-indigo-600 flex items-center gap-2">
              🎓 Education
            </h2>
            <div class="space-y-4">
              <div v-for="(edu, index) in resume.education?.filter(e => e.education_history_institution)" :key="index"
                   class="border-l-4 border-indigo-400 pl-4 py-2">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <h3 class="font-semibold text-gray-800">{{ edu.education_history_institution }}</h3>
                    <p class="text-gray-600">{{ edu.education_history_major }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-gray-500">{{ edu.education_history_start_year }}</p>
                    <p class="font-medium text-green-600">GPA: {{ edu.education_history_gpa }}</p>
                  </div>
                </div>
                <p v-if="edu.education_history_notes" class="text-sm text-gray-600 mt-2">
                  {{ edu.education_history_notes }}
                </p>
              </div>
              <p v-if="!resume.education?.some(e => e.education_history_institution)" class="text-gray-500 italic">
                No education history listed
              </p>
            </div>
          </div>

          <!-- Training -->
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-4 text-purple-600 flex items-center gap-2">
              📚 Training & Certifications
            </h2>
            <div class="space-y-4">
              <div v-for="(training, index) in resume.training?.filter(t => t.training_history_course_name)" :key="index"
                   class="border border-gray-200 rounded-lg p-4">
                <div class="flex justify-between items-start mb-2">
                  <h3 class="font-semibold text-gray-800">{{ training.training_history_course_name }}</h3>
                  <span class="text-sm text-gray-500">{{ formatDate(training.training_history_date) }}</span>
                </div>
                <p class="text-gray-600 mb-1">{{ training.training_history_organization }}</p>
                <p class="text-sm text-gray-500 mb-2">📍 {{ training.training_history_location }}</p>
                <a v-if="training.training_history_certificate_file" 
                   :href="training.training_history_certificate_file" 
                   target="_blank"
                   class="text-blue-500 hover:text-blue-700 text-sm underline">
                  View Certificate
                </a>
              </div>
              <p v-if="!resume.training?.some(t => t.training_history_course_name)" class="text-gray-500 italic">
                No training records
              </p>
            </div>
          </div>

          <!-- Internships -->
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-4 text-teal-600 flex items-center gap-2">
              🏢 Internships
            </h2>
            <div class="space-y-4">
              <div v-for="(internship, index) in resume.internships?.filter(i => i.internship_company_name)" :key="index"
                   class="border-l-4 border-teal-400 pl-4 py-2">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <div>
                    <h3 class="font-semibold text-gray-800">{{ internship.internship_position }}</h3>
                    <p class="font-medium text-gray-700">{{ internship.internship_company_name }}</p>
                  </div>
                  <span class="text-sm text-gray-500">
                    {{ formatDate(internship.internship_start_date) }} - {{ formatDate(internship.internship_end_date) }}
                  </span>
                </div>
                <p class="text-gray-600 mb-2">{{ internship.internship_description }}</p>
                <a v-if="internship.internship_related_files" 
                   :href="internship.internship_related_files" 
                   target="_blank"
                   class="text-blue-500 hover:text-blue-700 text-sm underline">
                  View Related Files
                </a>
              </div>
              <p v-if="!resume.internships?.some(i => i.internship_company_name)" class="text-gray-500 italic">
                No internship experience
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Teacher Comment Section -->
      <div class="bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4 text-red-600 flex items-center gap-2">
          📝 Teacher Evaluation
        </h2>
        
        <!-- Existing Teacher Comment Display -->
        <div v-if="resume.resume?.resume_teacher_comment" class="mb-4 p-4 bg-gray-50 rounded-lg">
          <h3 class="font-medium text-gray-700 mb-2">Current Comment:</h3>
          <p class="text-gray-600">{{ resume.resume.resume_teacher_comment }}</p>
        </div>

        <!-- Comment Form -->
        <form @submit.prevent="updateComment" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Teacher Comment</label>
            <textarea
              v-model="formComment.resume_teacher_comment"
              rows="4"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
              placeholder="Enter your evaluation comments..."
            ></textarea>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div class="flex gap-6">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  v-model="formComment.resume_status"
                  type="radio"
                  value="3"
                  class="w-4 h-4 text-green-600 focus:ring-green-500"
                />
                <svg class="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-700 font-medium">Approve</span>
              </label>
              
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  v-model="formComment.resume_status"
                  type="radio"
                  value="4"
                  class="w-4 h-4 text-red-600 focus:ring-red-500"
                />
                <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span class="text-gray-700 font-medium">Reject</span>
              </label>
            </div>
            
            <button
              type="submit"
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
            >
              Save Evaluation
            </button>
          </div>
        </form>
      </div>

      <!-- Footer -->
      <div class="text-center text-white text-sm p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
        <div class="flex justify-center items-center gap-4">
          <p>© 2024 {{ resume.student?.student_name || 'Student' }} - Professional Resume</p>
          <div class="flex gap-2">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </div>
        </div>
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
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>