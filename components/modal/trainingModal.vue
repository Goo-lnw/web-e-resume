<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" @click.self="close">
    <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold">Training</h2>
            <p class="text-blue-100 text-sm mt-1">Manage your training and certifications</p>
          </div>
          <button @click="close" class="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 cursor-pointer" aria-label="Close modal">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
        <div class="space-y-4">
          <!-- Existing Training -->
          <div
            v-for="(training, index) in trainingData"
            :key="training.training_history_id || `new-${index}`"
            class="group bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-300 rounded-xl p-5 transition-all duration-300 hover:shadow-md"
          >
            <!-- Training Header -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span class="text-white font-bold text-lg">{{ index + 1 }}</span>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-800">
                    {{ training.training_history_course_name || `Training ${index + 1}` }}
                  </h3>
                  <p class="text-sm text-gray-500">Configure your training details</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  @click="removeTraining(training.training_history_id)"
                  class="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-300 cursor-pointer transform hover:scale-120 ease-in-out"
                  title="Remove training"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Inline Form Fields -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <!-- Course Name -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  <span>Course Name</span>
                </label>
                <input
                  v-model="training.training_history_course_name"
                  type="text"
                  placeholder="e.g., Machine Learning Certification"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                />
              </div>

              <!-- Organization -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    ></path>
                  </svg>
                  <span>Organization</span>
                </label>
                <input
                  v-model="training.training_history_organization"
                  type="text"
                  placeholder="e.g., Coursera"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                />
              </div>

              <!-- Location -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                    ></path>
                  </svg>
                  <span>Location</span>
                </label>
                <input
                  v-model="training.training_history_location"
                  type="text"
                  placeholder="e.g., Online"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                />
              </div>

              <!-- Date -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span>Date</span>
                </label>
                <input
                  v-model="training.training_history_date"
                  type="date"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                />
              </div>

              <!-- Certificate File -->
              <div class="space-y-2 lg:col-span-2">
                <label class="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    ></path>
                  </svg>
                  <span>Certificate File</span>
                </label>
                <input
                  type="file"
                  @change="handleFileChange($event, index)"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                />
                <!-- <input
                  v-model="training.training_history_certificate_file"
                  type="url"
                  placeholder="e.g., https://drive.google.com/your-certificate"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                /> -->
              </div>
            </div>
          </div>
        </div>
        <!-- Add New Training Card -->
        <div
          @click="addNewTraining"
          class="group bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-2 border-dashed border-green-300 hover:border-green-400 rounded-xl p-8 transition-all duration-300 hover:shadow-md cursor-pointer"
        >
          <div class="flex flex-col items-center justify-center text-center">
            <div
              class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-green-800 mb-2">Add New Training</h3>
            <p class="text-green-600 text-sm">Click to add a new training</p>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
          <p class="text-gray-500 text-lg">Loading your trainings...</p>
          <p class="text-gray-400 text-sm">Please wait a moment</p>
        </div>

        <!-- Empty State (if no trainings after loading) -->
        <div v-else-if="trainingData.length === 0" class="text-center py-12">
          <div class="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No trainings found</h3>
          <p class="text-gray-500 mb-4">Start by adding your first training!</p>
          <button
            @click="addNewTraining($event, trainingData)"
            class="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium"
          >
            Add Your First Training
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-500">
            {{ trainingData.length }} training{{ trainingData.length !== 1 ? "s" : "" }}
            total
          </div>
          <div class="flex space-x-3">
            <button
              @click="close"
              :disabled="isSaving"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Cancel
            </button>
            <button
              @click="saveTrainings"
              :disabled="isSaving"
              class="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 cursor-pointer"
            >
              <svg v-if="isSaving" class="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>{{ isSaving ? "Saving..." : "Save Changes" }}</span>
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
import AdditionalInfoModal from "./additionalInfoModal.vue";

const resumeStore = useResumeStore();
const emit = defineEmits(["close", "save"]);

const trainingData = ref([]);
const isLoading = ref(true);
const isSaving = ref(false);
const { $axios } = useNuxtApp();
const { showAlert } = useAlert();

const getTraining = async () => {
  try {
    isLoading.value = true;
    const res = await $axios.get("/student/training");
    trainingData.value = res.data || [];
    console.log("Fetched trainings:", trainingData.value);
  } catch (error) {
    console.error("Failed to fetch trainings:", error);
    trainingData.value = [];
  } finally {
    isLoading.value = false;
  }
};

const addNewTraining = async () => {
  try {
    isSaving.value = true;
    const res = await $axios.post("/resume/increase_training");
    console.log("Added new training:", res.data);
    await getTraining();
  } catch (error) {
    console.error("Failed to add new training:", error);
  } finally {
    isSaving.value = false;
  }
};

const removeTraining = async (training_history_id) => {
  try {
    await $axios.delete(`/resume/training/${training_history_id}`);
    await getTraining();
  } catch (error) {
    console.error("Failed to remove training:", error);
  }
};

const saveTrainings = async () => {
  try {
    isSaving.value = true;

    for (const training of trainingData.value) {
      const payload = new FormData();
      payload.append("training_history_course_name", training.training_history_course_name);
      payload.append("training_history_organization", training.training_history_organization);
      payload.append("training_history_location", training.training_history_location);
      payload.append("training_history_date", training.training_history_date);
      if (training.training_history_certificate_file instanceof File) {
        payload.append("training_history_certificate_file", training.training_history_certificate_file);
      }
      console.log(payload);

      await $axios.put(`/resume/training/${training.training_history_id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    showAlert("บันทึกข้อมูลสำเร็จ", "success");
    emit("save", trainingData.value);
    close();
  } catch (error) {
    console.error("Failed to save trainings:", error);
  } finally {
    isSaving.value = false;
  }
};
const handleFileChange = (event, index) => {
  const file = event.target.files[0];
  console.log(index);

  if (file) {
    trainingData.value[index].training_history_certificate_file = file;
    // console.log(trainingData.value);
  }
};
const close = () => {
  emit("close");
  resumeStore.fetchResume();
};

onMounted(() => {
  getTraining();
});
</script>
