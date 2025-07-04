<template>
  <div class="min-h-screen bg-gray-50 py-4">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="bg-white rounded-lg border border-gray-200 mb-1">
        <div class="px-3 py-3 border-b border-gray-200 sm:px-6">
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900">
            {{ $t("edit_profile.title") }}
          </h1>
          <p class="text-xs sm:text-sm text-gray-600 mt-1">
            {{ $t("edit_profile.subtitle") }}
          </p>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
      >
        <div class="flex items-center justify-center">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
          ></div>
          <span class="ml-3 text-gray-600">{{
            $t("edit_profile.loading")
          }}</span>
        </div>
      </div>

      <!-- Form -->
      <form
        v-else
        @submit.prevent="saveStudent($event)"
        class="space-y-6"
        enctype="multipart/form-data"
      >
        <!-- Profile Image Section -->
        <div class="bg-white rounded-lg border border-gray-200">
          <div class="px-2 py-2 border-b border-gray-200">
            <h2 class="text-md font-semibold text-gray-900">
              {{ $t("edit_profile.profile_image_section") }}
            </h2>
          </div>
          <div class="p-2">
            <div class="flex items-center space-x-6">
              <div class="flex items-center gap-5 w-full">
                <img
                  v-if="previewImage_student_profile_image"
                  :src="previewImage_student_profile_image"
                  alt="Preview"
                  class="h-12 w-12 rounded-full object-cover ring-4 ring-gray-100"
                />

                <img
                  v-else-if="studentData.student_profile_image"
                  :src="studentData.student_profile_image"
                  :alt="studentData.student_name"
                  class="h-12 w-12 rounded-full object-cover ring-4 ring-gray-100"
                />

                <NuxtImg
                  v-else
                  src="./images/avatars.png"
                  class="h-12 w-12 rounded-full object-cover ring-4 ring-gray-100"
                />
                <div class="flex-1">
                  <div
                    class="border border-gray-300 rounded-lg flex justify-start items-center p-2"
                  >
                    <input
                      id="student_profile_image"
                      type="file"
                      name="student_profile_image"
                      class="hidden"
                      @change="handlelImageInputChange"
                    />
                    <label
                      for="student_profile_image"
                      class="text-xs font-medium text-gray-700 flex justify-start items-center hover:cursor-pointer hover:bg-gray-100 p-1 px-2 rounded-2xl"
                    >
                      {{ $t("edit_profile.add_student_uniform") }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-2">
            <div class="flex items-center space-x-6">
              <div class="flex items-center gap-5 w-full">
                <img
                  v-if="previewImage_graduation_gown"
                  :src="previewImage_graduation_gown"
                  alt="Preview"
                  class="h-12 w-12 rounded-full object-cover ring-4 ring-gray-100"
                />
                <img
                  v-else-if="studentData.graduation_gown"
                  :src="studentData.graduation_gown"
                  :alt="studentData.student_name"
                  class="h-12 w-12 rounded-full object-cover ring-4 ring-gray-100"
                />
                <NuxtImg
                  v-else
                  src="./images/avatars.png"
                  class="h-12 w-12 rounded-full object-cover ring-4 ring-gray-100"
                />
                <div class="flex-1">
                  <div
                    class="border border-gray-300 rounded-lg flex justify-start items-center p-2"
                  >
                    <input
                      id="graduation_gown"
                      type="file"
                      name="graduation_gown"
                      class="hidden"
                      @change="handlelImageInputChange"
                    />
                    <label
                      for="graduation_gown"
                      class="text-xs font-medium text-gray-700 flex justify-start items-center hover:cursor-pointer hover:bg-gray-100 px-2 rounded-2xl"
                    >
                      {{ $t("edit_profile.add_graduation_gown") }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-2">
            <div class="flex items-center space-x-6">
              <div class="flex items-center gap-5 w-full">
                <img
                  v-if="previewImage_suit"
                  :src="previewImage_suit"
                  alt="Preview"
                  class="h-12 w-12 rounded-full object-cover ring-4 ring-gray-100"
                />
                <img
                  v-else-if="studentData.suit"
                  :src="studentData.suit"
                  :alt="studentData.student_name"
                  class="h-12 w-12 rounded-full object-cover ring-4 ring-gray-100"
                />
                <NuxtImg
                  v-else
                  src="./images/avatars.png"
                  class="h-12 w-12 rounded-full object-cover ring-4 ring-gray-100"
                />
                <div class="flex-1">
                  <div
                    class="border border-gray-300 rounded-lg flex justify-start items-center p-2"
                  >
                    <input
                      id="suit"
                      type="file"
                      name="suit"
                      class="hidden"
                      @change="handlelImageInputChange"
                    />
                    <label
                      for="suit"
                      class="text-xs font-medium text-gray-700 flex justify-start items-center hover:cursor-pointer hover:bg-gray-100 p-1 px-2 rounded-2xl"
                    >
                      {{ $t("edit_profile.add_suit") }}
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
              {{ $t("edit_profile.basic_info_section") }}
            </h2>
          </div>
          <div class="px-2 py-2">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label
                  for="student_name"
                  class="block text-sm font-normal text-gray-700 mb-2"
                >
                  {{ $t("edit_profile.name_th") }}
                  <span class="text-red-500">*</span>
                </label>
                <input
                  id="student_name"
                  v-model="studentData.student_name"
                  type="text"
                  required
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="$t('edit_profile.name_th')"
                />
              </div>
              <div>
                <label
                  for="student_name_thai"
                  class="block text-sm font-normal text-gray-700 mb-2"
                >
                  {{ $t("edit_profile.name_en") }}
                </label>
                <input
                  id="student_name_thai"
                  v-model="studentData.student_name_thai"
                  type="text"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="$t('edit_profile.name_en')"
                />
              </div>
              <div>
                <label
                  for="student_main_id"
                  class="block text-sm font-normal text-gray-700 mb-2"
                >
                  {{ $t("edit_profile.student_id") }}
                </label>
                <input
                  id="student_main_id"
                  v-model="studentData.student_main_id"
                  type="text"
                  readonly
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  for="student_email"
                  class="block text-sm font-normal text-gray-700 mb-2"
                >
                  {{ $t("edit_profile.email") }}
                  <span class="text-red-500">*</span>
                </label>
                <input
                  id="student_email"
                  v-model="studentData.student_email"
                  type="email"
                  required
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label
                  for="student_phone"
                  class="block text-sm font-normal text-gray-700 mb-2"
                >
                  {{ $t("edit_profile.phone") }}
                </label>
                <input
                  id="student_phone"
                  v-model="studentData.student_phone"
                  type="tel"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0801234567"
                />
              </div>
              <div>
                <label
                  for="date_of_birth"
                  class="block text-sm font-normal text-gray-700 mb-2"
                >
                  {{ $t("edit_profile.dob") }}
                </label>
                <input
                  id="date_of_birth"
                  v-model="formattedDateOfBirth"
                  type="date"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Personal Details -->
        <div class="bg-white rounded-lg border border-gray-200">
          <div class="px-2 py-2 border-b border-gray-200">
            <h2 class="text-md font-normal text-gray-900">
              {{ $t("edit_profile.personal_info_section") }}
            </h2>
          </div>
          <div class="px-2 py-2">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label
                  for="religion"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  {{ $t("edit_profile.religion") }}
                </label>
                <input
                  id="religion"
                  v-model="studentData.religion"
                  type="text"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="$t('edit_profile.religion')"
                />
              </div>
              <div>
                <label
                  for="nationality"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  {{ $t("edit_profile.nationality") }}
                </label>
                <input
                  id="nationality"
                  v-model="studentData.nationality"
                  type="text"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="$t('edit_profile.nationality')"
                />
              </div>
              <div>
                <label
                  for="ethnicity"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  {{ $t("edit_profile.ethnicity") }}
                </label>
                <input
                  id="ethnicity"
                  v-model="studentData.ethnicity"
                  type="text"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="$t('edit_profile.ethnicity')"
                />
              </div>
              <div>
                <label
                  for="position"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  {{ $t("edit_profile.position") }}
                </label>
                <input
                  id="position"
                  v-model="studentData.position"
                  type="text"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="$t('edit_profile.position')"
                />
              </div>
              <div>
                <label
                  for="weight"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  {{ $t("edit_profile.weight") }}
                </label>
                <input
                  id="weight"
                  v-model="studentData.weight"
                  type="number"
                  step="0.1"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="$t('edit_profile.weight')"
                />
              </div>
              <div>
                <label
                  for="height"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  {{ $t("edit_profile.height") }}
                </label>
                <input
                  id="height"
                  v-model="studentData.height"
                  type="number"
                  step="0.1"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="$t('edit_profile.height')"
                />
              </div>
              <div class="md:col-span-2">
                <label
                  for="address"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  {{ $t("edit_profile.address") }}
                </label>
                <textarea
                  id="address"
                  v-model="studentData.address"
                  rows="3"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="$t('edit_profile.address')"
                ></textarea>
              </div>
              <div class="md:col-span-2">
                <label
                  for="hobby"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  {{ $t("edit_profile.hobby") }}
                </label>
                <textarea
                  id="hobby"
                  v-model="studentData.hobby"
                  rows="3"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="$t('edit_profile.hobby')"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Social Media -->
        <div class="bg-white rounded-lg border border-gray-200">
          <div class="px-2 py-2 border-b border-gray-200">
            <h2 class="text-md font-normal text-gray-900">
              {{ $t("edit_profile.social_media_section") }}
            </h2>
          </div>
          <div class="px-2 py-2">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>
                <label
                  for="facebook"
                  class="block text-xs font-medium text-gray-700 mb-2"
                >
                  {{ $t("edit_profile.facebook") }}
                </label>
                <input
                  id="facebook"
                  v-model="studentData.facebook"
                  type="text"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="$t('edit_profile.facebook')"
                />
              </div>
              <div>
                <label
                  for="line"
                  class="block text-xs font-medium text-gray-700 mb-2"
                >
                  {{ $t("edit_profile.line") }}
                </label>
                <input
                  id="line"
                  v-model="studentData.line"
                  type="text"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="$t('edit_profile.line')"
                />
              </div>
              <div>
                <label
                  for="github"
                  class="block text-xs font-medium text-gray-700 mb-2"
                >
                  {{ $t("edit_profile.github") }}
                </label>
                <input
                  id="github"
                  v-model="studentData.github"
                  type="url"
                  class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="$t('edit_profile.github')"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="bg-white rounded-lg border border-gray-200">
          <div class="px-6 py-4 flex justify-center md:justify-end space-x-4">
            <button
              type="button"
              @click="resetForm"
              class="px-6 py-2 border border-gray-300 rounded-md text-xs md:text-sm lg:text-md font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              :disabled="isSaving"
            >
              {{ $t("edit_profile.reset") }}
            </button>
            <button
              type="submit"
              class="px-6 py-2 border border-transparent rounded-md text-xs md:text-sm lg:text-md font-medium text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              :disabled="isSaving"
            >
              <span v-if="isSaving" class="flex items-center">
                <div
                  class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                ></div>
                {{ $t("edit_profile.saving") }}
              </span>
              <span v-else>{{ $t("edit_profile.save") }}</span>
            </button>
          </div>
        </div>
      </form>

      <!-- Success Message (Top Right) -->
      <div
        v-if="showSuccess"
        class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 z-50"
      >
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            ></path>
          </svg>
          {{ $t("edit_profile.success") }}
        </div>
      </div>
      <div
        v-if="showSuccess_reset"
        class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 z-50"
      >
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            ></path>
          </svg>
          {{ $t("edit_profile.showSuccess_reset") }}
        </div>
      </div>

      <!-- Error Message (Top Right) -->
      <div
        v-if="showError"
        class="fixed top-20 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 z-50"
      >
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 112 0v4a1 1 0 01-2 0V6zm1 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              clip-rule="evenodd"
            ></path>
          </svg>
          {{ errorDetail || $t("edit_profile.error") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "student",
});
import imageCompression from "browser-image-compression";
import { ref, onMounted, computed } from "vue";
import { useResumeStore } from "../../../stores/resumeStore";
const resumeStore = useResumeStore();

const previewImage_student_profile_image = ref(null);
const previewImage_graduation_gown = ref(null);
const previewImage_suit = ref(null);

const studentData = ref({
  student_name: "",
  student_name_thai: "",
  student_main_id: "",
  student_email: "",
  student_phone: "",
  student_profile_image: "" || null,
  graduation_gown: "" || null,
  suit: "" || null,
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
const showSuccess_reset = ref(false);
const showError = ref(false);
const errorDetail = ref(null);

const { $axios } = useNuxtApp();

// ดึงข้อมูลนักศึกษา
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
  } finally {
    isLoading.value = false;
  }
};

// handle การเลือกไฟล์รูป
const handlelImageInputChange = async (event) => {
  try {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    const MAX_FILE_SIZE = 100 * 1024 * 1024; // 5MB
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

      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      });
      const previewUrl = URL.createObjectURL(compressedFile);

      if (event.target.name === "student_profile_image") {
        selectedImage.value.student_profile_image = compressedFile;
        previewImage_student_profile_image.value = previewUrl;
      } else if (event.target.name === "graduation_gown") {
        selectedImage.value.graduation_gown = compressedFile;
        previewImage_graduation_gown.value = previewUrl;
      } else if (event.target.name === "suit") {
        selectedImage.value.suit = compressedFile;
        previewImage_suit.value = previewUrl;
      }
    }
  } catch (error) {
    showNotiError("ประเภทไฟล์ไม่ถูกต้อง กรุณาใช้ .png .jpeg ");
    console.error(error);
  }
};

