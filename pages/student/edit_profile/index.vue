<template>
  <div class="min-h-screen bg-gray-50 py-4">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="bg-white rounded-lg border border-gray-200 mb-1">
        <div class="px-3 py-3 border-b border-gray-200 sm:px-6">
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900">
            แก้ไขโปรไฟล์
          </h1>
          <p class="text-xs sm:text-sm text-gray-600 mt-1">
            อัปเดตข้อมูลส่วนตัวของคุณ
          </p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div class="flex items-center justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span class="ml-3 text-gray-600">กำลังโหลด...</span>
        </div>
      </div>

      <!-- Form -->
      <form v-else @submit.prevent="saveStudent($event)" class="space-y-6">
        <!-- Profile Image Section -->
        <div class="bg-white rounded-lg border border-gray-200">
          <div class="px-2 py-2 border-b border-gray-200">
            <h2 class="text-md font-semibold text-gray-900">
              จัดการรูปโปรไฟล์
            </h2>
          </div>

          <div class="p-2">
            <div class="flex items-center space-x-6">
              <div class="flex items-center gap-5 w-full">

                <img v-if="previewImag_student_profile_imagee" :src="previewImag_student_profile_imagee" alt="Preview"
                  class="h-12 w-12 rounded-full object-cover ring-4 ring-gray-100" />
                <img v-else-if="studentData.student_profile_image" :src="studentData.student_profile_image"
                  :alt="studentData.student_name" class="h-12 w-12 rounded-full object-cover ring-4 ring-gray-100" />
                <NuxtImg v-else src="./images/avatars.png"
                  class="h-12 w-12 rounded-full object-cover ring-4 ring-gray-100" />



                <div class="flex-1">
                  <div class="border border-gray-300 rounded-lg flex justify-start items-center p-2">
                    <input id="student_profile_image" type="file" name="student_profile_image" class="hidden"
                      placeholder="https://example.com/image.jpg" @change="handlelImageInputChange" />
                    <label for="student_profile_image"
                      class="text-xs font-medium text-gray-700 flex justify-start items-center">
                      เพิ่มรูปชุดนักศึกษา
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="p-2">
            <div class="flex items-center space-x-6">
              <div class="flex items-center gap-5 w-full">

                <img v-if="previewImage_graduation_gown" :src="previewImage_graduation_gown" alt="Preview"
                  class="h-12 w-12 rounded-full object-cover ring-4 ring-gray-100" />
                <img v-else-if="studentData.graduation_gown" :src="studentData.graduation_gown"
                  :alt="studentData.student_name" class="h-12 w-12 rounded-full object-cover ring-4 ring-gray-100" />
                <NuxtImg v-else src="./images/avatars.png"
                  class="h-12 w-12 rounded-full object-cover ring-4 ring-gray-100" />

                <div class="flex-1">
                  <div class="border border-gray-300 rounded-lg flex justify-start items-center p-2">
                    <input id="graduation_gown" type="file" name="graduation_gown" class="hidden"
                      @change="handlelImageInputChange" />
                    <label for="graduation_gown"
                      class="text-xs font-medium text-gray-700 flex justify-start items-center">
                      เพิ่มรูปชุดครุย
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="p-2">
            <div class="flex items-center space-x-6">
              <div class="flex items-center gap-5 w-full">
                <img v-if="previewImage_suit" :src="previewImage_suit" alt="Preview"
                  class="h-12 w-12 rounded-full object-cover ring-4 ring-gray-100" />
                <img v-else-if="studentData.suit" :src="studentData.suit" :alt="studentData.student_name"
                  class="h-12 w-12 rounded-full object-cover ring-4 ring-gray-100" />
                <NuxtImg v-else src="./images/avatars.png"
                  class="h-12 w-12 rounded-full object-cover ring-4 ring-gray-100" />

                <div class="flex-1">
                  <div class="border border-gray-300 rounded-lg flex justify-start items-center p-2">
                    <input id="suit" type="file" name="suit" class="hidden" @change="handlelImageInputChange" />
                    <label for="suit"
                      class="text-xs font-medium text-gray-700 flex justify-start items-center">
                      เพิ่มรูปชุดสุภาพ
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Basic Information -->
        <div class="bg-white rounded-lg border border-gray-200">
          <div class="px-2 py-2 border-b border-gray-200">
            <h2 class="text-md font-normal text-gray-900">
              จัดการข้อมูลพื้นฐาน
            </h2>
          </div>
          <div class="px-2 py-2">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label for="student_name" class="block text-sm font-normal text-gray-700 mb-2">
                  ชื่อ-นามสกุล {{ "( ภาษาไทย )" }}
                  <span class="text-red-500">*</span>
                </label>
                <input id="student_name" v-model="studentData.student_name" type="text" required
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="กรอกชื่อ-นามสกุล" />
              </div>

              <div>
                <label for="student_name_thai" class="block text-sm font-normal text-gray-700 mb-2">
                  ชื่อ-นามสกุล {{ "( อังกฤษ )" }}
                </label>
                <input id="student_name_thai" v-model="studentData.student_name_thai" type="text"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ชื่อภาษาไทย" />
              </div>

              <div>
                <label for="student_main_id" class="block text-sm font-normal text-gray-700 mb-2">
                  รหัสนักศึกษา
                </label>
                <input id="student_main_id" v-model="studentData.student_main_id" type="text" readonly
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>

              <div>
                <label for="student_email" class="block text-sm font-normal text-gray-700 mb-2">
                  อีเมล <span class="text-red-500">*</span>
                </label>
                <input id="student_email" v-model="studentData.student_email" type="email" required
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your.email@example.com" />
              </div>

              <div>
                <label for="student_phone" class="block text-sm font-normal text-gray-700 mb-2">
                  เบอร์โทรศัพท์
                </label>
                <input id="student_phone" v-model="studentData.student_phone" type="tel"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0801234567" />
              </div>

              <div>
                <label for="date_of_birth" class="block text-sm font-normal text-gray-700 mb-2">
                  วันเกิด
                </label>

                <input id="date_of_birth" v-model="formattedDateOfBirth" type="date"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </div>
        </div>

        <!-- Personal Details -->
        <div class="bg-white rounded-lg border border-gray-200">
          <div class="px-2 py-2 border-b border-gray-200">
            <h2 class="text-md font-normal text-gray-900">ข้อมูลส่วนตัว</h2>
          </div>
          <div class="px-2 py-2">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label for="religion" class="block text-sm font-medium text-gray-700 mb-2">
                  ศาสนา
                </label>
                <input id="religion" v-model="studentData.religion" type="text"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ศาสนาของคุณ" />
              </div>

              <div>
                <label for="nationality" class="block text-sm font-medium text-gray-700 mb-2">
                  สัญชาติ
                </label>
                <input id="nationality" v-model="studentData.nationality" type="text"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="เช่น ไทย" />
              </div>

              <div>
                <label for="ethnicity" class="block text-sm font-medium text-gray-700 mb-2">
                  เชื้อชาติ
                </label>
                <input id="ethnicity" v-model="studentData.ethnicity" type="text"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="เชื้อชาติของคุณ" />
              </div>

              <div>
                <label for="position" class="block text-sm font-medium text-gray-700 mb-2">
                  ตำแหน่ง/บทบาท
                </label>
                <input id="position" v-model="studentData.position" type="text"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ตำแหน่งหรือบทบาทของคุณ" />
              </div>

              <div>
                <label for="weight" class="block text-sm font-medium text-gray-700 mb-2">
                  น้ำหนัก (กก.)
                </label>
                <input id="weight" v-model="studentData.weight" type="number" step="0.1"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="เช่น 70.5" />
              </div>

              <div>
                <label for="height" class="block text-sm font-medium text-gray-700 mb-2">
                  ส่วนสูง (ซม.)
                </label>
                <input id="height" v-model="studentData.height" type="number" step="0.1"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="เช่น 175.0" />
              </div>

              <div class="md:col-span-2">
                <label for="address" class="block text-sm font-medium text-gray-700 mb-2">
                  ที่อยู่
                </label>
                <textarea id="address" v-model="studentData.address" rows="3"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ที่อยู่ปัจจุบันของคุณ"></textarea>
              </div>

              <div class="md:col-span-2">
                <label for="hobby" class="block text-sm font-medium text-gray-700 mb-2">
                  งานอดิเรกและความสนใจ
                </label>
                <textarea id="hobby" v-model="studentData.hobby" rows="3"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="เช่น อ่านหนังสือ กีฬา ดนตรี ฯลฯ"></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Social Media -->
        <div class="bg-white rounded-lg border border-gray-200">
          <div class="px-2 py-2 border-b border-gray-200">
            <h2 class="text-md font-normal text-gray-900">
              โซเชียลมีเดีย & ลิงก์
            </h2>
          </div>
          <div class="px-2 py-2">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>
                <label for="facebook" class="block text-xs font-medium text-gray-700 mb-2">
                  facebook
                </label>
                <input id="facebook" v-model="studentData.facebook" type="text"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ชื่อเฟซบุ๊กของคุณ" />
              </div>

              <div>
                <label for="line" class="block text-xs font-medium text-gray-700 mb-2">
                  line
                </label>
                <input id="line" v-model="studentData.line" type="text"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ไลน์ไอดีของคุณ" />
              </div>

              <div>
                <label for="github" class="block text-xs font-medium text-gray-700 mb-2">
                  github
                </label>
                <input id="github" v-model="studentData.github" type="url"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://github.com/username" />
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="bg-white rounded-lg border border-gray-200">
          <div class="px-6 py-4 flex justify-center md:justify-end space-x-4">
            <button type="button" @click="resetForm"
              class="px-6 py-2 border border-gray-300 rounded-md text-xs md:text-sm lg:text-md font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              :disabled="isSaving">
              ค่าเริ่มต้น
            </button>
            <button type="submit"
              class="px-6 py-2 border border-transparent rounded-md text-xs md:text-sm lg:text-md font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              :disabled="isSaving">
              <span v-if="isSaving" class="flex items-center">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                กำลังบันทึกการเปลี่ยนเเปลง...
              </span>
              <span v-else>บันทึกการเปลี่ยนเเปลง</span>
            </button>
          </div>
        </div>
      </form>

      <!-- Success Message (Top Right) -->
      <div v-if="showSuccess"
        class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 z-50">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"></path>
          </svg>
          บันทึกข้อมูลสำเร็จ!
        </div>
      </div>

      <!-- Error Message (Top Right) -->
      <div v-if="showError"
        class="fixed top-20 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 z-50">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 112 0v4a1 1 0 01-2 0V6zm1 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              clip-rule="evenodd"></path>
          </svg>
          {{ errorDetail }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "student",
});

