<script setup>
definePageMeta({
  layout: "teacher",
});

import { ref, onMounted, computed } from "vue";

const { $axios } = useNuxtApp();
const showModal = ref(false);
const showModalAdd = ref(false);
const editData = ref(null);
const editId = ref(null);
const { showAlert } = useAlert();
const { handleApiError } = useErrorHandler();
const showModalConfirm = ref(false);
const selectedStudentId = ref(null); // สำหรับเก็บ ID ที่จะลบ

// 2️⃣ ตัวแปรเก็บข้อมูล
const student = ref([]);
const page = ref(1); // หน้าปัจจุบัน
const limit = ref(10); // จำนวนข้อมูลต่อหน้า
const totalPages = ref(1); // จำนวนหน้าทั้งหมด

// state สำหรับการค้นหานักเรียน
const searchQuery = ref("");

// ฟังก์ชันสำหรับการค้นหานักเรียน ด้วยชื่อ เเละ รหัสนักเรียน
function filterStudents() {
  //
  if (!searchQuery.value) {
    return student.value;
  }
  // แปลง query เป็นตัวพิมพ์เล็กเพื่อการค้นหาที่ไม่สนใจตัวพิมพ์ใหญ่
  const query = searchQuery.value.toLowerCase();
  return student.value.filter((item) => {
    return (
      item.student_name.toLowerCase().includes(query) ||
      item.student_main_id.toLowerCase().includes(query)
    );
  });
}

// เพิ่ม loading และ error states
const isLoading = ref(false);
const error = ref(null);

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

function clearFormAdd() {
  formAdd.value.student_email = "";
  formAdd.value.student_password = "";
  formAdd.value.student_main_id = "";
}

async function fetchStudent() {
  try {
    isLoading.value = true;
    error.value = null;
    const response = await $axios.get("/student", {
      params: {
        page: page.value,
        limit: limit.value,
      },
    });
    student.value = response.data.data;
    totalPages.value = response.data.totalPages;
    console.log(response.data);
  } catch (err) {
    error.value = err.message;
    handleApiError(err, "เกิดข้อผิดพลาดในการดึงข้อมูลนักเรียน");
    console.error("Error fetching students:", err);
  } finally {
    isLoading.value = false;
  }
}

async function handleConfirmDelete(value) {
  if (value && selectedStudentId.value) {
    try {
      const response = await $axios.delete(
        `/student/${selectedStudentId.value}/delete`
      );
      if (response.status === 200) {
        showAlert("ลบข้อมูลนักเรียน/นักศึกษาแล้ว", "error");
        fetchStudent();
      }
    } catch (err) {
      handleApiError(err, "เกิดข้อผิดพลาดในการลบข้อมูลนักเรียน");
    }
  }
  showModalConfirm.value = false; // ปิด modal ไม่ว่าจะลบหรือยกเลิก
  selectedStudentId.value = null; // รีเซ็ต ID
}

async function actionStudent(params, action) {
  try {
    if (action === "delete" && params) {
      selectedStudentId.value = params; // บันทึก ID
      showModalConfirm.value = true;
    } else if (action === "edit" && params) {
      showModal.value = true;
      showModalAdd.value = false;
      const response_id = await $axios.get(`/student/${params}`);
      formEdit.value.student_name = response_id.data.student_name;
      formEdit.value.student_email = response_id.data.student_email;
      formEdit.value.student_phone = response_id.data.student_phone;
      formEdit.value.student_profile_image =
        response_id.data.student_profile_image;
      editId.value = response_id.data.student_id;
    } else if (action === "add" && params == 0) {
      showModal.value = false;
      showModalAdd.value = true;
    } else if (action === "add_activity") {
      window.location.href = "/teacher/activity";
    }
  } catch (err) {
    if (action === "delete") {
      handleApiError(err, "เกิดข้อผิดพลาดในการลบข้อมูลนักเรียน");
    } else if (action === "edit") {
      handleApiError(err, "เกิดข้อผิดพลาดในการดึงข้อมูลนักเรียน");
    }
    console.error("Error in actionStudent:", err);
  }
}

