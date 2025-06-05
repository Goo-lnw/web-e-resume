<script setup>
const { $axios } = useNuxtApp();
const student = ref([]);
import { ref, onMounted } from "vue";

async function fetchstudent() {
  try {
    const res = await $axios.get(`/student/protected`);
    console.log(student.value);
    student.value = res.data.data;
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

onMounted(() => {
  fetchstudent();
});
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
      Student Information
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(item, index) in student"
        :key="index + 1"
        class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
      >
        <h3
          class="text-xl font-semibold text-blue-700 mb-4 border-b-2 border-blue-300 pb-2"
        >
          Student Details
        </h3>
        <p class="text-gray-700">
          <strong class="text-gray-900">ID:</strong>
          {{ item["student_id"] || "No Data" }}
        </p>
        <p  class="text-gray-700">
          <strong class="text-gray-900">Name:</strong>
          {{ item.student_name }}
          <!-- {{ item["student_name"] }} -->
        </p>
        <p v-if="item['student_email']" class="text-gray-700">
          <strong class="text-gray-900">Email:</strong>
          {{ item.student_email }}

          <!-- {{ item["student_email"] }} -->
        </p>
        <p v-if="item['student_phone']" class="text-gray-700">
          <strong class="text-gray-900">Phone:</strong>
          {{ item["student_phone"] }}
        </p>
        <p v-if="item['student_main_id']" class="text-gray-700">
          <strong class="text-gray-900">Main ID:</strong>
          {{ item["student_main_id"] }}
        </p>

        <div
          v-if="
            item['education_history_id'] ||
            item['education_history_gpa'] ||
            item['education_history_major']
          "
          class="mt-4"
        >
          <h4 class="text-lg font-medium text-blue-600 mb-2">
            Education History
          </h4>
          <p v-if="item['education_history_id']" class="text-gray-700">
            <strong class="text-gray-900">Education ID:</strong>
            {{ item["education_history_id"] }}
          </p>
          <p v-if="item['education_history_gpa']" class="text-gray-700">
            <strong class="text-gray-900">GPA:</strong>
            {{ item["education_history_gpa"] }}
          </p>
          <p v-if="item['education_history_major']" class="text-gray-700">
            <strong class="text-gray-900">Major:</strong>
            {{ item["education_history_major"] }}
          </p>
        </div>

        <p v-if="item['created_at']" class="text-gray-700 mt-4">
          <strong class="text-gray-900">Created At:</strong>
          {{ item["created_at"] }}
        </p>

        <div v-if="item['internship_id']" class="mt-4">
          <h4 class="text-lg font-medium text-blue-600 mb-2">Internship</h4>
          <p class="text-gray-700">
            <strong class="text-gray-900">Internship ID:</strong>
            {{ item["internship_id"] }}
          </p>
        </div>

        <div
          v-if="item['notification_id'] || item['notification_message']"
          class="mt-4"
        >
          <h4 class="text-lg font-medium text-blue-600 mb-2">Notification</h4>
          <p v-if="item['notification_id']" class="text-gray-700">
            <strong class="text-gray-900">Notification ID:</strong>
            {{ item["notification_id"] }}
          </p>
          <p v-if="item['notification_message']" class="text-gray-700">
            <strong class="text-gray-900">Message:</strong>
            {{ item["notification_message"] }}
          </p>
        </div>

        <div v-if="item['skill_id'] || item['skill_name']" class="mt-4">
          <h4 class="text-lg font-medium text-blue-600 mb-2">Skills</h4>
          <p v-if="item['skill_id']" class="text-gray-700">
            <strong class="text-gray-900">Skill ID:</strong>
            {{ item["skill_id"] }}
          </p>
          <p v-if="item['skill_name']" class="text-gray-700">
            <strong class="text-gray-900">Skill Name:</strong>
            {{ item["skill_name"] }}
          </p>
        </div>

        <div v-if="item['work_experience_id']" class="mt-4">
          <h4 class="text-lg font-medium text-blue-600 mb-2">
            Work Experience
          </h4>
          <p class="text-gray-700">
            <strong class="text-gray-900">Work Experience ID:</strong>
            {{ item["work_experience_id"] }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
