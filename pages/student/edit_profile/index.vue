<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div class="px-6 py-4 border-b border-gray-200">
          <h1 class="text-2xl font-bold text-gray-900">Edit Profile</h1>
          <p class="text-sm text-gray-600 mt-1">Update your personal information</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div class="flex items-center justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span class="ml-3 text-gray-600">Loading profile...</span>
        </div>
      </div>

      <!-- Form -->
      <form v-else @submit.prevent="saveStudent" class="space-y-6">
        <!-- Profile Image Section -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">Profile Picture</h2>
          </div>
          <div class="px-6 py-6">
            <div class="flex items-center space-x-6">
              <div class="shrink-0">
                <img 
                  :src="studentData.student_profile_image || '/default-avatar.png'" 
                  :alt="studentData.student_name"
                  class="h-20 w-20 rounded-full object-cover ring-4 ring-gray-100"
                />
              </div>
              <div class="flex-1">
                <label for="student_profile_image" class="block text-sm font-medium text-gray-700 mb-2">
                  รูปชุดนักศึกษา
                </label>
                <input
                  id="student_profile_image"
                  v-model="studentData.student_profile_image"
                  type="url"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </div>
          <div class="px-6 py-6">
            <div class="flex items-center space-x-6">
              <div class="shrink-0">
                <img 
                  :src="studentData.graduation_gown || '/default-avatar.png'" 
                  :alt="studentData.student_name"
                  class="h-20 w-20 rounded-full object-cover ring-4 ring-gray-100"
                />
              </div>
              <div class="flex-1">
                <label for="graduation_gown" class="block text-sm font-medium text-gray-700 mb-2">
                  รูปชุดครุย
                </label>
                <input
                  id="graduation_gown"
                  v-model="studentData.graduation_gown"
                  type="url"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </div>
          <div class="px-6 py-6">
            <div class="flex items-center space-x-6">
              <div class="shrink-0">
                <img 
                  :src="studentData.suit || '/default-avatar.png'" 
                  :alt="studentData.student_name"
                  class="h-20 w-20 rounded-full object-cover ring-4 ring-gray-100"
                />
              </div>
              <div class="flex-1">
                <label for="suit" class="block text-sm font-medium text-gray-700 mb-2">
                  รูปชุดสุภาพ
                </label>
                <input
                  id="suit"
                  v-model="studentData.suit"
                  type="url"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Basic Information -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">Basic Information</h2>
          </div>
          <div class="px-6 py-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="student_name" class="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span class="text-red-500">*</span>
                </label>
                <input
                  id="student_name"
                  v-model="studentData.student_name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label for="student_name_thai" class="block text-sm font-medium text-gray-700 mb-2">
                  Thai Name
                </label>
                <input
                  id="student_name_thai"
                  v-model="studentData.student_name_thai"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ชื่อภาษาไทย"
                />
              </div>

              <div>
                <label for="student_main_id" class="block text-sm font-medium text-gray-700 mb-2">
                  Student ID
                </label>
                <input
                  id="student_main_id"
                  v-model="studentData.student_main_id"
                  type="text"
                  readonly
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label for="student_email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email <span class="text-red-500">*</span>
                </label>
                <input
                  id="student_email"
                  v-model="studentData.student_email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label for="student_phone" class="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="student_phone"
                  v-model="studentData.student_phone"
                  type="tel"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0801234567"
                />
              </div>

              <div>
                <label for="date_of_birth" class="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  id="date_of_birth"
                  v-model="studentData.date_of_birth"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Personal Details -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">Personal Details</h2>
          </div>
          <div class="px-6 py-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="religion" class="block text-sm font-medium text-gray-700 mb-2">
                  Religion
                </label>
                <input
                  id="religion"
                  v-model="studentData.religion"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your religion"
                />
              </div>

              <div>
                <label for="nationality" class="block text-sm font-medium text-gray-700 mb-2">
                  Nationality
                </label>
                <input
                  id="nationality"
                  v-model="studentData.nationality"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Thai"
                />
              </div>

              <div>
                <label for="ethnicity" class="block text-sm font-medium text-gray-700 mb-2">
                  Ethnicity
                </label>
                <input
                  id="ethnicity"
                  v-model="studentData.ethnicity"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your ethnicity"
                />
              </div>

              <div>
                <label for="position" class="block text-sm font-medium text-gray-700 mb-2">
                  Position
                </label>
                <input
                  id="position"
                  v-model="studentData.position"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your position/role"
                />
              </div>

              <div>
                <label for="weight" class="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  id="weight"
                  v-model="studentData.weight"
                  type="number"
                  step="0.1"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="70.5"
                />
              </div>

              <div>
                <label for="height" class="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  id="height"
                  v-model="studentData.height"
                  type="number"
                  step="0.1"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="175.0"
                />
              </div>

              <div class="md:col-span-2">
                <label for="address" class="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  id="address"
                  v-model="studentData.address"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your full address"
                ></textarea>
              </div>

              <div class="md:col-span-2">
                <label for="hobby" class="block text-sm font-medium text-gray-700 mb-2">
                  Hobbies & Interests
                </label>
                <textarea
                  id="hobby"
                  v-model="studentData.hobby"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Reading, sports, music, etc."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Social Media -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">Social Media & Links</h2>
          </div>
          <div class="px-6 py-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label for="facebook" class="block text-sm font-medium text-gray-700 mb-2">
                  Facebook
                </label>
                <input
                  id="facebook"
                  v-model="studentData.facebook"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your facebook name"
                />
              </div>

              <div>
                <label for="line" class="block text-sm font-medium text-gray-700 mb-2">
                  Line ID
                </label>
                <input
                  id="line"
                  v-model="studentData.line"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your-line-id"
                />
              </div>

              <div>
                <label for="github" class="block text-sm font-medium text-gray-700 mb-2">
                  GitHub
                </label>
                <input
                  id="github"
                  v-model="studentData.github"
                  type="url"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="px-6 py-4 flex justify-end space-x-4">
            <button
              type="button"
              @click="resetForm"
              class="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              :disabled="isSaving"
            >
              Reset
            </button>
            <button
              type="submit"
              class="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              :disabled="isSaving"
            >
              <span v-if="isSaving" class="flex items-center">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </span>
              <span v-else>Save Changes</span>
            </button>
          </div>
        </div>
      </form>

      <!-- Success Message -->
      <div v-if="showSuccess" class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          Profile updated successfully!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "student",
});
import { ref, onMounted } from 'vue'
import { useResumeStore } from '../../../stores/resumeStore'
const resumeStore = useResumeStore()

