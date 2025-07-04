<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" @click.self="close">
        <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 overflow-hidden max-h-[90vh] flex flex-col">
            <!-- Header -->
            <div class="bg-gradient-to-r from-purple-600 to-pink-600 px-2 py-2 md:px-6 md:py-4 text-white">
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="text-md md:text-2xl font-bold">{{ $t("education_modal.title") }}</h2>
                        <p class="text-purple-100 text-sm mt-1">{{ $t("education_modal.subtitle") }}</p>
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
                <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span class="ml-3 text-gray-600">{{ $t("education_modal.loading") }}</span>
                </div>

                <div v-else class="space-y-2">
                    <!-- Education Entries -->
                    <div
                        v-for="(education, index) in educationData"
                        :key="education.education_history_id"
                        class="group bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-50 hover:to-gray-50 border border-gray-200 hover:border-gray-300 rounded-xl p-2 md:p-4 transition-all duration-200 hover:shadow-md"
                    >
                        <div class="flex justify-between items-start mb-4">
                            <h3 class="text-lg font-semibold text-gray-800">
                                {{ $t("education_modal.education_no", { n: index + 1 }) }}
                            </h3>
                            <button
                                @click="removeEducation(index, education.education_history_id)"
                                class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all duration-300 cursor-pointer transform hover:scale-120 ease-in-out"
                                :title="$t('education_modal.remove_education')"
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    ></path>
                                </svg>
                            </button>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700">
                                    <icon name="hugeicons:school-01" class="w-4 h-4"></icon>
                                    <span>{{ $t("education_modal.institution") }}</span>
                                </label>
                                <input
                                    v-model="education.education_history_institution"
                                    type="text"
                                    :placeholder="$t('education_modal.institution_placeholder')"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white duration-200"
                                />
                            </div>

                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700">
                                    <icon name="hugeicons:ranking" class="w-4 h-4"></icon>
                                    <span>{{ $t("education_modal.level") }}</span>
                                </label>
                                <input
                                    v-model="education.education_history_major"
                                    type="text"
                                    :placeholder="$t('education_modal.level_placeholder')"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                                />
                            </div>

                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700">
                                    <icon name="hugeicons:calendar-01" class="w-4 h-4"></icon>
                                    <span>{{ $t("education_modal.start_year") }}</span>
                                </label>
                                <input
                                    v-model="education.education_history_start_year"
                                    type="number"
                                    :placeholder="$t('education_modal.start_year_placeholder')"
                                    min="1900"
                                    max="2030"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                                />
                            </div>

                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700">
                                    <icon name="hugeicons:agreement-03" class="w-4 h-4"></icon>
                                    <span>{{ $t("education_modal.gpa") }}</span>
                                </label>
                                <input
                                    v-model="education.education_history_gpa"
                                    type="number"
                                    step="0.01"
                                    :placeholder="$t('education_modal.gpa_placeholder')"
                                    min="0"
                                    max="4"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white duration-200"
                                />
                            </div>

                            <div class="sm:col-span-2 space-y-2">
                                <label class="block text-sm font-medium text-gray-700">
                                    <icon name="hugeicons:note-01" class="w-4 h-4"></icon>
                                    <span>{{ $t("education_modal.notes") }}</span>
                                </label>
                                <textarea
                                    v-model="education.education_history_notes"
                                    rows="3"
                                    :placeholder="$t('education_modal.notes_placeholder')"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white duration-200"
                                ></textarea>
                            </div>
                            <div class="text-red-500 font-medium" v-if="err">
                                {{ err[index] }}
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
                            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors duration-200">
                                <svg class="w-8 h-8 text-blue-600" :class="{ 'animate-spin': isSaving }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path v-if="!isSaving" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                            </div>
                            <div class="text-center">
                                <h3 class="text-lg font-semibold text-gray-700">
                                    {{ isSaving ? $t("education_modal.adding") : $t("education_modal.add_new_education") }}
                                </h3>
                                <p class="text-gray-500 text-sm mt-1">
                                    {{ isSaving ? $t("education_modal.please_wait") : $t("education_modal.add_education_hint") }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="bg-gray-50 px-2 py-2 md:px-6 md:py-4 border-t border-gray-200 space-y-1">
                <div class="text-xs text-gray-500">
                    {{ $t("education_modal.total_educations", { count: educationData.length }) }}
                </div>
                <div class="flex justify-end items-center space-x-3">
                    <button
                        @click="close"
                        class="px-2 py-2 sm:px-3 text-xs border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {{ $t("education_modal.cancel") }}
                    </button>
                    <button
                        @click="saveEducation"
                        :disabled="isSaving"
                        class="px-2 py-2 sm:px-3 text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 cursor-pointer"
                        :class="{ 'animate-pulse': isSaving }"
                    >
                        {{ isSaving ? $t("education_modal.saving") : $t("education_modal.save") }}
                    </button>
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
const err = ref([]);

const { $axios } = useNuxtApp();
const { showAlert } = useAlert();
const { handleApiError } = useErrorHandler();

function syncRefData(target, source) {
    // สร้าง Set เก็บ education_history_id ที่มีใน source
    const sourceSkillIds = new Set(source.map((item) => item.education_history_id));
    console.log("Source education_history_ids:", sourceSkillIds);

    // กรองเฉพาะ target ที่มี education_history_id อยู่ใน source
    const filteredTarget = target.filter((targetItem) => {
        const exists = sourceSkillIds.has(targetItem.education_history_id);
        if (!exists) {
            console.log("Removing education_history_id:", targetItem.education_history_id);
        }
        return exists;
    });

    // สร้าง Set เก็บ education_history_id ที่เหลืออยู่ใน target หลังกรอง
    const remainingTargetIds = new Set(filteredTarget.map((item) => item.education_history_id));

    // เพิ่ม education_history_id ใหม่จาก source ที่ไม่มีใน target
    for (const sourceItem of source) {
        if (!remainingTargetIds.has(sourceItem.education_history_id)) {
            console.log("Adding new education_history_id:", sourceItem.education_history_id);
            filteredTarget.push(sourceItem);
        }
    }

    return filteredTarget;
}

const getEducation = async () => {
    try {
        isLoading.value = true;
        const res = await $axios.get("/student/education");
        console.log("Fetched education:", res.data);
        return res.data;
    } catch (error) {
        console.error("Failed to fetch education:", error);
        handleApiError(error, "เกิดข้อผิดพลาดในการดึงข้อมูลการศึกษา");
        return [];
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
        const dataInApi = await getEducation();
        const updateData = syncRefData(educationData.value, dataInApi);
        educationData.value = updateData;
    } catch (error) {
        console.error("Failed to add new Education:", error);

        err.value = "เกิดข้อผิดพลาดในการเพิ่มข้อมูลการศึกษา กรุณาตรวจสอบข้อมูลให้ถูกต้อง";
        // handleApiError(error, "เกิดข้อผิดพลาดในการเพิ่มข้อมูลการศึกษา");
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

// const saveEducation = async () => {
//   try {
//     isSaving.value = true;

//     // Save all education entries
//     for (const education of educationData.value) {
//       await $axios.put(`/resume/education_history/${education.education_history_id}`, {
//         education_history_institution: education.education_history_institution,
//         education_history_major: education.education_history_major,
//         education_history_start_year: parseStr(education.education_history_start_year),
//         education_history_gpa: parseStr(education.education_history_gpa),
//         education_history_notes: education.education_history_notes,
//       });
//     }
//     showAlert("บันทึกข้อมูลสำเร็จ", "success");
//     console.log("Education data saved successfully");
//     emit("save", educationData.value);
//     close();
//   } catch (error) {
//     console.error("Failed to save education:", error);
//     err.value = "กรุณาตรวจสอบข้อมูลให้ถุกต้อง";

//     handleApiError(error, "เกิดข้อผิดพลาดในการบันทึกข้อมูลการศึกษา");
//   } finally {
//     isSaving.value = false;
//   }
// };
const saveEducation = async () => {
    try {
        isSaving.value = true;
        err.value = [];
        // Save all education entries
        for (const [index, education] of educationData.value.entries()) {
            try {
                await $axios.put(`/resume/education_history/${education.education_history_id}`, {
                    education_history_institution: education.education_history_institution,
                    education_history_major: education.education_history_major,
                    education_history_start_year: parseStr(education.education_history_start_year),
                    education_history_gpa: parseStr(education.education_history_gpa),
                    education_history_notes: education.education_history_notes,
                });
            } catch (error) {
                console.error(`Failed to save education:`, error);
                err.value[index] = "กรุณาตรวจสอบข้อมูลให้ถูกต้อง";
                continue;
            }
        }

        if (err.value.length === 0) {
            showAlert("บันทึกข้อมูลสำเร็จ", "success");
            console.log("Education data saved successfully");
            emit("save", educationData.value);
            close();
        }
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

onMounted(async () => {
    educationData.value = await getEducation();
});
</script>