// ฟังก์ชันบันทึกข้อมูล
const saveStudent = async (event) => {
  try {
    isSaving.value = true;

    // เช็คขนาดไฟล์รวมก่อนส่ง (ป้องกัน 413)
    const MAX_TOTAL_SIZE = 100 * 1024 * 1024; // 8MB (ปรับตาม server)
    let totalSize = 0;
    for (const file of Object.values(selectedImage.value)) {
      if (file) totalSize += file.size;
    }
    if (totalSize > MAX_TOTAL_SIZE) {
      showNotiError("ไฟล์รวมกันใหญ่เกิน 8MB กรุณาเลือกไฟล์ที่เล็กลง");
      isSaving.value = false;
      return;
    }

    // Prepare data for API
    const formData = new FormData();
    for (const [key, file] of Object.entries(selectedImage.value)) {
      if (!file) continue;
      formData.append(key, file);
    }
    const updateData = JSON.stringify({
      student_name: studentData.value.student_name,
      student_name_thai: studentData.value.student_name_thai,
      student_email: studentData.value.student_email,
      student_phone: studentData.value.student_phone,
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

    const updatedResult = await $axios.post("/student/edit_profile", formData);
    const uploadedImageResult = await updatedResult.data;
    if (uploadedImageResult.success) {
      for (const imageField in uploadedImageResult.imagesData) {
        if (imageField in studentData.value) {
          studentData.value[imageField] =
            uploadedImageResult.imagesData[imageField];
          event.target.querySelector(`#${imageField}`).value = null;
        }
      }
    }

    originalData.value = { ...studentData.value };
    resumeStore.fetchResume();
    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);
  } catch (error) {
    if (error.response && error.response.status === 413) {
      showNotiError("ขนาดไฟล์ที่อัปโหลดใหญ่เกินไป (413)");
    } else {
      showNotiError(
        "บันทึกข้อมูลไม่สำเร็จ ขนาดเเละความชัดของไฟล์เยอะเกินไป กรุณาลองใหม่อีกครั้ง"
      );
    }
    console.error("Failed to save student profile:", error);
  } finally {
    isSaving.value = false;
  }
};

// แปลงวันเกิดสำหรับ input type="date"
const formattedDateOfBirth = computed({
  get() {
    return studentData.value.date_of_birth?.split(" ")[0] || "";
  },
  set(value) {
    studentData.value.date_of_birth = value ? `${value} 00:00:00` : "";
  },
});

// รีเซ็ตฟอร์ม
const resetForm = () => {
  studentData.value = { ...originalData.value };
  selectedImage.value = {
    student_profile_image: null,
    graduation_gown: null,
    suit: null,
  };
  previewImage_student_profile_image.value = null;
  previewImage_graduation_gown.value = null;
  previewImage_suit.value = null;
  showSuccess_reset.value = true;
  setTimeout(() => {
    showSuccess_reset.value = false;
  }, 3000);
};

// แสดง error
const showNotiError = async (detail) => {
  errorDetail.value = detail;
  showError.value = true;
  setTimeout(() => {
    showError.value = false;
  }, 4000);
};

// Lifecycle
onMounted(() => {
  getStudent();
});
</script>
