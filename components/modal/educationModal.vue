<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    @click.self="close"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 overflow-hidden max-h-[90vh] flex flex-col"
    >
      <!-- Header -->
      <div
        class="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white"
      >
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold">Education History</h2>
            <p class="text-blue-100 mt-1">Manage your educational background</p>
          </div>
          <button
            @click="close"
            class="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 cursor-pointer"
            aria-label="Close modal"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-8">
        <div v-if="isLoading" class="flex items-center justify-center py-12">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
          ></div>
          <span class="ml-3 text-gray-600">Loading education data...</span>
        </div>

        <div v-else class="space-y-6">
          <!-- Education Entries -->
          <div
            v-for="(education, index) in educationData"
            :key="education.education_history_id"
            class="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-lg font-semibold text-gray-800">
                Education #{{ index + 1 }}
              </h3>
              <button
                @click="removeEducation(index, education.education_history_id)"
                class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all duration-300 cursor-pointer transform hover:scale-120 ease-in-out"
                title="Remove education"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700"
                  >Institution</label
                >
                <input
                  v-model="education.education_history_institution"
                  type="text"
                  placeholder="Enter institution name"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700"
                  >Major/Degree</label
                >
                <input
                  v-model="education.education_history_major"
                  type="text"
                  placeholder="Enter major or degree"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700"
                  >Start Year</label
                >
                <input
                  v-model="education.education_history_start_year"
                  type="number"
                  placeholder="e.g., 2020"
                  min="1900"
                  max="2030"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700"
                  >GPA</label
                >
                <input
                  v-model="education.education_history_gpa"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 3.75"
                  min="0"
                  max="4"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div class="md:col-span-2 space-y-2">
                <label class="block text-sm font-medium text-gray-700"
                  >Notes</label
                >
                <textarea
                  v-model="education.education_history_notes"
                  rows="3"
                  placeholder="Additional notes, achievements, or relevant information"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Add New Education Button -->
          <div
            class="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
            @click="addNewEducation"
            :class="{ 'opacity-50 cursor-not-allowed': isSaving }"
          >
            <div class="flex flex-col items-center justify-center space-y-3">
              <div
                class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors duration-200"
              >
                <svg
                  class="w-8 h-8 text-blue-600"
                  :class="{ 'animate-spin': isSaving }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    v-if="!isSaving"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  ></path>
                </svg>
              </div>
              <div class="text-center">
                <h3 class="text-lg font-semibold text-gray-700">
                  {{ isSaving ? "Adding Education..." : "Add New Education" }}
                </h3>
                <p class="text-gray-500 text-sm mt-1">
                  {{
                    isSaving
                      ? "Please wait..."
                      : "Click to add another education entry"
                  }}
                </p>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="educationData.length === 0" class="text-center py-12">
            <div
              class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-700 mb-2">
              No Education Entries
            </h3>
            <p class="text-gray-500">
              Start by adding your first education entry
            </p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-gray-50 px-8 py-6 border-t border-gray-200">
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-500">
            {{ educationData.length }} skill{{
              educationData.length !== 1 ? "s" : ""
            }}
            total
          </div>
          <div class="flex space-x-3">
            <button
              @click="close"
              class="px-6 py-3 text-gray-100 hover:text-white bg-gray-600 rounded-lg font-medium transition-colors duration-200 cursor-pointer hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              @click="saveEducation"
              :disabled="isSaving"
              class="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
              :class="{ 'animate-pulse': isSaving }"
            >
              {{ isSaving ? "Saving..." : "Save Changes" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useResumeStore } from "../../stores/resumeStore";
const resumeStore = useResumeStore();

const emit = defineEmits(["close", "save"]);

const educationData = ref([]);
const isLoading = ref(true);
const isSaving = ref(false);
const { $axios } = useNuxtApp();
const { showAlert } = useAlert();
const { handleApiError } = useErrorHandler();

const getEducation = async () => {
  try {
    isLoading.value = true;
    const res = await $axios.get("/student/education");
    educationData.value = res.data || [];
    console.log("Fetched education:", educationData.value);
  } catch (error) {
    console.error("Failed to fetch education:", error);
    educationData.value = [];
    handleApiError(error, "เกิดข้อผิดพลาดในการดึงข้อมูลการศึกษา");
  } finally {
    isLoading.value = false;
  }
};

const addNewEducation = async () => {
  if (isSaving.value) return;

  try {
    isSaving.value = true;
    // Call the increaseEducation API to add a new education entry
    const res = await $axios.post("/resume/increase_education");
    console.log("Added new Education:", res.data);

    // Refresh the education list after adding
    await getEducation();
  } catch (error) {
    console.error("Failed to add new Education:", error);
    handleApiError(error, "เกิดข้อผิดพลาดในการเพิ่มข้อมูลการศึกษา");
  } finally {
    isSaving.value = false;
  }
};

const removeEducation = async (index, education_id) => {
  try {
    await $axios.delete(`/resume/delete_education/${education_id}`);
    // Remove from local array
    educationData.value.splice(index, 1);
    console.log("Education removed successfully");
  } catch (error) {
    console.error("Failed to remove education:", error);
    handleApiError(error, "เกิดข้อผิดพลาดในการลบข้อมูลการศึกษา");
    // Refresh the list in case of error to sync with server
    await getEducation();
  }
};

const parseStr = (value) => {
  return value !== null && value !== undefined ? String(value) : null;
};

const saveEducation = async () => {
  try {
    isSaving.value = true;

    // Save all education entries
    for (const education of educationData.value) {
      await $axios.put(
        `/resume/education_history/${education.education_history_id}`,
        {
          education_history_institution:
            education.education_history_institution,
          education_history_major: education.education_history_major,
          education_history_start_year: parseStr(
            education.education_history_start_year
          ),
          education_history_gpa: parseStr(education.education_history_gpa),
          education_history_notes: education.education_history_notes,
        }
      );
    }
    showAlert("บันทึกข้อมูลสำเร็จ", "success");
    console.log("Education data saved successfully");
    emit("save", educationData.value);
    close();
  } catch (error) {
    console.error("Failed to save education:", error);
    handleApiError(error, "เกิดข้อผิดพลาดในการบันทึกข้อมูลการศึกษา");
  } finally {
    isSaving.value = false;
  }
};

function close() {
  emit("close");
  resumeStore.fetchResume();
}

onMounted(() => {
  getEducation();
});
</script>