// State
const studentData = ref({
  student_name: '',
  student_name_thai: '',
  student_main_id: '',
  student_email: '',
  student_phone: '',
  student_profile_image: '',
  graduation_gown: '',
  suit: '',
  religion: '',
  nationality: '',
  date_of_birth: '',
  ethnicity: '',
  hobby: '',
  weight: null,
  height: null,
  address: '',
  facebook: '',
  line: '',
  github: '',
  position: ''
})

const originalData = ref({})
const isLoading = ref(false)
const isSaving = ref(false)
const showSuccess = ref(false)

// Composables
const { $axios } = useNuxtApp()

// Methods
const getStudent = async () => {
  try {
    isLoading.value = true
    const res = await $axios.get('/student/protected')
    
    if (res.data && res.data.student) {
      studentData.value = { ...res.data.student }
      originalData.value = { ...res.data.student }
      console.log('Fetched student data:', studentData.value)
    }
  } catch (error) {
    console.error('Failed to fetch student data:', error)
    // You might want to show an error message to the user
  } finally {
    isLoading.value = false
  }
}

const saveStudent = async () => {
  try {
    isSaving.value = true
    
    // Prepare data for API
    const updateData = {
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
      weight: studentData.value.weight ? parseFloat(studentData.value.weight) : null,
      height: studentData.value.height ? parseFloat(studentData.value.height) : null,
      address: studentData.value.address,
      facebook: studentData.value.facebook,
      line: studentData.value.line,
      github: studentData.value.github,
      position: studentData.value.position
    }

    await $axios.put('/student/editStudent', updateData)
    
    console.log('Student profile updated successfully')
    originalData.value = { ...studentData.value }
    resumeStore.fetchResume();
    
    // Show success message
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
    
  } catch (error) {
    console.error('Failed to save student profile:', error)
    // You might want to show an error message to the user
  } finally {
    isSaving.value = false
  }
}

const resetForm = () => {
  studentData.value = { ...originalData.value }
}

// Lifecycle
onMounted(() => {
  getStudent()
})
</script>