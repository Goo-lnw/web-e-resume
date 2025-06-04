<script setup>
definePageMeta({
  layout: "teacher",
});

import { ref, onMounted } from "vue";
const student = ref({});
const { $axios } = useNuxtApp();
const showModal = ref(false);
const showModalAdd = ref(false);
const editData = ref(null);
const editId = ref(null);
const { showAlert } = useAlert();

const formEdit = ref({
  student_name: "",
  student_email: "",
  student_old_password: "",
  student_password: "",
  student_phone: "",
  student_profile_image: "",
});
const formAdd = ref({
  student_email: "",
  student_password: "",
  student_main_id: "",
});

async function fetchStudent() {
  try {
    const response = await $axios.get("/student");
    student.value = response.data;
    // console.log(student.value);
  } catch (err) {
    console.log(err);
  }
}
async function actionStudent(params, action) {
  try {
    if (action === "delete" && params) {
      console.log(params, action);
      const response = await $axios.delete(`/student/${params}/delete`);
      if (response.status === 200) {
        showAlert("ลบเเล้ว", "success");
        fetchStudent();
      }
    } else if (action === "edit" && params) {
      showModal.value = true;
      showModalAdd.value = false;
      const response_id = await $axios.get(`/student/${params}`);
      // console.log(response_id.data);
      formEdit.value.student_name = response_id.data.student_name;
      formEdit.value.student_email = response_id.data.student_email;
      formEdit.value.student_phone = response_id.data.student_phone;
      formEdit.value.student_profile_image =
        response_id.data.student_profile_image;
      editId.value = response_id.data.student_id;
    } else if ((action == "add", params == 0)) {
      showModal.value = false;
      showModalAdd.value = true;
    }
  } catch (err) {
    console.log(err);
  }
}
async function saveEdit() {
  try {
    console.log(formEdit.value);

    const response = await $axios.put(`/student/${editId.value}/edit`, {
      student_name: formEdit.value.student_name,
      student_email: formEdit.value.student_email,
    });
    if (response.status === 200) {
      showModal.value = false;
      fetchStudent();
    }
  } catch (err) {
    console.log(err);
  }
}
async function saveAdd() {
  try {
    console.log(formAdd.value);
    const res = await $axios.post("/student", formAdd.value);
    if (res.status === 200) {
      showModalAdd.value = false;
      showAlert("เพิ่มเเล้ว", "success");
    }
    fetchStudent();
  } catch (err) {
    console.log(err);
  }
}

