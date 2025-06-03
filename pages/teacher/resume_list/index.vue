<script setup>
useTeacherLayout();
import { ref, onMounted } from "vue";
const { $axios } = useNuxtApp();

const resume = ref([]);
const formData = ref({
  resume_status: "",
  resume_teacher_comment: "",
});

async function fetchResume() {
  try {
    const res = await $axios.get("/resume");
    const data = res.data;
    data.map((item) => {
      item.resume_teacher_comment = "";
      item.resume_status = "";
    });
    resume.value = res.data;
  } catch (err) {
    console.log(err);
  }
}

async function updateComment(index) {
  try {
    const resume_id = resume.value[index].resume_id;
    const comment = resume.value[index].resume_teacher_comment;
    const status = resume.value[index].resume_status;

    console.log(resume_id, comment, status);
    const res = await $axios.put(`/resume/${resume_id}/edit`, {
      resume_teacher_comment: comment,
      resume_status: Number(status),
    });
    if (res.status === 200) {
      fetchResume();
    }
  } catch (err) {
    console.log(err);
  }
}

onMounted(() => {
  fetchResume();
});
</script>

<template>
  <!-- Navbar -->
  <nav class="bg-indigo-600 text-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <span class="ml-2 text-xl font-semibold"
            >E-Resume หน้ารายการ Resume นักเรียน/นักศึกษา</span
          >
        </div>
        <div class="flex items-center">
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span class="ml-2">Username</span>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div class="container mx-auto my-8 font-prompt bg-gray-50">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        class="card-bg shadow-xl rounded-lg overflow-hidden border-l-4 border-accent"
        v-for="(item, index) in resume"
        :key="index"
      >
        <!-- Header Section -->
        <div class="resume-header text-white p-6 relative">
          <div class="flex flex-col md:flex-row items-center md:items-start">
            <div
              class="w-24 h-24 rounded-full bg-white p-1 mb-4 md:mb-0 md:mr-6 flex-shrink-0"
            >
              <div
                class="w-full h-full rounded-full bg-gradient-to-r from-deepPurple to-purple flex items-center justify-center text-white text-2xl font-bold"
              >
                {{
                  item.student_name
                    ? item.student_name.charAt(0).toUpperCase()
                    : "S"
                }}
              </div>
            </div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold mb-2">
                {{ item.student_name }}
              </h1>
              <div class="flex items-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>{{ item.student_email }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="p-6">
          <!-- Education Section -->
          <div class="card-bgmb-6">
            <h2
              class="text-xl text-white font-semibold text-navy section-title mb-4"
            >
              Education
            </h2>
            <div class="bg-white rounded-lg p-5 border-l-4 border-accent">
              <div
                class="flex flex-col md:flex-row md:justify-between md:items-start"
              >
                <div>
                  <h3 class="text-lg font-medium text-deepPurple">
                    {{ item.education_history_institution }}
                  </h3>
                  <p class="text-gray-700">
                    {{ item.education_history_major }}
                  </p>
                </div>
                <div class="mt-2 md:mt-0 md:text-right">
                  <div
                    class="inline-flex items-center bg-lightAccent bg-opacity-30 px-3 py-1 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M10.6 13.25L8.45 11.1q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.85 2.85q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h4.2q.325-.9 1.088-1.45T12 1t1.713.55T14.8 3H19q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm7-16.75q.325 0 .538-.213t.212-.537t-.213-.537T12 2.75t-.537.213t-.213.537t.213.538t.537.212"
                      />
                    </svg>
                    <span class="text-purple font-medium"
                      >GPA: {{ item.education_history_gpa }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="mt-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-accent mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-gray-700">{{
                  item.education_history_notes
                }}</span>
              </div>
            </div>
          </div>

          <!-- Internship Section -->
          <div class="mb-6">
            <h2
              class="text-xl text-white font-semibold text-navy section-title mb-4"
            >
              Internship
            </h2>
            <div class="bg-gray-50 rounded-lg p-5 border-l-4 border-accent">
              <div
                class="flex flex-col md:flex-row md:justify-between md:items-start"
              >
                <div>
                  <h3 class="text-lg font-medium text-deepPurple">
                    {{ item.internship_company_name }}
                  </h3>
                  <p class="text-gray-700 font-medium">
                    {{ item.internship_position }}
                  </p>
                </div>
              </div>
              <p class="mt-3 text-gray-700">
                {{ item.internship_description }}
              </p>
              <div class="mt-4">
                <a
                  :href="item.internship_related_files"
                  target="_blank"
                  class="certificate-btn text-white px-4 py-2 rounded-md flex items-center hover:opacity-90 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  View Certificate
                </a>
              </div>
            </div>
          </div>

          <!-- Training Section -->
          <div class="mb-6">
            <h2
              class="text-white text-xl font-semibold text-navy section-title mb-4"
            >
              Training
            </h2>
            <div class="bg-gray-50 rounded-lg p-5 border-l-4 border-accent">
              <div
                class="flex flex-col md:flex-row md:justify-between md:items-start"
              >
                <div>
                  <h3 class="text-lg font-medium text-deepPurple">
                    {{ item.training_history_course_name }}
                  </h3>
                  <p class="text-gray-700">
                    {{ item.training_history_organization }}
                  </p>
                </div>
              </div>
              <div class="mt-4">
                <a
                  :href="item.training_history_certificate_file"
                  target="_blank"
                  class="certificate-btn text-white px-4 py-2 rounded-md flex items-center hover:opacity-90 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  View Certificate
                </a>
              </div>
            </div>
          </div>

          <!-- Work Experience Section -->
          <div>
            <h2
              class="text-xl text-white font-semibold text-navy section-title mb-4"
            >
              Work Experience
            </h2>
            <div class="bg-gray-50 rounded-lg p-5 border-l-4 border-accent">
              <div
                class="flex flex-col md:flex-row md:justify-between md:items-start"
              >
                <div>
                  <h3 class="text-lg font-medium text-deepPurple">
                    {{ item.work_experience_company_name }}
                  </h3>
                  <p class="text-gray-700 font-medium">
                    {{ item.work_experience_position }}
                  </p>
                </div>
              </div>
              <p class="mt-3 text-gray-700">
                {{ item.work_experience_description }}
              </p>
              <div class="mt-4 bg-lightAccent bg-opacity-20 p-3 rounded-lg">
                <div class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-accent mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <div>
                    <p class="font-medium text-deepPurple">Key Achievement:</p>
                    <p class="text-gray-700">
                      {{ item.work_experience_highlight }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Section -->
          <div class="mt-6 bg-gray-100 p-4 rounded-lg">
            <form>
              <div class="flex space-x-4 mb-4">
                <div class="flex items-center">
                  <input
                    v-model="item.resume_status"
                    value="3"
                    type="radio"
                    class="mr-2"
                  />
                  <label class="text-gray-700">อนุมัติ</label>
                </div>
                <div class="flex items-center">
                  <input
                    v-model="item.resume_status"
                    value="4"
                    type="radio"
                    class="mr-2"
                  />
                  <label class="text-gray-700">ปฏิเสธ</label>
                </div>
              </div>
              <textarea
                type="text"
                class="w-full border rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-accent"
                v-model="item.resume_teacher_comment"
              />
              <button
                @click="updateComment(index)"
                type="button"
                class="bg-indigo-600 hover:bg-indigo-800 px-4 py-2 rounded-md text-white font-medium hover:opacity-90 transition cursor-pointer"
              >
                ยืนยัน
              </button>
            </form>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-4 text-center text-gray-100 text-sm">
          <p>© 2024 Electronic Resume System - Buriram Rajabhat university</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap");

:global(body) {
  font-family: "Prompt", sans-serif;
  background-color: #f8f9fa;
}

.resume-header {
  background: linear-gradient(135deg, #1a237e 0%, #4527a0 50%, #7b1fa2 100%);
}

.section-title::after {
  content: "";
  display: block;
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #4527a0, #7c4dff);
  margin-top: 8px;
}

.certificate-btn {
  background: linear-gradient(90deg, #4527a0, #7c4dff);
}

.action-btn-approve {
  background: linear-gradient(90deg, #1565c0, #0288d1);
}

.action-btn-reject {
  background: linear-gradient(90deg, #c62828, #e53935);
}

.card-bg {
  background-color: #0d1642;
  background-image: linear-gradient(
    135deg,
    rgba(26, 35, 126, 0.9) 0%,
    rgba(13, 22, 66, 0.95) 100%
  );
}
.highlight-bg {
  background-color: rgba(124, 77, 255, 0.15);
}
</style>