import { ref, onMounted } from "vue";
import { useResumeStore } from "../../../stores/resumeStore";
const resumeStore = useResumeStore();
const previewImag_student_profile_imagee = ref(null);
const previewImage_graduation_gown = ref(null);
const previewImage_suit = ref(null);
// State
const studentData = ref({
  student_name: "",
  student_name_thai: "",
  student_main_id: "",
  student_email: "",
  student_phone: "",
  student_profile_image: "" | null,
  graduation_gown: "" | null,
  suit: "" | null,
  religion: "",
  nationality: "",
  date_of_birth: "",
  ethnicity: "",
  hobby: "",
  weight: null,
  height: null,
  address: "",
  facebook: "",
  line: "",
  github: "",
  position: "",
});
const selectedImage = ref({
  student_profile_image: null,
  graduation_gown: null,
  suit: null,
});
const originalData = ref({});
const isLoading = ref(false);
const isSaving = ref(false);
const showSuccess = ref(false);
const showError = ref(false);
const errorDetail = ref(null);
// Composables
const { $axios } = useNuxtApp();

// Methods
const getStudent = async () => {
  try {
    isLoading.value = true;
    const res = await $axios.get("/student/protected");

    if (res.data && res.data.student) {
      studentData.value = { ...res.data.student };
      originalData.value = { ...res.data.student };
      console.log("Fetched student data:", studentData.value);
    }
  } catch (error) {
    console.error("Failed to fetch student data:", error);
    // You might want to show an error message to the user
  } finally {
    isLoading.value = false;
  }
};

