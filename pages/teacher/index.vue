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
  <div>list member student</div>
  <button @click="actionStudent(0, 'add')" class="bg-red-500">เพิ่ม</button>
  <NuxtLink to="/teacher/resume_list" class="bg-amber-400 p-2">list</NuxtLink>

  <ul v-for="(item, index) in student" :key="index + 1">
    <div class="flex gap-2">
      <div class="">
        <li>{{ item.student_name }}</li>
        <li>{{ item.student_email }}</li>
        <li>{{ item.student_main_id || "ยังไม่ได้กรอก" }}</li>
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
          class="bg-amber-500"
        >
          แก้ไข
        </button>
      </div>
    </div>
  </ul>

  <!-- edit -->
  <dialog v-if="showModal" class="modal" open>
    <form method="dialog" class="modal-box" @submit.prevent="saveEdit">
      <h3 class="font-bold text-lg">Edit Student</h3>
      <div class="py-2">
        <label>Name:</label>

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
        <button class="btn btn-primary" @click.prevent="saveEdit">Save</button>
      </div>
    </form>
  </dialog>

  <!-- add -->
  <dialog v-if="showModalAdd" class="modal" open>
    <form method="dialog" class="modal-box" @submit.prevent="saveEdit">
      <h3 class="font-bold text-lg">add Student</h3>
      <div class="py-2">
        <label>Email:</label>
        <input
          v-model="formAdd.student_email"
          class="input input-bordered w-full"
        />
      </div>
      <div class="py-2">
        <label>Password:</label>
        <input
          v-model="formAdd.student_password"
          class="input input-bordered w-full"
        />
      </div>
      <div class="py-2">
        <label>id student:</label>
        <input
          v-model="formAdd.student_main_id"
          class="input input-bordered w-full"
        />
      </div>
      <div class="modal-action">
        <button class="btn" @click.prevent="showModalAdd = false">Close</button>
        <button class="btn btn-primary" @click.prevent="saveAdd">Save</button>
      </div>
    </form>
  </dialog>
</template>