onMounted(() => {
  fetchStudent();
});
</script>
<template>
  <div class="">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-semibold text-gray-800">
            รายการข้อมูลนักเรียน/นักศึกษา
          </h1>
          <div class="flex gap-4">
            <button
              @click="actionStudent(0, 'add')"
              class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition duration-200 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              เพิ่มนักเรียน/นักศึกษา
            </button>
            <NuxtLink
              to="/teacher/resume_list"
              class="flex items-center bg-violet-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-violet-700 transition duration-200 gap-2"
            >
              หน้ารายชื่อนักเรียน/นักศึกษา
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m.47-13.53a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H8a.75.75 0 0 1 0-1.5h6.19l-1.72-1.72a.75.75 0 0 1 0-1.06"
                  clip-rule="evenodd"
                />
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Search and Filter -->
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0"
        >
          <div class="flex items-center">
            <div class="relative">
              <input
                type="text"
                placeholder="ค้นหานักเรียน/นักศึกษา..."
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
              />
              <div class="absolute left-3 top-2.5 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white rounded-lg overflow-hidden">
            <thead class="bg-gray-100 text-gray-700">
              <tr>
                <th class="py-3 px-4 text-left">รหัสนักศึกษา</th>
                <th class="py-3 px-4 text-left">ชื่อ-นามสกุล</th>
                <th class="py-3 px-4 text-left">อีเมล</th>
                <th class="py-3 px-4 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="(item, index) in student"
                :key="index + 1"
                class="hover:bg-gray-50"
              >
                <td class="py-3 px-4">
                  {{ item.student_main_id || "ยังไม่ได้กรอก" }}
                </td>
                <td class="py-3 px-4">{{ item.student_name }}</td>
                <td class="py-3 px-4">{{ item.student_email }}</td>
                <td class="py-3 px-4 text-center">
                  <button
                    @click="actionStudent(item.student_id, 'edit')"
                    class="text-indigo-600 hover:text-indigo-800 mx-1 cursor-pointer transition duration-700 ease-in-out"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="actionStudent(item.student_id, 'delete')"
                    class="text-red-600 hover:text-red-800 mx-1 cursor-pointer transition duration-700 ease-in-out"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <dialog
      v-if="showModal"
      class="fixed inset-0 bg-opacity-25 flex items-center justify-center z-50 w-full h-full"
      :class="{ active: showModal }"
      open
    >
      <div class="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold text-gray-800">
              แก้ไขข้อมูลนักเรียน
            </h3>
            <button
              class="text-gray-400 hover:text-gray-600 cursor-pointer"
              @click.prevent="showModal = false"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form method="dialog" class="space-y-4" @submit.prevent="saveEdit">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                ชื่อ-นามสกุล
              </label>
              <input
                v-model="formEdit.student_name"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="ชื่อ-นามสกุล"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                อีเมล
              </label>
              <input
                v-model="formEdit.student_email"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="youremail@gmail.com"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                รหัสผ่าน
              </label>
              <input
                v-model="formEdit.student_password"
                type="password"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="รหัสผ่าน"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                รหัสผ่านใหม่
              </label>
              <input
                v-model="formEdit.student_old_password"
                type="password"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="รหัสผ่านใหม่"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                เบอร์โทร
              </label>
              <input
                v-model="formEdit.student_phone"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="เบอร์โทรศัพท์"
              />
            </div>
            <div class="flex justify-end space-x-3 pt-4">
              <button
                class="px-4 py-2 bg-amber-600 rounded-lg text-white hover:bg-amber-700 transition duration-200 cursor-pointer"
                @click.prevent="showModal = false"
              >
                ปิด
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-200 cursor-pointer"
              >
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>

    <!-- Add Modal -->
    <dialog
      v-if="showModalAdd"
      class="fixed inset-0 flex items-center justify-center z-50 w-full h-full"
      :class="{ active: showModalAdd }"
      open
    >
      <div class="">
        <div class="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-semibold text-gray-800">
                เพิ่มนักเรียน/นักศึกษา
              </h3>
              <button
                class="text-gray-400 hover:text-gray-600 cursor-pointer"
                @click.prevent="showModalAdd = false"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form method="dialog" class="space-y-4" @submit.prevent="saveAdd">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  อีเมล
                </label>
                <input
                  v-model="formAdd.student_email"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="youremail@gmail.com"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  รหัสผ่าน
                </label>
                <input
                  v-model="formAdd.student_password"
                  type="password"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="รหัสผ่าน"
                />
                <p class="text-xs text-gray-500 mt-1">
                  รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  รหัสนักเรียน/นักศึกษา
                </label>
                <input
                  v-model="formAdd.student_main_id"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="เช่น 6412345678"
                />
              </div>

              <div class="flex justify-end space-x-3 pt-4">
                <button
                  class="px-4 py-2 bg-amber-500 rounded-lg text-white hover:bg-amber-600 transition duration-200 cursor-pointer"
                  @click.prevent="showModalAdd = false"
                >
                  ปิด
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-200 cursor-pointer"
                >
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
body {
  font-family: "Prompt", sans-serif;
}
.modal {
  transition: opacity 0.25s ease;
}
.modal-container {
  transition: transform 0.25s ease;
}
.modal.active {
  opacity: 1;
  pointer-events: auto;
}
.modal.active .modal-container {
  transform: scale(1);
}
</style>
