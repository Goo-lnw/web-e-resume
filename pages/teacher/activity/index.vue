<script setup>
definePageMeta({
    layout: "teacher",
});
import { table } from "#build/ui";
import { ref, onMounted } from "vue";
const r = useRouter();
const { $axios } = useNuxtApp();
const { showAlert } = useAlert();
// fetch state
const allActivityData = ref([]);
const viewActivityData = ref({});
const notCheckinStudentData = ref({});
const checkedinStudentData = ref({});

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
const id_activity = ref(null);
const deleteActivityCheckbox = ref([]);
const assignActivityCheckbox = ref([]);

// modal state
// const assignCertModalShow = ref(false);
const createActivityModalShow = ref(false);
const editActivityModalShow = ref(false);
const viewActivityModalShow = ref(false);
//
const notCheckedinTab = ref(false);
const checkedinTab = ref(false);

const certCanvas = ref("certCanvas");
// const imageCanvasRef = ref(null);
const canvasWrapper = ref("canvasWrapper");

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
        // console.log(data);
        id_activity.value = data.activity_id;
        console.log("ID กิจกรรม:", id_activity.value);
        Object.assign(viewActivityData.value, data);
        // viewActivityData.value = data;
        // console.log(viewActivityData.value);
    } catch (err) {
        console.log(err);
    }
}

async function checkInSubmit() {
    const selectedStudents = notCheckinStudentData.value.filter((student) => student.selected);
    const selectedIds = selectedStudents.map((student) => student.resume_id);
    console.log("รหัสนักเรียนที่ติ๊ก:", selectedIds);

    const payload = {
        activity_id: id_activity.value,
        resume_id: selectedIds,
    };

    // console.log("payload:", payload);

    const res = await $axios.post("/teacher/activity/check_in", payload);
    if (res.status === 200) {
        showAlert("เพิ่มรายชื่อนักเรียนแล้ว", "success");
        await fetchNotCheckedinStudent();
        await fetchCheckedinStudent(id_activity.value);
    } else {
        showAlert("เกิดข้อผิดพลาดในการมอบเกียรติบัตร", "error");
    }
}

async function assignActivitySubmit() {
    const resume_id = [];
    for (const rid of assignActivityCheckbox.value) {
        resume_id.push(rid);
    }
    const payload = {
        activity_id: id_activity.value,
        resume_id: resume_id,
    };
    // console.log(payload);

    const res = await $axios.post(`/teacher/activity/assign_cert`, payload);

    if (res.status === 200) {
        showAlert("มอบใบ Certificate เรียบร้อยแล้ว", "success");
        assignActivityCheckbox.value = [];
        viewActivityData.value = [];
        viewActivityModalShow.value = false;
        await fetchNotCheckedinStudent(id_activity.value);
        await fetchCheckedinStudent(id_activity.value);
    } else {
        showAlert("เกิดข้อผิดพลาดในการมอบเกียรติบัตร", "error");
    }
}

async function removeSelectedStudents() {
    const resume_id = [];
    for (const rid of deleteActivityCheckbox.value) {
        resume_id.push(rid);
    }
    const payload = {
        resume_id: resume_id,
    };
    const res = await $axios.delete(`/teacher/activity/student/${id_activity.value}`, {
        data: payload,
    });

    if (res.status === 200) {
        showAlert("นำชื่อออกแล้ว", "success");
        deleteActivityCheckbox.value = [];
        await fetchNotCheckedinStudent(id_activity.value);
        await fetchCheckedinStudent(id_activity.value);
    } else {
        showAlert("เกิดข้อผิดพลาดในการมอบเกียรติบัตร", "error");
    }
}

