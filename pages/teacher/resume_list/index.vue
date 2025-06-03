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
    // console.log(resume.value[index]);
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
  <div
    class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
  >
    <div
      class="p-4 border-2 border-gray-300 rounded-sm"
      v-for="(item, index) in resume"
      :key="index"
    >
      <h1 class="text-2xl font-bold mb-4">Resume Information</h1>

      <div class="mb-4">
        <p><strong>Name:</strong> {{ item.student_name }}</p>
        <p><strong>Email:</strong> {{ item.student_email }}</p>
      </div>

      <div class="mb-4">
        <h2 class="text-xl font-semibold">Education</h2>
        <p>
          <strong>Institution:</strong> {{ item.education_history_institution }}
        </p>
        <p><strong>Major:</strong> {{ item.education_history_major }}</p>
        <p><strong>GPA:</strong> {{ item.education_history_gpa }}</p>
        <p><strong>Notes:</strong> {{ item.education_history_notes }}</p>
      </div>

      <div class="mb-4">
        <h2 class="text-xl font-semibold">Internship</h2>
        <p><strong>Company:</strong> {{ item.internship_company_name }}</p>
        <p><strong>Position:</strong> {{ item.internship_position }}</p>
        <p><strong>Description:</strong> {{ item.internship_description }}</p>
        <a
          :href="item.internship_related_files"
          target="_blank"
          class="text-blue-500 underline"
          >View Certificate</a
        >
      </div>

      <div class="mb-4">
        <h2 class="text-xl font-semibold">Training</h2>
        <p><strong>Course:</strong> {{ item.training_history_course_name }}</p>
        <p>
          <strong>Organization:</strong>
          {{ item.training_history_organization }}
        </p>
        <a
          :href="item.training_history_certificate_file"
          target="_blank"
          class="text-blue-500 underline"
          >View Certificate</a
        >
      </div>

      <div class="mb-4">
        <h2 class="text-xl font-semibold">Work Experience</h2>
        <p><strong>Company:</strong> {{ item.work_experience_company_name }}</p>
        <p><strong>Position:</strong> {{ item.work_experience_position }}</p>
        <p>
          <strong>Description:</strong> {{ item.work_experience_description }}
        </p>
        <p><strong>Highlight:</strong> {{ item.work_experience_highlight }}</p>
      </div>
      <div class="border p-4">
        <form>
          <div class="">
            <label for="">อนุมัติ</label>
            <input v-model="item.resume_status" value="3" type="radio" />
          </div>
          <div class="">
            <label for="">ปฏิเสธ</label>
            <input v-model="item.resume_status" value="4" type="radio" />
          </div>
          <textarea
            type="text"
            class="border"
            v-model="item.resume_teacher_comment"
          />
          <button
            @click="updateComment(index)"
            type="button"
            class="border rounded-md px-4"
          >
            ยืนยัน
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
