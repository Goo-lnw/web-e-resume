<script setup>
definePageMeta({
  layout: "teacher",
});
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const r = useRoute();
const id = r?.params?.id;
const resume = ref({});
const { $axios } = useNuxtApp();

async function fetchResume() {
  try {
    const res = await $axios.get(`/resume/${id}`);
    resume.value = res.data;
  } catch (err) {
    console.error(err);
  }
}

// ฟังก์ชันแปลงวันที่ให้อ่านง่าย
function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

onMounted(() => {
  fetchResume();
});
</script>
<template>
  <div class="p-6 space-y-8 max-w-4xl mx-auto">
    <!-- Education -->
    <div class="bg-white shadow rounded-lg p-4">
      <h2 class="text-xl font-semibold mb-2 text-indigo-600">🎓 Education</h2>
      <p>
        <strong>Institution:</strong> {{ resume.education_history_institution }}
      </p>
      <p><strong>Major:</strong> {{ resume.education_history_major }}</p>
      <p><strong>GPA:</strong> {{ resume.education_history_gpa }}</p>
      <p><strong>Notes:</strong> {{ resume.education_history_notes }}</p>
      <p>
        <strong>Start Year:</strong> {{ resume.education_history_start_year }}
      </p>
    </div>

    <!-- Internship -->
    <div class="bg-white shadow rounded-lg p-4">
      <h2 class="text-xl font-semibold mb-2 text-green-600">💼 Internship</h2>
      <p><strong>Company:</strong> {{ resume.internship_company_name }}</p>
      <p><strong>Position:</strong> {{ resume.internship_position }}</p>
      <p><strong>Description:</strong> {{ resume.internship_description }}</p>
      <p>
        <strong>Start:</strong> {{ formatDate(resume.internship_start_date) }}
      </p>
      <p><strong>End:</strong> {{ formatDate(resume.internship_end_date) }}</p>
      <p>
        <strong>Certificate:</strong>
        <a
          class="text-blue-500 underline"
          :href="resume.internship_related_files"
          target="_blank"
          >View File</a
        >
      </p>
    </div>

    <!-- Work Experience -->
    <div class="bg-white shadow rounded-lg p-4">
      <h2 class="text-xl font-semibold mb-2 text-orange-600">
        🧑‍💻 Work Experience
      </h2>
      <p><strong>Company:</strong> {{ resume.work_experience_company_name }}</p>
      <p><strong>Position:</strong> {{ resume.work_experience_position }}</p>
      <p>
        <strong>Description:</strong> {{ resume.work_experience_description }}
      </p>
      <p><strong>Highlight:</strong> {{ resume.work_experience_highlight }}</p>
      <p>
        <strong>Start:</strong>
        {{ formatDate(resume.work_experience_start_date) }}
      </p>
      <p>
        <strong>End:</strong> {{ formatDate(resume.work_experience_end_date) }}
      </p>
    </div>

    <!-- Training -->
    <div class="bg-white shadow rounded-lg p-4">
      <h2 class="text-xl font-semibold mb-2 text-purple-600">📚 Training</h2>
      <p><strong>Course:</strong> {{ resume.training_history_course_name }}</p>
      <p>
        <strong>Organization:</strong>
        {{ resume.training_history_organization }}
      </p>
      <p><strong>Location:</strong> {{ resume.training_history_location }}</p>
      <p>
        <strong>Date:</strong> {{ formatDate(resume.training_history_date) }}
      </p>
      <p>
        <strong>Certificate:</strong>
        <a
          class="text-blue-500 underline"
          :href="resume.training_history_certificate_file"
          target="_blank"
          >View File</a
        >
      </p>
    </div>
  </div>
</template>
