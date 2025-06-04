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
const formComment = ref({
  resume_teacher_comment: "",
  resume_status: "",
});
async function fetchResume() {
  try {
    const res = await $axios.get(`/resume/${id}`);
    resume.value = res.data;
  } catch (err) {
    console.error(err);
  }
}

async function updateComment() {
  try {
    console.log(formComment.value);

    const res = await $axios.put(`/resume/${id}/edit`, {
      resume_teacher_comment: formComment.resume_teacher_comment,
      resume_status: parseInt(formComment.resume_status),
    });
    if (res.status === 200) {
      fetchResume();
    }
  } catch (err) {
    console.log(err);
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
  <div
    class="p-6 sm:p-8 md:p-10 max-w-4xl mx-auto bg-gray-100 min-h-screen space-y-8 cursor-pointer truncate transition-transform duration-500 hover:scale-105 shadow-2xl rounded-lg"
  >
    <!-- Header -->
    <div
      class="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-lg"
    ></div>
    <div
      class="flex flex-col md:flex-row items-center md:items-start bg-white shadow-lg rounded-lg p-6"
    >
      <div
        class="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold mb-4 md:mb-0 md:mr-6"
      ></div>
      {{ resume.student_name }}
    </div>

    <!-- Main Content -->
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Left Column -->
      <div class="md:w-1/3 space-y-6">
        <!-- Contact -->
        <div class="bg-white shadow-lg rounded-lg p-6">
          <h2 class="text-xl md:text-2xl font-semibold mb-4 text-blue-600">
            ข้อมูลติดต่อ
          </h2>
          <div class="space-y-2 text-gray-700">
            <p>
              <span class="text-blue-500 mr-2">📧</span>
              {{ resume.student_email }}
            </p>
            <p>
              <span class="text-blue-500 mr-2">📞</span>
              {{ resume.student_phone }}
            </p>
          </div>
        </div>

        <!-- Training -->
        <div class="bg-white shadow rounded-lg p-4">
          <h2 class="text-xl font-semibold mb-2 text-purple-600">
            📚 Training
          </h2>
          <p>
            <strong>Course:</strong> {{ resume.training_history_course_name }}
          </p>
          <p>
            <strong>Organization:</strong>
            {{ resume.training_history_organization }}
          </p>
          <p>
            <strong>Location:</strong> {{ resume.training_history_location }}
          </p>
          <p>
            <strong>Date:</strong>
            {{ formatDate(resume.training_history_date) }}
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
        <!-- Internship -->
        <div class="bg-white shadow rounded-lg p-4">
          <h2 class="text-xl font-semibold mb-2 text-green-600">
            💼 Internship
          </h2>
          <p><strong>Company:</strong> {{ resume.internship_company_name }}</p>
          <p><strong>Position:</strong> {{ resume.internship_position }}</p>
          <p>
            <strong>Description:</strong> {{ resume.internship_description }}
          </p>
          <p>
            <strong>Start:</strong>
            {{ formatDate(resume.internship_start_date) }}
          </p>
          <p>
            <strong>End:</strong> {{ formatDate(resume.internship_end_date) }}
          </p>
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
      </div>

      <!-- Right Column -->
      <div class="md:w-2/3 space-y-6">
        <!-- Experience -->
        <div class="bg-white shadow-lg rounded-lg p-6">
          <h2 class="text-xl md:text-2xl font-semibold mb-4 text-blue-600">
            ประสบการณ์ทำงาน
          </h2>
          <div class="bg-white shadow rounded-lg p-4">
            <h2 class="text-xl font-semibold mb-2 text-orange-600">
              🧑‍💻 Work Experience
            </h2>
            <p>
              <strong>Company:</strong>
              {{ resume.work_experience_company_name }}
            </p>
            <p>
              <strong>Position:</strong> {{ resume.work_experience_position }}
            </p>
            <p>
              <strong>Description:</strong>
              {{ resume.work_experience_description }}
            </p>
            <p>
              <strong>Highlight:</strong>
              {{ resume.work_experience_highlight }}
            </p>
            <p>
              <strong>Start:</strong>
              {{ formatDate(resume.work_experience_start_date) }}
            </p>
            <p>
              <strong>End:</strong>
              {{ formatDate(resume.work_experience_end_date) }}
            </p>
          </div>
        </div>

        <!-- Education -->
        <div class="bg-white shadow-lg rounded-lg p-6">
          <h2 class="text-xl md:text-2xl font-semibold mb-4 text-blue-600">
            การศึกษา
          </h2>
          <div class="bg-white shadow rounded-lg p-4">
            <h2 class="text-xl font-semibold mb-2 text-indigo-600">
              🎓 Education
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              <p>
                <strong>Institution:</strong>
                {{ resume.education_history_institution }}
              </p>
              <p>
                <strong>Major:</strong>
                {{ resume.education_history_major }}
              </p>
              <p>
                <strong>GPA:</strong>
                {{ resume.education_history_gpa }}
              </p>
              <p>
                <strong>Notes:</strong>
                {{ resume.education_history_notes }}
              </p>
              <p>
                <strong>Start Year:</strong>
                {{ resume.education_history_start_year }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div
      class="text-center text-gray-100 text-sm p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded flex justify-center items-center gap-4"
    >
      <p>© 2024 {{ resume.student_name }} - Resume</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
        />
      </svg>
    </div>
    <form
      action=""
      class="space-y-6 p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto"
      @submit.prevent="updateComment"
    >
      <textarea
        v-model="formComment.resume_teacher_comment"
        type="text"
        class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-400 resize-y"
        placeholder="Comment"
      />
      <div class="flex flex-wrap gap-6 justify-center items-center">
        <div class="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="512"
            height="512"
            viewBox="0 0 512 512"
            class="w-8 h-8 text-green-400"
          >
            <path
              fill="currentColor"
              d="M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z"
            />
          </svg>
          <label for="status" class="text-gray-700 font-medium">ผ่าน</label>
          <input
            v-model="formComment.resume_status"
            type="radio"
            name="status"
            value="3"
            class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
          />
        </div>
        <div class="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="w-8 h-8 text-red-400"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18 6L6 18M6 6l12 12"
            />
          </svg>
          <label for="status" class="text-gray-700 font-medium">ไม่ผ่าน</label>
          <input
            v-model="formComment.resume_status"
            type="radio"
            name="status"
            value="4"
            class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
          />
        </div>
        <button
          type="submit"
          class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 cursor-pointer"
        >
          บันทึก
        </button>
      </div>
    </form>
  </div>
</template>
