<script setup>
definePageMeta({
  layout: "teacher",
});
import { ref, onMounted } from "vue";
const r = useRouter();
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
    console.log(data);

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

async function Resume(params) {
  console.log(params);

  r.push(`/teacher/resume_list/${params}`);
}

onMounted(() => {
  fetchResume();
});
</script>

<template>
  <div class="flex justify-center items-center text-3xl">
    <h1>รายการแสดง Resume นักศึกษา/นักเรียน</h1>
  </div>
  <div class="min-h-screen p-4 rounded ">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        class="shadow-xl bg-gradient-to-r from-blue-400 to-blue-200 rounded-lg overflow-hidden border-l-4 border-accent cursor-pointer truncate transition-transform duration-200 hover:scale-105 py-2"
        v-for="(item, index) in resume"
        :key="index"
      >
        <div
          class="resume-header text-gray-800 p-6 relative"
          @click="Resume(item.resume_id)"
        >
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

        <!-- Footer -->
        <div class="p-4 text-center text-gray-100 text-sm">
          <p>© 2024 Electronic Resume System - Buriram Rajabhat university</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
