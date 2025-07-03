<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" @click.self="close">
    <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-2 py-2 md:px-6 md:py-4 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-md md:text-2xl font-bold">{{ $t('training_modal.title') }}</h2>
            <p class="text-blue-100 text-sm mt-1">{{ $t('training_modal.subtitle') }}</p>
          </div>
          <button @click="close" class="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 cursor-pointer" aria-label="Close modal">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-2 md:p-4 overflow-y-auto space-y-1 max-h-[calc(90vh-120px)]">
        <div class="space-y-2">
          <!-- Existing Training -->
          <div
            v-for="(training, index) in trainingData"
            :key="training.training_history_id || `new-${index}`"
            class="group bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-300 rounded-xl p-5 transition-all duration-300 hover:shadow-md"
          >
            <!-- Training Header -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3 min-w-0">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span class="text-white font-bold text-lg">{{ index + 1 }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-800 break-words">
                    {{ training.training_history_course_name || $t('training_modal.training_no', { n: index + 1 }) }}
                  </h3>
                  <p class="text-xs text-nowrap text-gray-500">{{ $t('training_modal.training_detail') }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-1 md:space-x-2 mb-3">
                <button
                  @click="removeTraining(training.training_history_id)"
                  class="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-300 cursor-pointer transform hover:scale-120 ease-in-out"
                  :title="$t('training_modal.remove_training')"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Inline Form Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Course Name -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <icon name="mdi:format-list-bulleted" class="w-4 h-4" />
                  <span>{{ $t('training_modal.course_name') }}</span>
                </label>
                <input
                  v-model="training.training_history_course_name"
                  type="text"
                  :placeholder="$t('training_modal.course_name_placeholder')"
                  class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                />
              </div>

              <!-- Organization -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <icon name="hugeicons:building-06" class="w-4 h-4 text-gray-500" />
                  <span>{{ $t('training_modal.organization') }}</span>
                </label>
                <input
                  v-model="training.training_history_organization"
                  type="text"
                  :placeholder="$t('training_modal.organization_placeholder')"
                  class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                />
              </div>

              <!-- Location -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <icon name="hugeicons:location-03" class="w-4 h-4 text-gray-500" />
                  <span>{{ $t('training_modal.location') }}</span>
                </label>
                <input
                  v-model="training.training_history_location"
                  type="text"
                  :placeholder="$t('training_modal.location_placeholder')"
                  class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                />
              </div>

              <!-- Date -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <icon name="hugeicons:calendar-03" class="w-4 h-4" />
                  <span>{{ $t('training_modal.date') }}</span>
                </label>
                <input
                  v-model="training.training_history_date"
                  type="date"
                  class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                />
              </div>

              <!-- Certificate File -->
              <div class="space-y-2 col-span-2">
                <label class="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <icon name="hugeicons:certificate-01" class="w-4 h-4" />
                  <span>{{ $t('training_modal.certificate_file') }}</span>
                </label>
                <input
                  type="file"
                  @change="handleFileChange($event, index)"
                  class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                />
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
            <p class="text-gray-500 text-lg">{{ $t('training_modal.loading') }}</p>
            <p class="text-gray-400 text-sm">{{ $t('training_modal.loading_hint') }}</p>
          </div>

          <!-- Add New Training Card -->
          <div
            @click="addNewTraining"
            class="group bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-2 border-dashed border-green-300 hover:border-green-400 rounded-xl p-8 transition-all duration-300 hover:shadow-md cursor-pointer"
          >
            <div class="flex flex-col items-center justify-center text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-green-800 mb-2">{{ $t('training_modal.add_new_training') }}</h3>
              <p class="text-green-600 text-sm">{{ $t('training_modal.add_training_hint') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-500">
            {{ $t('training_modal.total_trainings', { count: trainingData.length }) }}
          </div>
          <div class="flex space-x-3">
            <button
              @click="close"
              :disabled="isSaving"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {{ $t('training_modal.cancel') }}
            </button>
            <button
              @click="saveTrainings"
              :disabled="isSaving"
              class="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 cursor-pointer"
            >
              <svg v-if="isSaving" class="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isSaving ? $t('training_modal.saving') : $t('training_modal.save') }}</span>
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

const trainingData = ref([]);
const isLoading = ref(true);
const isSaving = ref(false);
const { $axios } = useNuxtApp();
const { showAlert } = useAlert();

function syncRefData(target, source) {
    // สร้าง Set เก็บ training_history_id ที่มีใน source
    const sourceSkillIds = new Set(source.map((item) => item.training_history_id));
    console.log("Source training_history_ids:", sourceSkillIds);

    // กรองเฉพาะ target ที่มี training_history_id อยู่ใน source
    const filteredTarget = target.filter((targetItem) => {
        const exists = sourceSkillIds.has(targetItem.training_history_id);
        if (!exists) {
            console.log("Removing training_history_id:", targetItem.training_history_id);
        }
        return exists;
    });

    // สร้าง Set เก็บ training_history_id ที่เหลืออยู่ใน target หลังกรอง
    const remainingTargetIds = new Set(filteredTarget.map((item) => item.training_history_id));

    // เพิ่ม training_history_id ใหม่จาก source ที่ไม่มีใน target
    for (const sourceItem of source) {
        if (!remainingTargetIds.has(sourceItem.training_history_id)) {
            console.log("Adding new training_history_id:", sourceItem.training_history_id);
            filteredTarget.push(sourceItem);
        }
    }

    return filteredTarget;
}

const getTraining = async () => {
    try {
        isLoading.value = true;
        const res = await $axios.get("/student/training");
        // console.log("Fetched trainings:", trainingData.value);
        return res.data;
    } catch (error) {
        console.error("Failed to fetch trainings:", error);
        return [];
    } finally {
        isLoading.value = false;
    }
};

const addNewTraining = async () => {
    try {
        isSaving.value = true;
        const res = await $axios.post("/resume/increase_training");
        const dataInApi = await getTraining();
        const updateData = syncRefData(trainingData.value, dataInApi);
        trainingData.value = updateData;
    } catch (error) {
        console.error("Failed to add new training:", error);
    } finally {
        isSaving.value = false;
    }
};

const removeTraining = async (training_history_id) => {
    try {
        await $axios.delete(`/resume/training/${training_history_id}`);
        const dataInApi = await getTraining();
        const updateData = syncRefData(trainingData.value, dataInApi);
        trainingData.value = updateData;
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

onMounted(async () => {
    trainingData.value = await getTraining();
});
</script>
