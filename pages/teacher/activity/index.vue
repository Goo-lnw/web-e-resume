<script setup>
definePageMeta({
  layout: "teacher",
});

import { ref, onMounted, watch } from "vue";
const { $axios } = useNuxtApp();
const { showAlert } = useAlert();
// fetch state
const allActivityData = ref([]);
const viewActivityData = ref({});
const notCheckinStudentData = ref({});
const checkedinStudentData = ref({});
const certExistStudent = ref({});
const certNotExistStudent = ref({});

//form ref state
const formCreateActivity = ref({
  activity_name: "",
  activity_certificate_file: "",
  activity_description: "",
  activity_organization: "",
  activity_location: "",
  activity_start_date: null,
  activity_end_date: null,
});
const formEditActivity = ref({
  activity_id: "",
  activity_name: "",
  activity_certificate_file: "",
  activity_description: "",
  activity_organization: "",
  activity_location: "",
  activity_start_date: null,
  activity_end_date: null,
});
const initialFormCreate = {
  activity_name: "",
  activity_certificate_file: "",
  activity_description: "",
  activity_organization: "",
  activity_location: "",
  activity_start_date: null,
  activity_end_date: null,
};
const notCheckedinStudentCheckbox = ref([]);
const removeStudentCertCheckbox = ref([]);
const certNotExistTableCheckbox = ref([]);
// modal state
const createActivityModalShow = ref(false);
const editActivityModalShow = ref(false);
const viewActivityModalShow = ref(false);

// activity view tab
const notCheckedinTab = ref(true);
const assignCertTab = ref(false);
const checkCertificateTab = ref(false);

const id_activity = ref(null);

const certCanvas = ref("certCanvas");
const canvasWrapper = ref("canvasWrapper");

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
      showAlert("เกิดข้อผิดพลาดในการลบกิจกรรม ลองใหม่อีกครั้ง", "error");
    }
  }
  showModalConfirm.value = false; // ปิด modal ไม่ว่าจะลบหรือยกเลิก
  selectedStudentId.value = null; // รีเซ็ต ID
}

const showModalConfirm = ref(false);
const selectedStudentId = ref(null); // สำหรับเก็บ ID ที่จะลบ