async function fetchNotCheckedinStudent(aid) {
    try {
        const res = await $axios.get(`/teacher/activity/student_not_in/${aid}`);
        const data = res.data;
        console.log(data);

        Object.assign(notCheckinStudentData.value, data);

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
        console.log(data);

        Object.assign(checkedinStudentData.value, data);

        checkedinStudentData.value = data.map((student) => ({
            ...student,
            selected: false,
        }));
        // console.log(checkedinStudentData.value);
    } catch (err) {
        console.log(err);
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
    // const text = "Your Text Here";
    const text = "นาย ชื่อจริง นามสกุล";
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    img.onload = () => {
        const parentWidth = wrapper.clientWidth;
        const parentHeight = wrapper.clientHeight || window.innerHeight * 0.6; // fallback ถ้าไม่มี

        // คำนวณ scale โดยรักษาอัตราส่วนของภาพ (fit แบบ contain)
        const scale = Math.min(parentWidth / img.width, parentHeight / img.height);

        // ตั้งค่า canvas ขนาดตาม scale
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        // แปลง context scale
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        // ตั้งค่าฟอนต์ก่อนวัดขนาดข้อความ
        ctx.font = "30px Arial";
        const metrics = ctx.measureText(text);
        const textWidth = metrics.width;
        const textHeight = 30;

        // คำนวณตำแหน่งตัวอักษร
        textX = (img.width - textWidth) / 2;
        textY = (img.height + textHeight) / 2;

        ctx.fillText(text, textX, textY);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width / scale, canvas.height / scale);
            ctx.drawImage(img, 0, 0);
            // ctx.font = "30px Angsana New";
            // ctx.fillStyle = "#fffff";
            ctx.fillText(text, textX, textY);
        };

        const isInsideText = (x, y) => {
            const metrics = ctx.measureText(text);
            const textWidth = metrics.width;
            const textHeight = 30;
            return x >= textX && x <= textX + textWidth && y >= textY - textHeight && y <= textY;
        };

        canvas.onmousedown = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) / scale;
            const y = (e.clientY - rect.top) / scale;
            if (isInsideText(x, y)) {
                isDragging = true;
                offsetX = x - textX;
                offsetY = y - textY;
            }
        };

        canvas.onmousemove = (e) => {
            if (isDragging) {
                const rect = canvas.getBoundingClientRect();
                // textX = (e.clientX - rect.left) / scale - offsetX;
                textY = (e.clientY - rect.top) / scale - offsetY;
                draw();
            }
        };

        canvas.onmouseup = () => {
            isDragging = false;
        };

        canvas.onmouseleave = () => {
            isDragging = false;
        };
    };
}

