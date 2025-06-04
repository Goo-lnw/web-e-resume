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
  <div class="">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        class="card-bg shadow-xl rounded-lg overflow-hidden border-l-4 border-accent"
        v-for="(item, index) in resume"
        :key="index"
      >
        <div
          class="resume-header text-white p-6 relative"
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

<style scoped>
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