const handlelImageInputChange = async (event) => {
  try {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        event.target.value = null;
        throw `${file.name} : File type ${file.type
        } not allowed. Allowed: ${allowedTypes.join(", ")}`;
      }
      if (file.size > MAX_FILE_SIZE) {
        event.target.value = null;
        throw `${file.name} : is larger than 5 MB : This file is ${(
          file.size /
          (1024 * 1024)
        ).toFixed(2)} MB`;
      }
      if (event.target.name === "student_profile_image") {
        selectedImage.value.student_profile_image = event.target.files[0];
        previewImag_student_profile_imagee.value = URL.createObjectURL(file);
      }
      if (event.target.name === "graduation_gown") {
        selectedImage.value.graduation_gown = event.target.files[0];
        previewImage_graduation_gown.value = URL.createObjectURL(file);

      }
      if (event.target.name === "suit") {
        selectedImage.value.suit = event.target.files[0];
        previewImage_suit.value = URL.createObjectURL(file);

      }
    }
  } catch (error) {
    showNotiError(error);
    console.error(error);
  }
};

const saveStudent = async (event) => {
  try {
    isSaving.value = true;

    // Prepare data for API
    const formData = new FormData();
    // loop image data in selectedImages and append to formData kub
    for (const [key, file] of Object.entries(selectedImage.value)) {
      if (!file) continue;
      console.log(file);
      formData.append(key, file);
    }
    const updateData = JSON.stringify({
      student_name: studentData.value.student_name,
      student_name_thai: studentData.value.student_name_thai,
      student_email: studentData.value.student_email,
      student_phone: studentData.value.student_phone,
      student_profile_image: studentData.value.student_profile_image,
      graduation_gown: studentData.value.graduation_gown,
      suit: studentData.value.suit,
      religion: studentData.value.religion,
      nationality: studentData.value.nationality,
      date_of_birth: studentData.value.date_of_birth,
      ethnicity: studentData.value.ethnicity,
      hobby: studentData.value.hobby,
      weight: studentData.value.weight
        ? parseFloat(studentData.value.weight)
        : null,
      height: studentData.value.height
        ? parseFloat(studentData.value.height)
        : null,
      address: studentData.value.address,
      facebook: studentData.value.facebook,
      line: studentData.value.line,
      github: studentData.value.github,
      position: studentData.value.position,
    });
    formData.append("student_profile_data", updateData);
    const updatedResult = await $axios.put("/student/edit_profile", formData);
    const uploadedImageResult = await updatedResult.data;
    // check uploadedImage & Update result then
    // loop to set image name in to studentData ref kub
    if (uploadedImageResult.success) {
      for (const imageField in uploadedImageResult.imagesData) {
        if (imageField in studentData.value) {
          studentData.value[imageField] =
            uploadedImageResult.imagesData[imageField];
          event.target.querySelector(`#${imageField}`).value = null;
        }
      }
    }

    console.log("Student profile updated successfully");
    originalData.value = { ...studentData.value };
    resumeStore.fetchResume();

    // Show success message
    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);
  } catch (error) {
    console.error("Failed to save student profile:", error);
    // You might want to show an error message to the user
  } finally {
    isSaving.value = false;
  }
};

const formattedDateOfBirth = computed({
  get() {
    return studentData.value.date_of_birth?.split(" ")[0] || "";
  },
  set(value) {
    // Keep full datetime format if needed
    studentData.value.date_of_birth = value ? `${value} 00:00:00` : "";
  },
});

const resetForm = () => {
  bnm, (studentData.value = { ...originalData.value });
};
const showNotiError = async (detail) => {
  errorDetail.value = detail;
  showError.value = true;

  setInterval(() => {
    showError.value = false;
  }, 4000);
};
// Lifecycle
onMounted(() => {
  getStudent();
});
</script>