async function actionActivity(params, action) {
  try {
    if (action === "delete" && params) {
      selectedStudentId.value = params; // บันทึก ID
      showModalConfirm.value = true;
    } else if (action === "edit" && params) {
      const res = await $axios.get(`/teacher/activity/${params}`);
      const data = res.data[0];
      formEditActivity.value = { ...formEditActivity.value, ...data };
      createActivityModalShow.value = false;
      editActivityModalShow.value = true;
    } else if (action === "add" && params === 0) {
      createActivityModalShow.value = true;
    } else if (action === "view" && params) {
      await fetchNotCheckedinStudent(params);
      await fetchCheckedinStudent(params);
      await fecthActivityById(params);
      await fetchCertExistStudent(params);
      await fetchNoCertExistStudent(params);

      viewActivityModalShow.value = true;
      const certImage = viewActivityData.value.activity_certificate_file;

      if (viewActivityData.value.activity_certificate_file) {
        await nextTick();
        generateAndUploadImage(certImage);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function fetchActivity() {
  try {
    const res = await $axios.get("/teacher/activity");
    const data = res.data;

    allActivityData.value = data;
  } catch (err) {
    console.log(err);
  }
}

async function fecthActivityById(aid) {
  try {
    const res = await $axios.get(`/teacher/activity/${aid}`);
    const data = res.data[0];
    id_activity.value = data.activity_id;
    Object.assign(viewActivityData.value, data);
  } catch (err) {
    console.log(err);
  }
}

async function fetchNotCheckedinStudent(aid) {
  try {
    const res = await $axios.get(`/teacher/activity/student_not_in/${aid}`);
    const data = res.data;

    notCheckinStudentData.value = data.map((student) => ({
      ...student,
      selected: false,
    }));
    // console.log(notCheckinStudentData.value);
  } catch (err) {
    console.log(err);
  }
}

async function fetchCheckedinStudent(aid) {
  try {
    const res = await $axios.get(`/teacher/activity/student_in/${aid}`);
    const data = res.data;
    checkedinStudentData.value = data.map((student) => ({
      ...student,
      selected: false,
    }));
  } catch (err) {
    console.log(err);
  }
}

async function fetchCertExistStudent(aid) {
  try {
    const res = await $axios.get(`/teacher/activity/student_cert/${aid}`);
    const data = res.data;
    certExistStudent.value = data;
  } catch (err) {
    console.log(err);
  }
}

async function fetchNoCertExistStudent(aid) {
  try {
    const res = await $axios.get(`/teacher/activity/student_no_cert/${aid}`);
    const data = res.data;
    certNotExistStudent.value = data;
  } catch (err) {
    console.log(err);
  }
}

const message_modal_alert = ref("");
const position_modal_alert = ref("");
const type_modal_alert = ref("");

async function getingmessage(message, position, type) {
  message_modal_alert.value = message;
  position_modal_alert.value = position;
  type_modal_alert.value = type;
  setTimeout(() => {
    message_modal_alert.value = "";
    position_modal_alert.value = "";
    type_modal_alert.value = "";
  }, 1500);
}

async function checkInSubmit() {
  // const selectedStudents = notCheckinStudentData.value.filter((student) => student.selected);
  // const selectedIds = selectedStudents.map((student) => student.resume_id);

  const resume_id = [];
  for (const rid of notCheckedinStudentCheckbox.value) {
    resume_id.push(rid);
  }

  const payload = {
    activity_id: id_activity.value,
    resume_id: resume_id,
  };

  const res = await $axios.post("/teacher/activity/check_in", payload);
  if (res.status === 200) {
    getingmessage(
      "เพิ่มนักศึกษาที่เข้าร่วมกิจกรรมเรียบร้อยแล้ว",
      "checkin",
      "success"
    );
    await fetchNotCheckedinStudent(id_activity.value);
    await fetchCheckedinStudent(id_activity.value);
    await fetchNoCertExistStudent(id_activity.value);
  } else {
    getingmessage("เกิดข้อผิดพลาดในการเพิ่มนักศึกษา", "checkin", "error");

    // showAlert("เกิดข้อผิดพลาดในการมอบเกียรติบัตร", "error");
  }
}

async function removeCheckinStudentsBtn() {
  const resume_id = [];
  for (const rid of certNotExistTableCheckbox.value) {
    resume_id.push(rid);
  }
  const payload = {
    resume_id: resume_id,
  };
  const res = await $axios.delete(
    `/teacher/activity/student/${id_activity.value}`,
    {
      data: payload,
    }
  );

  if (res.status === 200) {
    // showAlert("นำชื่อออกแล้ว", "success");
    getingmessage(
      "ลบนักศึกษาที่เข้าร่วมกิจกรรมเรียบร้อยแล้ว",
      "assign",
      "success"
    );

    certNotExistTableCheckbox.value = [];
    await fetchNotCheckedinStudent(id_activity.value);
    await fetchNoCertExistStudent(id_activity.value);
  } else {
    getingmessage(
      "เกิดข้อผิดพลาดในการลบนักศึกษาที่เข้าร่วมกิจกรรม",
      "assign",
      "error"
    );
    // showAlert("เกิดข้อผิดพลาดในการมอบเกียรติบัตร", "error",);
  }
}

async function assignCertBtn() {
  const resume_id = [];
  for (const rid of certNotExistTableCheckbox.value) {
    resume_id.push(rid);
  }
  const payload = {
    activity_id: id_activity.value,
    resume_id: resume_id,
  };
  // console.log(payload);

  const res = await $axios.post(`/teacher/activity/assign_cert`, payload);

  if (res.status === 200) {
    // showAlert("มอบใบ Certificate เรียบร้อยแล้ว", "success");
    getingmessage("มอบใบ Certificate เรียบร้อยแล้ว", "assign", "success");

    certNotExistTableCheckbox.value = [];
    await fetchNoCertExistStudent(id_activity.value);
    await fetchCertExistStudent(id_activity.value);
  } else {
    getingmessage("เกิดข้อผิดพลาดในการมอบเกียรติบัตร", "assign", "error");
    // showAlert("เกิดข้อผิดพลาดในการมอบเกียรติบัตร", "error");
  }
}

async function removeCertBtn() {
  try {
    const resume_id = [];
    for (const rid of removeStudentCertCheckbox.value) {
      resume_id.push(rid);
    }
    const payload = {
      resume_id: resume_id,
    };
    const res = await $axios.delete(
      `/teacher/activity/student_cert/${id_activity.value}`,
      {
        data: payload,
      }
    );

    if (res.status === 200) {
      // showAlert("ลบ certificate แล้ว", "success");
      getingmessage("ลบ certificate แล้ว", "checkcert", "success");

      removeStudentCertCheckbox.value = [];
      await fetchNotCheckedinStudent(id_activity.value);
      await fetchCheckedinStudent(id_activity.value);
      await fetchNoCertExistStudent(id_activity.value);
      await fetchCertExistStudent(id_activity.value);
    } else {
      showAlert("เกิดข้อผิดพลาดในการลบ", "error");
    }
  } catch (error) {
    console.error(error);
    getingmessage("เกิดข้อผิดพลาดในการลบ", "checkcert", "error");

    // showAlert("เกิดข้อผิดพลาดในการลบ", "error");
  }
}

async function handlelCertImageChange(event) {
  try {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        event.target.value = null;
        throw `${file.name} : File type ${
          file.type
        } not allowed. Allowed: ${allowedTypes.join(", ")}`;
      }
      if (file.size > MAX_FILE_SIZE) {
        event.target.value = null;
        throw `${file.name} : is larger than 5 MB : This file is ${(
          file.size /
          (1024 * 1024)
        ).toFixed(2)} MB`;
      }
      if (event.target.name === "edit_cert_image") {
        formEditActivity.value.activity_certificate_file =
          event.target.files[0];
      } else if (event.target.name === "create_cert_image") {
        formCreateActivity.value.activity_certificate_file =
          event.target.files[0];
      }
      // console.log(formCreateActivity.value.activity_certificate_file);
    }
  } catch (error) {
    showAlert(error, "error");
    console.error(error);
  }
}

async function createActivitySubmit() {
  try {
    const formData = new FormData();
    for (const [key, value] of Object.entries(formCreateActivity.value)) {
      if (value != null) formData.append(key, value);
    }

    const res = await $axios.post("/teacher/activity", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.status === 200) {
      showAlert("เพิ่มกิจกรรมเรียบร่้อย", "success");
      fetchActivity();
      Object.assign(formCreateActivity.value, initialFormCreate);
      createActivityModalShow.value = false;
    }
  } catch (err) {
    console.log(err);
  }
}

async function editActivitySubmit(aid) {
  try {
    delete formEditActivity.value.activity_id;
    const formData = new FormData();
    for (const [key, value] of Object.entries(formEditActivity.value)) {
      if (value != null) formData.append(key, value);
    }
    // console.log(formEditActivity.value);
    const res = await $axios.put(`/teacher/activity/${aid}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.status === 200) {
      showAlert("แก้ไขรายละเอียดกิจกรรมแล้ว", "success");
      fetchActivity();
      formEditActivity.value = null;
      editActivityModalShow.value = false;
    }
  } catch (err) {
    console.error(err);
  }
}

function generateAndUploadImage(imageSrc) {
  const canvas = certCanvas.value;
  const wrapper = canvasWrapper.value;
  if (!canvas || !wrapper) return;

  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.src = imageSrc;

  // ข้อมูลเกี่ยวกับข้อความ
  let textX = 50;
  let textY = 50;
  const text = "นาย ชื่อจริง นามสกุล";
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  img.onload = () => {
    const parentWidth = wrapper.clientWidth;
    const parentHeight = wrapper.clientHeight || window.innerHeight * 0.6;

    // const desiredMaxWidth = Math.min(parentWidth, 800);
    const desiredMaxWidth = parentWidth;
    // const desiredMaxHeight = Math.min(parentHeight, 600);
    const desiredMaxHeight = parentHeight;

    const scale = Math.min(
      desiredMaxWidth / img.width,
      desiredMaxHeight / img.height
    );

    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    canvas.style.width = canvas.width + "px";
    canvas.style.height = canvas.height + "px";

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // วาดข้อความ
      ctx.font = `${30 * scale}px Arial`;
      ctx.fillStyle = "#ffffff";
      ctx.fillText(text, textX * scale, textY * scale);
    };

    // คำนวณตำแหน่งเริ่มต้นของข้อความ (กึ่งกลาง)
    ctx.font = `${30 * scale}px Arial`;
    const metrics = ctx.measureText(text);
    textX = (img.width - metrics.width / scale) / 2;
    textY = img.height / 2;

    draw();

    const isInsideText = (mouseX, mouseY) => {
      ctx.font = `${30 * scale}px Arial`;
      const metrics = ctx.measureText(text);
      const textWidth = metrics.width;
      const textHeight = 30 * scale;

      const scaledTextX = textX * scale;
      const scaledTextY = textY * scale;

      return (
        mouseX >= scaledTextX &&
        mouseX <= scaledTextX + textWidth &&
        mouseY >= scaledTextY - textHeight &&
        mouseY <= scaledTextY
      );
    };

    // Event handlers
    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (isInsideText(x, y)) {
        isDragging = true;
        offsetX = x / scale - textX;
        offsetY = y / scale - textY;
        canvas.style.cursor = "grabbing";
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (isDragging) {
        // textX = x / scale - offsetX;
        textY = y / scale - offsetY;

        // จำกัดไม่ให้ข้อความออกนอกขอบรูป
        const metrics = ctx.measureText(text);
        textX = Math.max(0, Math.min(textX, img.width - metrics.width / scale));
        textY = Math.max(30, Math.min(textY, img.height));

        draw();
      } else {
        canvas.style.cursor = isInsideText(x, y) ? "grab" : "default";
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      canvas.style.cursor = "default";
    };

    // ลบ event listeners เก่า
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mousemove", handleMouseMove);
    canvas.removeEventListener("mouseup", handleMouseUp);
    canvas.removeEventListener("mouseleave", handleMouseUp);

    // เพิ่ม event listeners ใหม่
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseUp);

    // Touch events สำหรับมือถือ
    canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const mouseEvent = {
        clientX: touch.clientX,
        clientY: touch.clientY,
      };
      handleMouseDown(mouseEvent);
    });

    canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const mouseEvent = {
        clientX: touch.clientX,
        clientY: touch.clientY,
      };
      handleMouseMove(mouseEvent);
    });

    canvas.addEventListener("touchend", (e) => {
      e.preventDefault();
      handleMouseUp();
    });
  };
}

async function changeViewActivityTab(tab) {
  if (tab === "not_checked_in") {
    if (notCheckedinTab.value === true) {
      notCheckedinTab.value = false;
    } else {
      notCheckedinTab.value = true;
    }
  }
  if (tab === "assign_certificate") {
    if (assignCertTab.value === true) {
      assignCertTab.value = false;
    } else {
      assignCertTab.value = true;
    }
  }
  if (tab === "check_certificate") {
    if (checkCertificateTab.value === true) {
      checkCertificateTab.value = false;
    } else {
      checkCertificateTab.value = true;
    }
  }
}

onMounted(() => {
  fetchActivity();
});

const certNotExistTableSelectAll = ref(false);
const certExistStudentTableSelectAll = ref(false);
const notCheckedinStudentTableSelectAll = ref(false);

watch(notCheckedinStudentTableSelectAll, (value) => {
  if (value) {
    notCheckedinStudentCheckbox.value = notCheckinStudentData.value.map(
      (s) => s.resume_id
    );
  } else {
    notCheckedinStudentCheckbox.value = [];
  }
});

watch(notCheckedinStudentCheckbox, (value) => {
  if (value.length === notCheckinStudentData.value.length) {
    notCheckedinStudentTableSelectAll.value = true;
  } else {
    notCheckedinStudentTableSelectAll.value = false;
  }
});

watch(certExistStudentTableSelectAll, (value) => {
  if (value) {
    removeStudentCertCheckbox.value = certExistStudent.value.map(
      (s) => s.resume_id
    );
  } else {
    removeStudentCertCheckbox.value = [];
  }
});

watch(removeStudentCertCheckbox, (value) => {
  if (value.length === certExistStudent.value.length) {
    certExistStudentTableSelectAll.value = true;
  } else {
    certExistStudentTableSelectAll.value = false;
  }
});

watch(certNotExistTableSelectAll, (value) => {
  if (value) {
    certNotExistTableCheckbox.value = certNotExistStudent.value.map(
      (s) => s.resume_id
    );
  } else {
    certNotExistTableCheckbox.value = [];
  }
});

watch(certNotExistTableCheckbox, (value) => {
  if (value.length === certNotExistStudent.value.length) {
    certNotExistTableSelectAll.value = true;
  } else {
    certNotExistTableSelectAll.value = false;
  }
});
</script>
<template>
  <div class="min-h-full bg-gradient-to-b from-blue-100 to-white rounded">
    <div
      class="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
    >
      <!-- Page Header -->
      <div class="flex justify-between animate-fade-up">
        <img
          src="../../../assets/images/teacher2.png"
          alt=""
          class="w-56 h-42"
        />
        <h1
          class="text-xl sm:text-2xl font-semibold text-gray-800 mt-32 sm:mb-0"
        >
          รายการกิจกรรม/การอบรม
        </h1>
      </div>
      <div class="rounded-lg shadow-md p-4 sm:p-6 bg-white">
        <!-- Content Header -->
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4"
        >
          <!-- Search and Filter -->
          <div class="flex items-center w-full sm:w-auto">
            <div class="relative w-full">
              <!-- <input type="text" placeholder="ค้นหานักเรียน/นักศึกษา..." class="pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg shadow-lg w-full text-sm sm:text-base" />
              <div class="absolute left-2 sm:left-3 top-2 sm:top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div> -->
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:ml-auto">
            <button
              @click="actionActivity(0, 'add')"
              class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-3 sm:px-4 rounded-lg flex items-center transition duration-200 cursor-pointer text-sm sm:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 sm:h-5 sm:w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              เพิ่มกิจกรรม
            </button>
          </div>
        </div>

        <!-- Activity Table -->
        <div class="overflow-x-auto">
          <table
            class="min-w-full bg-white rounded-lg overflow-hidden text-sm sm:text-base"
          >
            <thead class="bg-gray-100 text-gray-700">
              <tr>
                <th
                  class="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm"
                >
                  ชื่อกิจกรรม
                </th>
                <th
                  class="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm"
                >
                  วันเริ่มต้นกิจกรรม
                </th>
                <th
                  class="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm"
                >
                  วันสิ้นสุดกิจกรรม
                </th>
                <th
                  class="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm"
                ></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="(item, index) in allActivityData"
                :key="index + 1"
                class="hover:bg-gray-50 dtransition-all uration-200"
              >
                <td
                  class="py-2 sm:py-3 px-2 sm:px-4 truncate transition-transform duration-200 hover:scale-105"
                >
                  {{ item.activity_name }}
                </td>
                <td
                  class="py-2 sm:py-3 px-2 sm:px-4 truncate transition-transform duration-200 hover:scale-105"
                >
                  {{ item.activity_start_date }}
                </td>
                <td
                  class="py-2 sm:py-3 px-2 sm:px-4 truncate transition-transform duration-200 hover:scale-105 text-blue-500"
                >
                  {{ item.activity_end_date }}
                </td>
                <td
                  class="py-2 sm:py-3 px-2 sm:px-4 text-center space-x-1 sm:space-x-2"
                >
                  <div
                    class="flex justify-center items-center space-x-1 sm:space-x-2"
                  >
                    <button
                      @click="actionActivity(item.activity_id, 'view')"
                      class="text-green-600 hover:text-green-700 transition duration-200 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 sm:h-5 sm:w-5 transform hover:scale-125 transition-transform duration-200"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.616 20q-.691 0-1.153-.462T3 18.384V5.616q0-.691.463-1.153T4.615 4h14.77q.69 0 1.152.463T21 5.616v12.769q0 .69-.463 1.153T19.385 20zm0-1h14.769q.23 0 .423-.192t.192-.424V5.616q0-.231-.192-.424T19.385 5H4.615q-.23 0-.423.192T4 5.616v12.769q0 .23.192.423t.423.192m.885-2.5h4v-1h-4zm9.05-2.211l4.238-4.239l-.713-.714l-3.525 3.55l-1.425-1.424l-.688.713zM5.5 12.5h4v-1h-4zm0-4h4v-1h-4zM4 19V5z"
                          stroke-width="1"
                          stroke="currentColor"
                        />
                      </svg>
                    </button>
                    <button
                      @click="actionActivity(item.activity_id, 'edit')"
                      class="text-indigo-600 hover:text-indigo-800 transition duration-200 cursor-pointer"
                    >
                      <svg
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
                      </svg>
                    </button>
                    <button
                      @click="actionActivity(item.activity_id, 'delete')"
                      class="text-red-600 hover:text-red-800 transition duration-200 cursor-pointer"
                    >
                      <svg
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
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- create Activity Modal -->
    <dialog
      v-if="createActivityModalShow"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 w-full h-full"
      :class="{ active: createActivityModalShow }"
      open
    >
      <div
        class="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto"
      >
        <div class="p-4 sm:p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-800">
              เพิ่มกิจกรรม
            </h3>
            <button
              class="text-gray-400 hover:text-gray-600 cursor-pointer"
              @click.prevent="createActivityModalShow = false"
            >
              <svg
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
              </svg>
            </button>
          </div>
          <form
            method="dialog"
            class="space-y-3 sm:space-y-4"
            @submit.prevent="createActivitySubmit(formEditActivity.activity_id)"
          >
            <div class="grid grid-cols-2 lg:grid-cols-1 gap-2">
              <div>
                <label
                  class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                >
                  ชื่อกิจกรรม
                </label>
                <input
                  required
                  v-model="formCreateActivity.activity_name"
                  class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  placeholder="ชื่อกิจกรรม"
                />
              </div>
              <div>
                <label
                  class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                  >ข้อมูลเพิ่มเติม</label
                >
                <textarea
                  type="text"
                  v-model="formCreateActivity.activity_description"
                  class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  placeholder="ข้อมูลเพิ่มเติม"
                />
              </div>
              <div>
                <label
                  class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                >
                  สถานที่
                </label>
                <input
                  required
                  v-model="formCreateActivity.activity_location"
                  class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  placeholder="สถานที่"
                />
              </div>
              <div>
                <label
                  class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                >
                  ผู้จัด(องค์กร)
                </label>
                <input
                  required
                  v-model="formCreateActivity.activity_organization"
                  class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  placeholder="ผู้จัด(องค์กร)"
                />
              </div>
              <div>
                <label
                  class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                  >เกียรติบัตรหรือใบรับรอง</label
                >
                <input
                  required
                  type="file"
                  @change="handlelCertImageChange"
                  class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  placeholder="ใบรับรอง/เกียรติบัตร"
                  name="create_cert_image"
                />
              </div>

              <div>
                <label
                  class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                  >วันเริ่มต้นกิจกรรม</label
                >
                <input
                  required
                  type="date"
                  v-model="formCreateActivity.activity_start_date"
                  class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                />
              </div>
              <div>
                <label
                  class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                  >วันสิ้นสุดกิจกรรม</label
                >
                <input
                  required
                  type="date"
                  v-model="formCreateActivity.activity_end_date"
                  class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                />
              </div>
            </div>
            <div class="flex justify-end space-x-2 sm:space-x-3 pt-3 sm:pt-4">
              <button
                class="px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-600 rounded-lg text-white hover:bg-amber-700 transition duration-200 text-sm sm:text-base cursor-pointer"
                @click.prevent="createActivityModalShow = false"
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

    <!-- Edit Activity Modal -->
    <dialog
      v-if="editActivityModalShow"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 w-full h-full"
      :class="{ active: editActivityModalShow }"
      open
    >
      <div
        class="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto"
      >
        <div class="p-4 sm:p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-800">
              แก้ไขกิจกรรม
            </h3>
            <button
              class="text-gray-400 hover:text-gray-600 cursor-pointer"
              @click.prevent="editActivityModalShow = false"
            >
              <svg
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
              </svg>
            </button>
          </div>
          <form
            method="dialog"
            class="space-y-3 sm:space-y-4"
            @submit.prevent="editActivitySubmit(formEditActivity.activity_id)"
          >
            <div class="grid grid-cols-2 lg:grid-cols-1 gap-2">
              <div>
                <label
                  class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                >
                  ชื่อกิจกรรม
                </label>
                <input
                  required
                  v-model="formEditActivity.activity_name"
                  class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  placeholder="ชื่อกิจกรรม"
                />
              </div>
              <div>
                <label
                  class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                  >ข้อมูลเพิ่มเติม</label
                >
                <textarea
                  type="text"
                  v-model="formEditActivity.activity_description"
                  class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  placeholder="ข้อมูลเพิ่มเติม"
                />
              </div>
              <div>
                <label
                  class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                >
                  สถานที่
                </label>
                <input
                  v-model="formEditActivity.activity_location"
                  class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  placeholder="สถานที่"
                />
              </div>
              <div>
                <label
                  class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                >
                  ผู้จัด(องค์กร)
                </label>
                <input
                  v-model="formEditActivity.activity_organization"
                  class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  placeholder="ผู้จัด(องค์กร)"
                />
              </div>
              <div>
                <label
                  class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                  >เกียรติบัตรหรือใบรับรอง</label
                >
                <input
                  type="file"
                  @change="handlelCertImageChange"
                  class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  placeholder="ใบรับรอง/เกียรติบัตร"
                  name="edit_cert_image"
                />
              </div>

              <div>
                <label
                  class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                  >วันเริ่มต้นกิจกรรม</label
                >
                <input
                  type="date"
                  v-model="formEditActivity.activity_start_date"
                  class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                />
              </div>
              <div>
                <label
                  class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                  >วันสิ้นสุดกิจกรรม</label
                >
                <input
                  type="date"
                  v-model="formEditActivity.activity_end_date"
                  class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                />
              </div>
            </div>
            <div class="flex justify-end space-x-2 sm:space-x-3 pt-3 sm:pt-4">
              <button
                class="px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-600 rounded-lg text-white hover:bg-amber-700 transition duration-200 text-sm sm:text-base cursor-pointer"
                @click.prevent="
                  (editActivityModalShow = false), (viewActivityData = [])
                "
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

    <!-- View Activity Modal -->
    <dialog
      v-if="viewActivityModalShow"
      class="fixed inset-0 bg-black/20 flex items-center justify-center z-50 w-full h-full"
      :class="{ active: viewActivityModalShow }"
      open
      @click.self="
        viewActivityData = [];
        viewActivityModalShow = false;
      "
    >
      <div
        class="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-2 sm:mx-auto h-[90vh] overflow-y-auto relative flex flex-col"
        @click.stop
      >
        <div class="p-4 sm:p-6 flex-1 flex flex-col">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-800">
              {{ viewActivityData.activity_name }}
            </h3>
          </div>
          <!-- ปุ่มปิด absolute ให้อยู่บนสุดตลอด -->

          <div class="overflow-x-auto">
            <div
              class="bg-white rounded-lg shadow mx-0 sm:mx-2 mb-4 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <h5 class="text-md sm:text-lg font-semibold text-gray-800 mb-1">
                  รายละเอียด
                </h5>
                <p
                  class="text-sm sm:text-base font-normal text-gray-600 break-words"
                >
                  {{ viewActivityData.activity_description }}
                </p>
                <div class="mt-4">
                  <h5
                    class="text-md sm:text-lg font-semibold text-gray-800 mb-1"
                  >
                    สถานที่
                  </h5>
                  <p class="text-sm sm:text-base font-normal text-gray-600">
                    {{ viewActivityData.activity_location || "ไม่ระบุ" }}
                  </p>
                </div>
                <div class="mt-4">
                  <h5
                    class="text-md sm:text-lg font-semibold text-gray-800 mb-1"
                  >
                    ผู้จัด
                  </h5>
                  <p class="text-sm sm:text-base font-normal text-gray-600">
                    {{ viewActivityData.activity_organization || "ไม่ระบุ" }}
                  </p>
                </div>
                <div class="flex flex-col gap-2 mt-4">
                  <p class="text-xs sm:text-sm text-green-600">
                    วันเริ่มต้นกิจกรรม :
                    <span class="font-medium">{{
                      viewActivityData.activity_start_date || "ไม่ระบุ"
                    }}</span>
                  </p>
                  <p class="text-xs sm:text-sm text-yellow-600">
                    วันสิ้นสุดกิจกรรม :
                    <span class="font-medium">{{
                      viewActivityData.activity_end_date || "ไม่ระบุ"
                    }}</span>
                  </p>
                </div>
              </div>
              <div>
                <h5 class="text-md sm:text-lg font-semibold text-gray-800 mb-1">
                  ตัวอย่างใบ certificate
                </h5>
                <div
                  v-if="viewActivityData.activity_certificate_file"
                  class="mb-2"
                >
                  <div
                    ref="canvasWrapper"
                    class="canvas-wrapper flex justify-center items-center bg-gray-50 rounded shadow"
                    style="min-height: 180px; max-width: 100%; width: 100%"
                  >
                    <canvas
                      ref="certCanvas"
                      style="
                        max-width: 100%;
                        width: 100%;
                        height: auto;
                        border-radius: 8px;
                        background: #fff;
                      "
                    ></canvas>
                  </div>
                  <div class="text-xs text-gray-500 mt-2 text-center">
                    * สามารถลากข้อความตัวอย่างบนใบ certificate
                    เพื่อปรับตำแหน่งได้
                  </div>
                </div>
                <div v-else class="text-gray-400 text-center py-8">
                  ยังไม่อัพโหลดใบ certificate
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow mx-0 sm:mx-2 p-4 sm:p-6">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <!-- ปุ่มเมนูด้านซ้าย -->
                <div class="md:col-span-1">
                  <div class="flex flex-col space-y-2">
                    <span>จัดการนักศึกษา</span>
                    <button
                      type="button"
                      class="px-4 py-2 text-white hover:bg-yellow-800 rounded transition duration-300 text-xs text-nowrap"
                      :class="[
                        notCheckedinTab
                          ? 'bg-yellow-700  outline-gray-400 outline-1 outline-offset-2'
                          : 'bg-yellow-500',
                      ]"
                      @click="changeViewActivityTab('not_checked_in')"
                    >
                      นักศึกษาที่ยังไม่เข้าร่วมกิจกรรม
                    </button>
                    <span>จัดการ Certificate</span>
                    <button
                      type="button"
                      class="px-4 py-2 hover:bg-green-800 text-white rounded transition duration-300 text-xs text-nowrap"
                      :class="[
                        assignCertTab
                          ? 'bg-green-700  outline-gray-400 outline-1 outline-offset-2'
                          : 'bg-green-500',
                      ]"
                      @click="changeViewActivityTab('assign_certificate')"
                    >
                      มอบ Certificate
                    </button>
                    <button
                      type="button"
                      class="px-4 py-2 hover:bg-indigo-800 text-white rounded transition duration-300 text-xs text-nowrap"
                      :class="[
                        checkCertificateTab
                          ? 'bg-indigo-700  outline-gray-400 outline-1 outline-offset-2'
                          : 'bg-indigo-600',
                      ]"
                      @click="changeViewActivityTab('check_certificate')"
                    >
                      ตรวจสอบ Certificate
                    </button>
                  </div>
                </div>

                <!-- เนื้อหาหลักด้านขวา -->
                <div class="md:col-span-3">
                  <div
                    v-if="notCheckedinTab"
                    class="p-4 bg-gray-100 rounded shadow my-2"
                  >
                    <div
                      class="flex flex-col md:flex-row justify-between items-center"
                    >
                      <h5
                        class="text-lg sm:text-lg font-semibold text-indigo-800"
                      >
                        จัดการ นักศึกษาทียังไม่เข้าร่วม
                      </h5>
                      <p
                        :class="
                          type_modal_alert === 'success'
                            ? 'text-green-600'
                            : 'text-red-600'
                        "
                        class="border-1 text-xs p-1 animate-bounce"
                        v-if="
                          message_modal_alert.length > 0 &&
                          position_modal_alert == 'checkin'
                        "
                      >
                        {{ message_modal_alert }}
                      </p>
                    </div>
                    <div class="my-4">
                      <p class="text-gray-800">
                        นักศึกษาที่ยังไม่เข้าร่วมกิจกรรม
                      </p>

                      <div class="overflow-x-auto">
                        <table
                          class="min-w-full bg-white rounded-lg overflow-hidden text-sm sm:text-base md:my-4 sm:my-2"
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
                                ชื่อ
                              </th>
                              <th
                                class="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm"
                              >
                                <div
                                  class="flex justify-center items-center space-x-1 sm:space-x-2"
                                >
                                  <input
                                    type="checkbox"
                                    v-model="notCheckedinStudentTableSelectAll"
                                    id="notCheckedinStudentTableSelectAll"
                                  />
                                  <label
                                    class="text-gray-800"
                                    for="notCheckedinStudentTableSelectAll"
                                    >เลือกทั้งหมด</label
                                  >
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody
                            v-if="notCheckinStudentData.length > 0"
                            class="divide-y divide-gray-200"
                          >
                            <tr
                              v-for="(item, index) in notCheckinStudentData"
                              :key="index + 1"
                              class="hover:bg-gray-50 transition-all duration-200"
                            >
                              <td class="py-2 sm:py-3 px-2 sm:px-4 truncate">
                                {{ item.student_main_id }}
                              </td>
                              <td class="py-2 sm:py-3 px-2 sm:px-4 truncate">
                                {{ item.student_name_thai }}
                              </td>
                              <td class="py-2 sm:py-3 px-2 sm:px-4 text-center">
                                <div class="flex justify-center items-center">
                                  <input
                                    type="checkbox"
                                    v-model="notCheckedinStudentCheckbox"
                                    :value="item.resume_id"
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                          <tbody v-else class="divide-y divide-gray-200">
                            <tr>
                              <td
                                class="py-2 sm:py-3 px-2 sm:px-4 text-center"
                                colspan="3"
                              >
                                ไม่มีนักศึกษาที่ไม่เข้าร่วมกิจกรรม
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="flex justify-end mt-2">
                        <button
                          @click="checkInSubmit"
                          class="px-4 py-2 text-white rounded bg-indigo-500 hover:bg-indigo-800"
                        >
                          เพิ่ม
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="assignCertTab || checkCertificateTab"
                    class="p-4 bg-gray-100 rounded shadow my-2"
                  >
                    <div
                      class="flex flex-col md:flex-row justify-between items-center"
                    >
                      <h5
                        class="text-lg sm:text-lg font-semibold text-indigo-800"
                      >
                        จัดการ นักศึกษาที่เข้าร่วม
                      </h5>
                      <p
                        :class="
                          type_modal_alert === 'success'
                            ? 'text-green-600'
                            : 'text-red-600'
                        "
                        class="border-1 text-xs p-1 animate-bounce"
                        v-if="
                          message_modal_alert.length > 0 &&
                          position_modal_alert == 'assign'
                        "
                      >
                        {{ message_modal_alert }}
                      </p>
                    </div>
                    <div v-if="assignCertTab">
                      <div class="my-4">
                        <p class="text-gray-800">ยังไม่ได้รับ</p>
                        <div class="overflow-x-auto">
                          <table
                            class="min-w-full bg-white rounded-lg overflow-hidden text-sm sm:text-base md:my-4 sm:my-2"
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
                                  ชื่อ
                                </th>
                                <th
                                  class="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm"
                                >
                                  <div
                                    class="flex justify-center items-center space-x-1 sm:space-x-2"
                                  >
                                    <input
                                      type="checkbox"
                                      v-model="certNotExistTableSelectAll"
                                      id="certNotExistTableSelectAll"
                                    />
                                    <label
                                      class="text-gray-800"
                                      for="certNotExistTableSelectAll"
                                      >เลือกทั้งหมด</label
                                    >
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody
                              v-if="certNotExistStudent.length > 0"
                              class="divide-y divide-gray-200"
                            >
                              <tr
                                v-for="(item, index) in certNotExistStudent"
                                :key="index + 1"
                                class="hover:bg-gray-50 transition-all duration-200"
                              >
                                <td class="py-2 sm:py-3 px-2 sm:px-4 truncate">
                                  {{ item.student_main_id }}
                                </td>
                                <td class="py-2 sm:py-3 px-2 sm:px-4 truncate">
                                  {{ item.student_name_thai }}
                                </td>
                                <td
                                  class="py-2 sm:py-3 px-2 sm:px-4 text-center"
                                >
                                  <div class="flex justify-center items-center">
                                    <input
                                      type="checkbox"
                                      v-model="certNotExistTableCheckbox"
                                      :value="item.resume_id"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                            <tbody v-else class="divide-y divide-gray-200">
                              <tr>
                                <td
                                  class="py-2 sm:py-3 px-2 sm:px-4 text-center"
                                  colspan="3"
                                >
                                  ได้รับครบแล้ว หรือ ยังไม่มีนักศึกษาที่เข้าร่วม
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="flex justify-end mt-2">
                          <button
                            @click="assignCertBtn"
                            :class="
                              certNotExistTableCheckbox.length === 0
                                ? 'bg-green-800'
                                : 'bg-green-500'
                            "
                            :disabled="certNotExistTableCheckbox.length === 0"
                            class="px-4 py-2 mx-2 text-white rounded"
                          >
                            มอบ Certificate
                          </button>
                          <button
                            @click="removeCheckinStudentsBtn"
                            :disabled="certNotExistTableCheckbox.length === 0"
                            :class="
                              certNotExistTableCheckbox.length === 0
                                ? 'bg-red-800'
                                : 'bg-red-500'
                            "
                            class="px-4 py-2 mx-2 text-white rounded"
                          >
                            ลบ
                          </button>
                        </div>
                      </div>
                    </div>
                    <div v-if="checkCertificateTab">
                      <div
                        class="flex flex-col md:flex-row justify-between items-center"
                      >
                        <h5
                          class="text-lg sm:text-lg font-semibold text-indigo-800"
                        ></h5>
                        <p
                          :class="
                            type_modal_alert === 'success'
                              ? 'text-green-600'
                              : 'text-red-600'
                          "
                          class="border-1 text-xs p-1 animate-bounce"
                          v-if="
                            message_modal_alert.length > 0 &&
                            position_modal_alert == 'checkcert'
                          "
                        >
                          {{ message_modal_alert }}
                        </p>
                      </div>
                      <div class="my-4">
                        <p class="text-gray-800">ได้รับแล้ว</p>
                        <div class="overflow-x-auto">
                          <table
                            class="min-w-full bg-white rounded-lg overflow-hidden text-sm sm:text-base md:my-4 sm:my-2"
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
                                  ชื่อ
                                </th>
                                <th
                                  class="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm"
                                >
                                  <div
                                    class="flex justify-center items-center space-x-1 sm:space-x-2"
                                  >
                                    <input
                                      type="checkbox"
                                      v-model="certExistStudentTableSelectAll"
                                      id="certExistStudentTableSelectAll"
                                    />
                                    <label
                                      class="text-gray-800"
                                      for="certExistStudentTableSelectAll"
                                      >เลือกทั้งหมด</label
                                    >
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody
                              v-if="certExistStudent.length > 0"
                              class="divide-y divide-gray-200"
                            >
                              <tr
                                v-for="(item, index) in certExistStudent"
                                :key="index + 1"
                                class="hover:bg-gray-50 transition-all duration-200"
                              >
                                <td class="py-2 sm:py-3 px-2 sm:px-4 truncate">
                                  {{ item.student_main_id }}
                                </td>
                                <td class="py-2 sm:py-3 px-2 sm:px-4 truncate">
                                  {{ item.student_name_thai }}
                                </td>
                                <td
                                  class="py-2 sm:py-3 px-2 sm:px-4 text-center"
                                >
                                  <div class="flex justify-center items-center">
                                    <input
                                      type="checkbox"
                                      v-model="removeStudentCertCheckbox"
                                      :value="item.resume_id"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                            <tbody v-else class="divide-y divide-gray-200">
                              <tr>
                                <td
                                  class="py-2 sm:py-3 px-2 sm:px-4 text-center"
                                  colspan="3"
                                >
                                  ได้รับครบแล้ว หรือ ยังไม่มีนักศึกษาที่เข้าร่วม
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="flex justify-end mt-2">
                          <button
                            @click="removeCertBtn"
                            :disabled="removeStudentCertCheckbox.length === 0"
                            :class="
                              removeStudentCertCheckbox.length === 0
                                ? 'bg-red-800'
                                : 'bg-red-500'
                            "
                            class="px-4 py-2 mx-2 text-white rounded"
                          >
                            ลบ Certificate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
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
            ยืนยันการลบข้อมูลกิจกรรมที่จัด
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
  </div>
</template>
<style scoped>
canvas {
  display: block;
  max-width: 100%;
  height: auto;
}

.canvas-wrapper {
  /* width: 90vw; 90% ของความกว้างหน้าจอ */
  height: 40vh;
  /* 70% ของความสูงหน้าจอ */
  /* max-width: 1400px; */
  max-height: 800px;
  margin: 0 auto;
  margin: 0 auto;
}
</style>
