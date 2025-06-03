<script setup>
useTeacherLayout();
import { ref, onMounted } from "vue";
const student = ref({});
const { $axios } = useNuxtApp();
const showModal = ref(false);
const showModalAdd = ref(false);
const editData = ref(null);
const editId = ref(null);
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
      if (response == 200) {
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
    if (res === 200) {
      showModalAdd.value = false;
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
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="flex justify-center items-center p-4">
      <h1 class="text-3xl font-bold text-gray-800">
        หน้าเพิ่มรายการข้อมูลนักเรียน/นักศึกษา
      </h1>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-center items-center gap-4 mt-6">
      <button
        @click="actionStudent(0, 'add')"
        class="flex bg-indigo-500 text-white hover:bg-indigo-600 transition duration-200 p-2 shadow-lg rounded-lg cursor-pointer gap-4"
      >
        เพิ่มนักเรียน/นักศึกษา
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g fill="none" fill-rule="evenodd">
            <path
              d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
            />
            <path
              fill="currentColor"
              d="M16 14a5 5 0 0 1 5 5v2a1 1 0 1 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 1 1-2 0v-2a5 5 0 0 1 5-5zm4-6a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1V9a1 1 0 0 1 1-1m-8-6a5 5 0 1 1 0 10a5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6"
            />
          </g>
        </svg>
      </button>
      <NuxtLink
        to="/teacher/resume_list"
        class="bg-indigo-500 p-2 rounded-lg text-white hover:bg-indigo-600 transitaion duration-200 flex gap-4"
        >หน้ารายชื่อนักเรียนนักศึกษา
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
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
    <!-- Student List -->
    <div class="max-x-4xl mx-auto">
      <div class="space-y-4">
        <ul
          v-for="(item, index) in student"
          :key="index + 1"
          class="bg-white p-6 roudned-lg shadow-md flex justify-between items-center gap-4"
        >
          <div class="flex gap-2">
            <div class="">
              <li class="text-lg font-semibold text-gray-800">
                {{ item.student_name }}
              </li>
              <li class="text-gray-600">{{ item.student_email }}</li>
              <li class="text-gray-500">
                {{ item.student_main_id || "ยังไม่ได้กรอก" }}
              </li>
            </div>
            <div class="">
              <button
                @click="actionStudent(item.student_id, 'delete')"
                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              >
                ลบ
              </button>
              <button
                @click="actionStudent(item.student_id, 'edit')"
                class="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              >
                แก้ไข
              </button>
            </div>
          </div>
        </ul>
      </div>
    </div>

    <!-- edit -->
    <dialog v-if="showModal" class="modal" open>
      <form
        method="dialog"
        class="modal-box max-w-lg bg-white p-6 rounded-lg shadow-xl"
        @submit.prevent="saveEdit"
      >
        <h3 class="font-bold text-2xl text-gray-800 mb-4">
          แก้ไขข้อมูลนักเรียน/นักศึกษา
        </h3>
        <div class="py-2">
          <label
            >ชื่อนักเรียน
            <!-- svg pic -->
          </label>
          <input
            v-model="formEdit.student_name"
            class="input input-bordered w-full"
          />
        </div>
        <div class="py-2">
          <label>Email:</label>
          <input
            v-model="formEdit.student_email"
            class="input input-bordered w-full"
          />
        </div>
        <div class="py-2">
          <label>password:</label>
          <input
            v-model="formEdit.student_password"
            class="input input-bordered w-full"
          />
        </div>
        <div class="py-2">
          <label>new password:</label>
          <input
            v-model="formEdit.student_old_password"
            class="input input-bordered w-full"
          />
        </div>
        <div class="py-2">
          <label>phone:</label>
          <input
            v-model="formEdit.student_phone"
            class="input input-bordered w-full"
          />
        </div>
        <div class="modal-action">
          <button class="btn" @click.prevent="showModal = false">Close</button>
          <button class="btn btn-primary" @click.prevent="saveEdit">
            Save
          </button>
        </div>
      </form>
    </dialog>

    <!-- add -->
    <dialog v-if="showModalAdd" class="modal fixed inset-0 flex justify-center items-center" open>
      <form
        method="dialog"
        class="modal-box max-w-lg bg-white p-6 rounded-lg shadow-xl"
        @submit.prevent="saveEdit"
      >
        <h3 class="font-bold text-lg text-gray-800 mb-4">กรอกข้อมูล</h3>
        <div class="py-2">
          <label class="text-sm text-gray-800 flex gap-2"
            >อีเมล
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M21 12.13c-.15.01-.29.06-.39.17l-1 1l2.05 2l1-1c.22-.21.22-.56 0-.77l-1.24-1.23a.56.56 0 0 0-.38-.17m-2 1.75L13 19.94V22h2.06l6.06-6.07M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7v-.89l8.24-8.22c.47-.49 1.12-.76 1.8-.76c.34 0 .68.06 1 .19V6c0-1.12-.92-2-2.04-2m0 4l-8 5l-8-5V6l8 5l8-5"
              />
            </svg>
          </label>
          <input
            v-model="formAdd.student_email"
            class="input input-bordered w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 transition duration-200"
            placeholder="youremail@gmail.com"
          />
        </div>
        <div class="py-2">
          <label class="text-sm text-gray-800 flex gap-2"
            >รหัสผ่าน
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"
              />
            </svg>
          </label>
          <input
            v-model="formAdd.student_password"
            class="input input-bordered w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 transition duration-200"
            placeholder="กรุณาระบุรหัสผ่าน"
          />
        </div>
        <div class="py-2">
          <label class="text-sm text-gray-800 flex gap-2"
            >รหัสนักเรียน/นักศึกษา
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M18 13q.425 0 .713-.288T19 12t-.288-.712T18 11h-3q-.425 0-.712.288T14 12t.288.713T15 13zm0-3q.425 0 .713-.288T19 9t-.288-.712T18 8h-3q-.425 0-.712.288T14 9t.288.713T15 10zm-9 3q-.9 0-1.625.163t-1.275.512q-.525.325-.8.738t-.275.887q0 .3.225.5t.55.2h6.4q.325 0 .55-.213t.225-.537q0-.425-.275-.825t-.8-.75q-.55-.35-1.275-.513T9 13m0-1q.825 0 1.412-.587T11 10t-.587-1.412T9 8t-1.412.588T7 10t.588 1.413T9 12m-5 8q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20z"
              />
            </svg>
          </label>
          <input
            v-model="formAdd.student_main_id"
            class="input input-bordered w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 transition duration-200"
            placeholder="กรุณาระบุรหัสนักเรียน/นักศึกษา"
          />
        </div>
        <div class="modal-action flex justify-center items-center gap-4">
          <button
            class="btn text-base bg-amber-600 hover:bg-amber-700 cursor-pointer transition duration-200 text-white p-2 rounded-md shadow-lg"
            @click.prevent="showModalAdd = false"
          >
            ปิด
          </button>
          <button
            class="btn btn-primary text-base bg-indigo-600 hover:bg-indigo-700 cursor-pointer duration-200 text-white p-2 rounded-md shadow-lg"
            @click.prevent="saveAdd"
          >
            บันทึก
          </button>
        </div>
      </form>
    </dialog>
  </div>
</template>
