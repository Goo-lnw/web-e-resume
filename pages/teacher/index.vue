<script setup>
useTeacherLayout();
import { ref, onMounted } from "vue";
const student = ref({});
const { $axios } = useNuxtApp();

async function fetchStudent() {
  try {
    const response = await $axios.get("/student");
    student.value = response.data;
    console.log(student.value);
  } catch (err) {
    console.log(err);
  }
}

async function actionStudent(params, action) {
  try {
    if (action === "delete" && params) {
      console.log(params, action);
      const response = await $axios.delete(`/student/${params}/delete`);
      if (response == 200) {
        fetchStudent();
      }
    } else if (action === "edit" && params) {
      console.log(params, action);
    }
  } catch (err) {
    console.log(err);
  }
}

onMounted(() => {
  fetchStudent();
});
</script>
<template>
  <div>list member student</div>

  <ul v-for="(item, index) in student" :key="index + 1">
    <div class="flex gap-2">
      <div class="">
        <li>{{ item.student_name }}</li>
        <li>{{ item.student_email }}</li>
      </div>
      <div class="">
        <button
          @click="actionStudent(item.student_id, 'delete')"
          class="bg-red-500"
        >
          ลบ
        </button>
        <button
          @click="actionStudent(item.student_id, 'edit')"
          class="bg-red-500"
        >
          แก้ไข
        </button>
      </div>
    </div>
  </ul>
</template>
