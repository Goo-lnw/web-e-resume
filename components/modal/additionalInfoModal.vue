<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" @click.self="close">
    <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold">Additional Information</h2>
            <p class="text-blue-100 text-sm mt-1">Manage your extra details and achievements</p>
          </div>
          <button
            @click="close"
            class="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 cursor-pointer"
            aria-label="Close modal"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
        <div class="space-y-4">
          <!-- Existing Additional Info -->
          <div
            v-for="(info, index) in additionalInfoData"
            :key="info.additional_info_id || `new-${index}`"
            class="group bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-300 rounded-xl p-5 transition-all duration-300 hover:shadow-md"
          >
            <!-- Additional Info Header -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3 min-w-0">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                >
                  <span class="text-white font-bold text-lg">{{ index + 1 }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-800 break-words">
                    {{ info.additional_info_title || `Info ${index + 1}` }}
                  </h3>
                  <p class="text-sm text-gray-500">Configure your additional info details</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  @click="removeAdditionalInfo(info.additional_info_id)"
                  class="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-300 cursor-pointer transform hover:scale-120 ease-in-out"
                  title="Remove additional info"
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
              <!-- Title -->
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
                  <span>Title</span>
                </label>
                <input
                  v-model="info.additional_info_title"
                  type="text"
                  placeholder="e.g., Volunteer Work"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                />
              </div>

              <!-- Description -->
              <div class="space-y-2 lg:col-span-2">
                <label class="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  <span>Description</span>
                </label>
                <textarea
                  v-model="info.additional_info_description"
                  placeholder="Describe the activity or achievement"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                  rows="4"
                ></textarea>
              </div>

              <div class="space-y-2 lg:col-span-2">
                <label class="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  <span>Description</span>
                </label>

                <input type="file" @change="handleFileChange($event, info)" class="..." />
              </div>
            </div>
          </div>
        </div>
        <!-- Add New Additional Info Card -->
        <div
          @click="addNewAdditionalInfo"
          class="group bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-2 border-dashed border-green-300 hover:border-green-400 rounded-xl p-8 transition-all duration-300 hover:shadow-md cursor-pointer"
        >
          <div class="flex flex-col items-center justify-center text-center">
            <div
              class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-green-800 mb-2">Add New Additional Info</h3>
            <p class="text-green-600 text-sm">Click to add new additional information</p>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
          <p class="text-gray-500 text-lg">Loading your additional info...</p>
          <p class="text-gray-400 text-sm">Please wait a moment</p>
        </div>

        <!-- Empty State (if no additional info after loading) -->
        <div v-else-if="additionalInfoData.length === 0" class="text-center py-12">
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
          <h3 class="text-lg font-medium text-gray-900 mb-2">No additional info found</h3>
          <p class="text-gray-500 mb-4">Start by adding your first additional info!</p>
          <button
            @click="addNewAdditionalInfo"
            class="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium"
          >
            Add Your First Additional Info
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-500">
            {{ additionalInfoData.length }} info{{ additionalInfoData.length !== 1 ? "s" : "" }}
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
              @click="saveAdditionalInfo"
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

const resumeStore = useResumeStore();
const emit = defineEmits(["close", "save"]);

const additionalInfoData = ref([]);
const isLoading = ref(true);
const isSaving = ref(false);
const { $axios } = useNuxtApp();
const { showAlert } = useAlert();

const getAdditionalInfo = async () => {
  try {
    isLoading.value = true;
    const res = await $axios.get("/student/additional_info");
    additionalInfoData.value = res.data || [];
    console.log("Fetched additional info:", additionalInfoData.value);
  } catch (error) {
    console.error("Failed to fetch additional info:", error);
    additionalInfoData.value = [];
  } finally {
    isLoading.value = false;
  }
};

const addNewAdditionalInfo = async () => {
  try {
    isSaving.value = true;
    const res = await $axios.post("/resume/increase_additional_info");
    console.log("Added new additional info:", res.data);
    await getAdditionalInfo();
  } catch (error) {
    console.error("Failed to add new additional info:", error);
  } finally {
    isSaving.value = false;
  }
};

const removeAdditionalInfo = async (additional_info_id) => {
  try {
    await $axios.delete(`/resume/additional_info/${additional_info_id}`);
    await getAdditionalInfo();
  } catch (error) {
    console.error("Failed to remove additional info:", error);
  }
};

const handleFileChange = (event, info) => {
  const file = event.target.files[0];
  if (file) {
    info.additional_info_file_attachment = file;
  }
};

const saveAdditionalInfo = async () => {
  try {
    isSaving.value = true;

    for (const info of additionalInfoData.value) {
      const formData = new FormData();
      formData.append("additional_info_title", info.additional_info_title);
      formData.append("additional_info_description", info.additional_info_description);

      if (info.additional_info_file_attachment instanceof File) {
        formData.append("additional_info_file_attachment", info.additional_info_file_attachment);
      }

      await $axios.put(`/resume/additional_info/${info.additional_info_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    showAlert("บันทึกข้อมูลสำเร็จ", "success");
    emit("save", additionalInfoData.value);
    close();
  } catch (error) {
    console.error("Failed to save additional info:", error);
  } finally {
    isSaving.value = false;
  }
};

const close = () => {
  emit("close");
  resumeStore.fetchResume();
};

onMounted(() => {
  getAdditionalInfo();
});
</script>