async function actionActivity(params, action) {
    try {
        if (action === "delete" && params) {
            const response = await $axios.delete(`/teacher/activity/${params}`);
            if (response.status === 200) {
                showAlert("ลบกิจกรรมแล่ว", "error");
                fetchActivity();
            }
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

async function handlelCertImageChange(event) {
    try {
        const file = event.target.files[0];
        const allowedTypes = ["image/jpeg", "image/png"];
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        if (file) {
            if (!allowedTypes.includes(file.type)) {
                event.target.value = null;
                throw `${file.name} : File type ${file.type} not allowed. Allowed: ${allowedTypes.join(", ")}`;
            }
            if (file.size > MAX_FILE_SIZE) {
                event.target.value = null;
                throw `${file.name} : is larger than 5 MB : This file is ${(file.size / (1024 * 1024)).toFixed(2)} MB`;
            }
            if (event.target.name === "edit_cert_image") {
                formEditActivity.value.activity_certificate_file = event.target.files[0];
            } else if (event.target.name === "create_cert_image") {
                formCreateActivity.value.activity_certificate_file = event.target.files[0];
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

async function changeViewActivityTab(tab) {
    if (tab === "checked_in") {
        if (notCheckedinTab.value === true) {
            notCheckedinTab.value = false;
        } else {
            notCheckedinTab.value = true;
        }
    }
    if (tab === "not_checked_in") {
        if (checkedinTab.value === true) {
            checkedinTab.value = false;
        } else {
            checkedinTab.value = true;
        }
    }
}
onMounted(() => {
    fetchActivity();
});
</script>
<template>
    <div class="min-h-full bg-gradient-to-b from-blue-100 to-white rounded">
        <div class="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <!-- Page Header -->
            <div class="flex justify-between animate-fade-up">
                <img src="../../../assets/images/teacher2.png" alt="" class="w-56 h-42" />
                <h1 class="text-xl sm:text-2xl font-semibold text-gray-800 mt-32 sm:mb-0">รายการกิจกรรม/การอบรม</h1>
            </div>
            <div class="rounded-lg shadow-md p-4 sm:p-6 bg-white">
                <!-- Content Header -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
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
                        <button @click="actionActivity(0, 'add')" class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-3 sm:px-4 rounded-lg flex items-center transition duration-200 cursor-pointer text-sm sm:text-base">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                            </svg>
                            เพิ่มกิจกรรม
                        </button>
                    </div>
                </div>

                <!-- Activity Table -->
                <div class="overflow-x-auto">
                    <table class="min-w-full bg-white rounded-lg overflow-hidden text-sm sm:text-base">
                        <thead class="bg-gray-100 text-gray-700">
                            <tr>
                                <th class="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm">ชื่อกิจกรรม</th>
                                <th class="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm">วันเริ่มต้นกิจกรรม</th>
                                <th class="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm">วันสิ้นสุดกิจกรรม</th>
                                <th class="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm"></th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="(item, index) in allActivityData" :key="index + 1" class="hover:bg-gray-50 dtransition-all uration-200">
                                <td class="py-2 sm:py-3 px-2 sm:px-4 truncate transition-transform duration-200 hover:scale-105">
                                    {{ item.activity_name }}
                                </td>
                                <td class="py-2 sm:py-3 px-2 sm:px-4 truncate transition-transform duration-200 hover:scale-105">
                                    {{ item.activity_start_date }}
                                </td>
                                <td class="py-2 sm:py-3 px-2 sm:px-4 truncate transition-transform duration-200 hover:scale-105 text-blue-500">
                                    {{ item.activity_end_date }}
                                </td>
                                <td class="py-2 sm:py-3 px-2 sm:px-4 text-center space-x-1 sm:space-x-2">
                                    <div class="flex justify-center items-center space-x-1 sm:space-x-2">
                                        <button @click="actionActivity(item.activity_id, 'view')" class="text-green-600 hover:text-green-700 transition duration-200 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 transform hover:scale-125 transition-transform duration-200" width="24" height="24" viewBox="0 0 24 24">
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
                                        <button @click="actionActivity(item.activity_id, 'edit')" class="text-indigo-600 hover:text-indigo-800 transition duration-200 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 transform hover:scale-125 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                />
                                            </svg>
                                        </button>
                                        <button @click="actionActivity(item.activity_id, 'delete')" class="text-red-600 hover:text-red-800 transition duration-200 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 transform hover:scale-125 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <dialog v-if="createActivityModalShow" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 w-full h-full" :class="{ active: createActivityModalShow }" open>
            <div class="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto">
                <div class="p-4 sm:p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg sm:text-xl font-semibold text-gray-800">เพิ่มกิจกรรม</h3>
                        <button class="text-gray-400 hover:text-gray-600 cursor-pointer" @click.prevent="createActivityModalShow = false">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <form method="dialog" class="space-y-3 sm:space-y-4" @submit.prevent="createActivitySubmit(formEditActivity.activity_id)">
                        <div>
                            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"> ชื่อกิจกรรม </label>
                            <input
                                v-model="formCreateActivity.activity_name"
                                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                placeholder="ชื่อกิจกรรม"
                            />
                        </div>
                        <div>
                            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">ข้อมูลเพิ่มเติม</label>
                            <textarea
                                type="text"
                                v-model="formCreateActivity.activity_description"
                                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                placeholder="ข้อมูลเพิ่มเติม"
                            />
                        </div>
                        <div>
                            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"> สถานที่ </label>
                            <input
                                v-model="formCreateActivity.activity_location"
                                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                placeholder="สถานที่"
                            />
                        </div>
                        <div>
                            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"> ผู้จัด(องค์กร) </label>
                            <input
                                v-model="formCreateActivity.activity_organization"
                                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                placeholder="ผู้จัด(องค์กร)"
                            />
                        </div>
                        <div>
                            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">เกียรติบัตรหรือใบรับรอง</label>
                            <input
                                type="file"
                                @change="handlelCertImageChange"
                                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                placeholder="ใบรับรอง/เกียรติบัตร"
                                name="create_cert_image"
                            />
                        </div>

                        <div>
                            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">วันเริ่มต้นกิจกรรม</label>
                            <input
                                type="date"
                                v-model="formCreateActivity.activity_start_date"
                                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                            />
                        </div>
                        <div>
                            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">วันสิ้นสุดกิจกรรม</label>
                            <input
                                type="date"
                                v-model="formCreateActivity.activity_end_date"
                                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                            />
                        </div>
                        <div class="flex justify-end space-x-2 sm:space-x-3 pt-3 sm:pt-4">
                            <button class="px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-600 rounded-lg text-white hover:bg-amber-700 transition duration-200 text-sm sm:text-base cursor-pointer" @click.prevent="createActivityModalShow = false">
                                ปิด
                            </button>
                            <button type="submit" class="px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-200 text-sm sm:text-base cursor-pointer">บันทึก</button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>

        <!-- Edit Activity Modal -->
        <dialog v-if="editActivityModalShow" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 w-full h-full" :class="{ active: editActivityModalShow }" open>
            <div class="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto">
                <div class="p-4 sm:p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg sm:text-xl font-semibold text-gray-800">แก้ไขกิจกรรม</h3>
                        <button class="text-gray-400 hover:text-gray-600 cursor-pointer" @click.prevent="editActivityModalShow = false">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <form method="dialog" class="space-y-3 sm:space-y-4" @submit.prevent="editActivitySubmit(formEditActivity.activity_id)">
                        <div>
                            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"> ชื่อกิจกรรม </label>
                            <input
                                v-model="formEditActivity.activity_name"
                                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                placeholder="ชื่อกิจกรรม"
                            />
                        </div>
                        <div>
                            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">ข้อมูลเพิ่มเติม</label>
                            <textarea
                                type="text"
                                v-model="formEditActivity.activity_description"
                                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                placeholder="ข้อมูลเพิ่มเติม"
                            />
                        </div>
                        <div>
                            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"> สถานที่ </label>
                            <input
                                v-model="formEditActivity.activity_location"
                                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                placeholder="สถานที่"
                            />
                        </div>
                        <div>
                            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"> ผู้จัด(องค์กร) </label>
                            <input
                                v-model="formEditActivity.activity_organization"
                                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                placeholder="ผู้จัด(องค์กร)"
                            />
                        </div>
                        <div>
                            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">เกียรติบัตรหรือใบรับรอง</label>
                            <input
                                type="file"
                                @change="handlelCertImageChange"
                                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                placeholder="ใบรับรอง/เกียรติบัตร"
                                name="edit_cert_image"
                            />
                        </div>

                        <div>
                            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">วันเริ่มต้นกิจกรรม</label>
                            <input
                                type="date"
                                v-model="formEditActivity.activity_start_date"
                                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                            />
                        </div>
                        <div>
                            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">วันสิ้นสุดกิจกรรม</label>
                            <input
                                type="date"
                                v-model="formEditActivity.activity_end_date"
                                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                            />
                        </div>
                        <div class="flex justify-end space-x-2 sm:space-x-3 pt-3 sm:pt-4">
                            <button
                                class="px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-600 rounded-lg text-white hover:bg-amber-700 transition duration-200 text-sm sm:text-base cursor-pointer"
                                @click.prevent="(editActivityModalShow = false), (viewActivityData = [])"
                            >
                                ปิด
                            </button>
                            <button type="submit" class="px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-200 text-sm sm:text-base cursor-pointer">บันทึก</button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>

        <!-- View Activity Modal -->
        <dialog v-if="viewActivityModalShow" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 w-full h-full" :class="{ active: viewActivityModalShow }" open>
            <div class="bg-white rounded-lg shadow-lg w-full max-w-screen-xl h-[90vh] mx-2 sm:mx-6 overflow-y-auto">
                <div class="p-4 sm:p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg sm:text-xl font-semibold text-gray-800">
                            {{ viewActivityData.activity_name }}
                        </h3>
                        <button
                            class="text-gray-400 hover:text-gray-600 cursor-pointer"
                            @click.prevent="
                                viewActivityData = [];
                                viewActivityModalShow = false;
                            "
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div class="overflow-x-auto">
                        <div class="bg-white rounded-lg shadow-lg mx-2 sm:mx-6 overflow-y-auto p-4 sm:p-6 mb-4">
                            <div>
                                <h5 class="text-md sm:text-lg font-semibold text-gray-800">รายละเอียด</h5>
                                <div class="p-4">
                                    <p class="text-sm sm-text-xs font-regular text-grey-600">
                                        {{ viewActivityData.activity_description }}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h5 class="text-md sm:text-lg font-semibold text-gray-800">สถานที่</h5>
                                <div class="p-4">
                                    <p class="text-sm sm-text-xs font-regular text-grey-600">
                                        {{ viewActivityData.activity_location || "ไม่ระบุ" }}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h5 class="text-md sm:text-lg font-semibold text-gray-800">ผู้จัด</h5>
                                <div class="p-4">
                                    <p class="text-sm sm-text-xs font-regular text-grey-600">
                                        {{ viewActivityData.activity_organization || "ไม่ระบุ" }}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h5 class="text-md sm:text-lg font-semibold text-gray-800">ตัวอย่างใบ certificate</h5>
                                <div v-if="viewActivityData.activity_certificate_file" class="p-4">
                                    <div ref="canvasWrapper" class="canvas-wrapper">
                                        <canvas id="certCanvas" ref="certCanvas"></canvas>
                                    </div>
                                </div>
                                <div v-else class="p-4">
                                    <div ref="canvasWrapper" class="canvas-wrapper">
                                        <canvas id="certCanvas" ref="certCanvas"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-between my-4">
                                <p class="text-xs text-green-600">
                                    วันเริ่มต้นกิจกรรม :
                                    {{ viewActivityData.activity_start_date || "ไม่ระบุ" }}
                                </p>
                                <p class="text-xs text-yellow-600">
                                    วันสิ้นสุดกิจกรรม :
                                    {{ viewActivityData.activity_end_date || "ไม่ระบุ" }}
                                </p>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg shadow-lg mx-2 sm:mx-6 overflow-y-auto p-4 sm:p-6">
                            <div class="flex justify-center items-center space-x-1 sm:space-x-2">
                                <button type="button" class="px-4 py-2 mx-2 bg-indigo-500 hover:bg-indigo-800 text-white rounded" @click="changeViewActivityTab('checked_in')">นักศึกษาที่ยังไม่เข้าร่วมกิจกรรม</button>
                                <button type="button" class="px-4 py-2 mx-2 bg-green-500 hover:bg-green-800 text-white rounded" @click="changeViewActivityTab('not_checked_in')">นักศึกษาที่เข้าร่วมกิจกรรม</button>
                            </div>
                            <div v-if="notCheckedinTab">
                                <div class="my-4">
                                    <h5 class="text-md sm:text-lg font-semibold text-gray-800">เพิ่มรายชื่อนักศึกษาที่เข้าร่วมกิจกรรม</h5>
                                    <table class="min-w-full bg-white rounded-lg overflow-hidden text-sm sm:text-base md:my-4 sm:my-2">
                                        <thead class="bg-gray-100 text-gray-700">
                                            <tr>
                                                <th class="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm">รหัสนักศึกษา</th>
                                                <th class="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm">ชื่อ</th>
                                                <th class="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm">
                                                    <div class="flex justify-center items-center space-x-1 sm:space-x-2">เลือก</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="notCheckinStudentData.length > 0" class="divide-y divide-gray-200">
                                            <tr v-for="(item, index) in notCheckinStudentData" :key="index + 1" class="hover:bg-gray-50 dtransition-all uration-200">
                                                <td class="py-2 sm:py-3 px-2 sm:px-4 truncate transition-transform duration-200 hover:scale-105">
                                                    {{ item.student_main_id }}
                                                </td>
                                                <td class="py-2 sm:py-3 px-2 sm:px-4 truncate transition-transform duration-200 hover:scale-105">
                                                    {{ item.student_name_thai }}
                                                </td>
                                                <td class="py-2 sm:py-3 px-2 sm:px-4 text-center space-x-1 sm:space-x-2">
                                                    <div class="flex justify-center items-center space-x-1 sm:space-x-2">
                                                        <input type="checkbox" v-model="item.selected" :value="item.resume_id" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tbody v-else="notCheckinStudentData.length < 1" class="divide-y divide-gray-200">
                                            <tr>
                                                <td class="py-2 sm:py-3 px-2 sm:px-4 truncate transition-transform duration-200 hover:scale-105" colspan="3">
                                                    <div class="flex justify-center items-center space-x-1 sm:space-x-2">ไม่มีนักเรียนที่ยังไม่เข้าร่วมกิจกรรม</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="flex justify-end animate-fade-up">
                                        <button @click="checkInSubmit" class="px-4 py-2 bg-blue-500 text-white rounded">เพิ่ม</button>
                                    </div>
                                </div>
                            </div>
                            <div v-if="checkedinTab">
                                <div class="my-4">
                                    <h5 class="text-md sm:text-lg font-semibold text-gray-800">รายชื่อนักศึกษาที่เข้าร่วมกิจกรรม</h5>
                                    <table class="min-w-full bg-white rounded-lg overflow-hidden text-sm sm:text-base md:my-4 sm:my-2">
                                        <thead class="bg-gray-100 text-gray-700">
                                            <tr>
                                                <th class="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm">รหัสนักศึกษา</th>
                                                <th class="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm">ชื่อ</th>
                                                <th class="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm">
                                                    <div class="flex justify-center items-center space-x-1 sm:space-x-2">เลือก</div>
                                                </th>
                                                <th class="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm">
                                                    <div class="flex justify-center items-center space-x-1 sm:space-x-2">ลบ</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="checkedinStudentData.length > 0" class="divide-y divide-gray-200">
                                            <tr v-for="(item, index) in checkedinStudentData" :key="index + 1" class="hover:bg-gray-50 dtransition-all uration-200">
                                                <td class="py-2 sm:py-3 px-2 sm:px-4 truncate transition-transform duration-200 hover:scale-105">
                                                    {{ item.student_main_id }}
                                                </td>
                                                <td class="py-2 sm:py-3 px-2 sm:px-4 truncate transition-transform duration-200 hover:scale-105">
                                                    {{ item.student_name_thai }}
                                                </td>
                                                <td class="py-2 sm:py-3 px-2 sm:px-4 text-center space-x-1 sm:space-x-2">
                                                    <div class="flex justify-center items-center space-x-1 sm:space-x-2">
                                                        <input type="checkbox" v-model="assignActivityCheckbox" :value="item.resume_id" />
                                                    </div>
                                                </td>
                                                <td class="py-2 sm:py-3 px-2 sm:px-4 text-center space-x-1 sm:space-x-2">
                                                    <div class="flex justify-center items-center space-x-1 sm:space-x-2">
                                                        <input type="checkbox" v-model="deleteActivityCheckbox" :value="item.resume_id" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tbody v-else="checkedinStudentData.length < 1" class="divide-y divide-gray-200">
                                            <tr>
                                                <td class="py-2 sm:py-3 px-2 sm:px-4 truncate transition-transform duration-200 hover:scale-105" colspan="5"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="flex justify-end animate-fade-up">
                                        <button @click="assignActivitySubmit" class="px-4 py-2 mx-2 bg-green-500 text-white rounded">มอบCertificate</button>
                                        <button @click="removeSelectedStudents" class="px-4 py-2 mx-2 bg-red-500 text-white rounded">ลบ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    </div>
</template>
<style scoped>
.canvas-wrapper {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
}

canvas {
    width: 100%;
    height: auto;
    display: block;
}
</style>