async function saveEdit() {
  try {
    console.log(formEdit.value);

    const response = await $axios.put(`/student/${editId.value}/edit`, {
      student_name: formEdit.value.student_name,
      student_email: formEdit.value.student_email,
      student_phone: formEdit.value.student_phone,
    });
    if (response.status === 200) {
      showAlert("แก้ไขข้อมูลนักเรียนสำเร็จ", "info");
      showModal.value = false;
      clearFormAdd();
      fetchStudent();
    }
  } catch (err) {
    handleApiError(err, "เกิดข้อผิดพลาดในการแก้ไขข้อมูลนักเรียน");
    console.error("Error saving edit:", err);
  }
}

async function saveAdd() {
  try {
    console.log(formAdd.value);
    const res = await $axios.post("/student", formAdd.value);
    if (res.status === 200) {
      showModalAdd.value = false;
      showAlert("เพิ่มข้อมูลนักเรียนเรียบร้อย", "success");
    }
    clearFormAdd();
    fetchStudent();
  } catch (err) {
    handleApiError(err, "เกิดข้อผิดพลาดในการเพิ่มข้อมูลนักเรียน");
    console.error("Error saving add:", err);
  }
}

onMounted(() => {
  fetchStudent();
});
watch(page, () => fetchStudents());
</script>
<template>
  <div class="min-h-full bg-gradient-to-b from-blue-100 to-white rounded">
    <div
      class="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
    >
      <div class="flex justify-between animate-fade-up">
        <Nuxtimg src="./images/teacher2.png" alt="" class="w-56 h-42" />
        <h1
          class="text-xl sm:text-2xl font-semibold text-gray-800 mt-32 sm:mb-0"
        >
          รายการข้อมูลนักเรียน/นักศึกษา
        </h1>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
        <span class="ml-3 text-gray-600">กำลังโหลดข้อมูล...</span>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4"
      >
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            ></path>
          </svg>
          {{ error }}
        </div>
        <button
          @click="fetchStudent"
          class="mt-2 text-sm text-red-600 hover:text-red-800 underline"
        >
          ลองใหม่อีกครั้ง
        </button>
      </div>

      <!-- Main Content -->
      <div v-else class="rounded-lg shadow-md p-4 sm:p-6 bg-white">
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4"
        >
          <!-- Search and Filter -->
          <div class="flex items-center w-full sm:w-auto">
            <div class="relative w-full">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="ค้นหานักเรียน/นักศึกษา..."
                class="pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg shadow-lg w-full text-sm sm:text-base"
              />
              <div
                class="absolute left-2 sm:left-3 top-2 sm:top-2.5 text-gray-400"
              >
                <Icon name="stash:search" style="width: 24px; height: 24px" />
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:ml-auto">
            <button
              @click="actionStudent(0, 'add_activity')"
              class="space-x-1 bg-green-400 hover:bg-green-600 text-white font-medium py-2 px-3 sm:px-4 rounded-lg flex items-center transition duration-200 cursor-pointer text-xs sm:text-xs"
            >
              <Icon
                name="ep:circle-plus-filled"
                style="color: white; width: 16px; height: 16px"
              />
              <span>เพิ่มกิจกรรม</span>
            </button>

            <button
              @click="actionStudent(0, 'add')"
              class="space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-3 sm:px-4 rounded-lg flex items-center transition duration-200 cursor-pointer text-xs sm:text-xs"
            >
              <Icon
                name="ep:circle-plus-filled"
                style="color: white; width: 16px; height: 16px"
              />
              <span>เพิ่มนักเรียน/นักศึกษา</span>
            </button>
            <NuxtLink
              to="/teacher/resume_list"
              class="space-x-1 flex items-center bg-cyan-600 text-white px-4 sm:px-6 py-2 rounded-lg shadow-md hover:bg-cyan-700 transition duration-200 gap-1 sm:gap-2 text-xs sm:text-xs"
            >
              <span>หน้ารายการ Resume</span>
              <Icon
                name="ep:right"
                style="color: white; width: 16px; height: 16px"
              />
            </NuxtLink>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table
            class="min-w-full bg-white rounded-lg overflow-hidden text-sm sm:text-base"
          >
            <thead class="bg-gray-100 text-gray-700">
              <tr>
                <th
                  class="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm"
                >
                  รหัสนักศึกษา
                </th>
                <th
                  class="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm"
                >
                  ชื่อ-นามสกุล
                </th>
                <th
                  class="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm"
                >
                  อีเมล
                </th>
                <th
                  class="py-2 sm:py-3 px-2 sm:px-4 text-center text-xs sm:text-sm"
                >
                  จัดการ
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="item in filterStudents()"
                :key="item.student_id"
                class="hover:bg-gray-50 dtransition-all uration-200"
              >
                <td
                  class="py-2 sm:py-3 px-2 sm:px-4 truncate transition-transform duration-200 hover:scale-105"
                >
                  {{ item.student_main_id }}
                </td>
                <td
                  class="py-2 sm:py-3 px-2 sm:px-4 truncate transition-transform duration-200 hover:scale-105"
                >
                  {{ item.student_name }}
                </td>
                <td
                  class="py-2 sm:py-3 px-2 sm:px-4 truncate transition-transform duration-200 hover:scale-105 text-blue-500"
                >
                  {{ item.student_email }}
                </td>
                <td
                  class="py-2 sm:py-3 px-2 sm:px-4 text-center space-x-1 sm:space-x-2"
                >
                  <button
                    @click="actionStudent(item.student_id, 'edit')"
                    class="text-indigo-600 hover:text-indigo-800 transition duration-200 cursor-pointer"
                  >
                    <Icon
                      name="tabler:edit"
                      style="
                        width: 20px;
                        height: 20px;

                        padding-left: 10%;
                      "
                      class="sm:w-5 sm:h-5 md:w-6 md:h-6 transform hover:scale-125 transition-transform duration-200"
                    />

                    <!-- <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 sm:h-5 sm:w-5 transform hover:scale-125 transition-transform duration-200"
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
                    </svg> -->
                  </button>
                  <button
                    @click="actionStudent(item.student_id, 'delete')"
                    class="text-red-600 hover:text-red-800 transition duration-200 cursor-pointer"
                  >
                    <Icon
                      name="material-symbols:delete-outline"
                      style="
                        width: 20px;
                        height: 20px;

                        padding-left: 10%;
                      "
                      class="sm:w-5 sm:h-5 md:w-6 md:h-6 transform hover:scale-125 transition-transform duration-200"
                    />
                    <!-- <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 sm:h-5 sm:w-5 transform hover:scale-125 transition-transform duration-200"
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
                    </svg> -->
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex items-center justify-center mt-4 gap-4">
            <button
              @click="page--"
              :disabled="page <= 1"
              class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>Page {{ page }} / {{ totalPages }}</span>
            <button
              @click="page++"
              :disabled="page >= totalPages"
              class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirm Delete Dialog -->
    <dialog
      v-if="showModalConfirm"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 w-full h-full"
      open
    >
      <div
        class="bg-white rounded-lg shadow-lg w-full max-w-xs mx-4 sm:mx-auto p-6"
      >
        <div class="flex flex-col items-center">
          <Icon
            name="material-symbols:warning"
            style="width: 40px; height: 40px; color: #f59e42"
          />
          <h3 class="text-lg font-semibold text-gray-800 mt-2 mb-4 text-center">
            ยืนยันการลบข้อมูลนักเรียน/นักศึกษา
          </h3>
          <p class="text-gray-600 text-sm mb-6 text-center">
            คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?
            <br />การดำเนินการนี้ไม่สามารถย้อนกลับได้
          </p>
          <div class="flex justify-center gap-3 w-full">
            <button
              class="px-4 py-2 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400 transition duration-200 text-sm w-1/2"
              @click="showModalConfirm = false"
            >
              ยกเลิก
            </button>
            <button
              class="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition duration-200 text-sm w-1/2"
              @click="
                handleConfirmDelete(true);
                showModalConfirm = false;
              "
            >
              ลบ
            </button>
          </div>
        </div>
      </div>
    </dialog>

    <!-- Edit Modal -->
    <dialog
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 w-full h-full"
      :class="{ active: showModal }"
      open
    >
      <div
        class="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto"
      >
        <div class="p-4 sm:p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-800">
              แก้ไขข้อมูลนักเรียน
            </h3>
            <button
              class="text-red-400 hover:text-red-600 cursor-pointer"
              @click.prevent="showModal = false"
            >
              <Icon
                name="mingcute:close-line"
                style="width: 24px; height: 24px; padding-left: 10%"
                class="sm:w-5 sm:h-5 md:w-6 md:h-6 transform hover:scale-125 transition-transform duration-200"
              />
            </button>
          </div>
          <form
            method="dialog"
            class="space-y-3 sm:space-y-4"
            @submit.prevent="saveEdit"
          >
            <div>
              <label
                class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                ชื่อ-นามสกุล
              </label>
              <input
                v-model="formEdit.student_name"
                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                placeholder="ชื่อ-นามสกุล"
              />
            </div>
            <div>
              <label
                class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                อีเมล
              </label>
              <input
                v-model="formEdit.student_email"
                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                placeholder="youremail@gmail.com"
              />
            </div>
            <div>
              <label
                class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                รหัสผ่าน
              </label>
              <input
                v-model="formEdit.student_password"
                type="password"
                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                placeholder="รหัสผ่าน"
              />
            </div>
            <div>
              <label
                class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                รหัสผ่านใหม่
              </label>
              <input
                v-model="formEdit.student_old_password"
                type="password"
                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                placeholder="รหัสผ่านใหม่"
              />
            </div>
            <div>
              <label
                class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                เบอร์โทร
              </label>
              <input
                v-model="formEdit.student_phone"
                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                placeholder="เบอร์โทรศัพท์"
              />
            </div>
            <div class="flex justify-end space-x-2 sm:space-x-3 pt-3 sm:pt-4">
              <button
                class="px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-600 rounded-lg text-white hover:bg-amber-700 transition duration-200 text-sm sm:text-base cursor-pointer"
                @click.prevent="showModal = false"
              >
                ปิด
              </button>
              <button
                type="submit"
                class="px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-200 text-sm sm:text-base cursor-pointer"
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
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 w-full h-full"
      :class="{ active: showModalAdd }"
      open
    >
      <div
        class="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto"
      >
        <div class="p-4 sm:p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-800">
              เพิ่มนักเรียน/นักศึกษา
            </h3>
            <button
              class="text-red-400 hover:text-red-600 cursor-pointer"
              @click.prevent="showModalAdd = false"
            >
              <Icon
                name="mingcute:close-line"
                style="width: 24px; height: 24px; padding-left: 10%"
                class="sm:w-5 sm:h-5 md:w-6 md:h-6 transform hover:scale-125 transition-transform duration-200"
              />
              <!-- <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 sm:h-6 sm:w-6"
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
              </svg> -->
            </button>
          </div>
          <form
            method="dialog"
            class="space-y-3 sm:space-y-4"
            @submit.prevent="saveAdd"
          >
            <div>
              <label
                class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                อีเมล
              </label>
              <input
                v-model="formAdd.student_email"
                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                placeholder="youremail@gmail.com"
              />
            </div>
            <div>
              <label
                class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                รหัสผ่าน
              </label>
              <input
                v-model="formAdd.student_password"
                type="password"
                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                placeholder="รหัสผ่าน"
              />
              <p class="text-xs text-gray-500 mt-1">
                รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร
              </p>
            </div>
            <div>
              <label
                class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                รหัสนักเรียน/นักศึกษา
              </label>
              <input
                v-model="formAdd.student_main_id"
                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                placeholder="เช่น 6412345678"
              />
            </div>
            <div class="flex justify-end space-x-2 sm:space-x-3 pt-3 sm:pt-4">
              <button
                class="px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-500 rounded-lg text-white hover:bg-amber-600 transition duration-200 text-sm sm:text-base cursor-pointer"
                @click.prevent="showModalAdd = false"
              >
                ปิด
              </button>
              <button
                type="submit"
                class="px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-200 text-sm sm:text-base cursor-pointer"
              >
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
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

/* อนิเมชันสำหรับ fade-up */
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fade-up 1.5s;
}

/* มาจากทางขวา */
@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-right {
  animation: slide-in-right 0.5s ease-out;
}
</style>
