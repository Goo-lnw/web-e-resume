<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" @click.self="close">
        <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
            <!-- Header -->
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-2 py-2 md:px-6 md:py-4 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-2xl font-bold">ประสบการณ์ทำงาน</h2>
                        <p class="text-blue-100 text-sm mt-1">จัดการประสบการณ์ทำงานของคุณ</p>
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
                    <!-- Existing Work Experiences -->
                    <div
                        v-for="(experience, index) in workExperienceData"
                        :key="experience.work_experience_id || `new-${index}`"
                        class="group bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-300 rounded-xl p-5 transition-all duration-300 hover:shadow-md"
                    >
                        <!-- Work Experience Header -->
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center space-x-3 min-w-0">
                                <div class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span class="text-white font-bold text-lg">{{ index + 1 }}</span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h3 class="font-normal text-gray-800 break-words">
                                        {{ experience.work_experience_company_name || `Experience ${index + 1}` }}
                                    </h3>
                                    <p class="text-xs text-nowrap text-gray-500">กำหนดประสบการณ์การทำงานของคุณ</p>
                                </div>
                            </div>

                            <div class="flex items-center space-x-1 md:space-x-2 mb-3">
                                <button
                                    @click="removeWorkExperience(experience.work_experience_id)"
                                    class="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-300 cursor-pointer transform hover:scale-120 ease-in-out"
                                    title="Remove experience"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Inline Form Fields -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Company Name -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <icon name="hugeicons:building-06" class="w-4 h-4 text-gray-500" />
                                    <span>ชื่อองค์กรณ์/บริษัท</span>
                                </label>
                                <input
                                    v-model="experience.work_experience_company_name"
                                    type="text"
                                    placeholder="เช่น บริษัท ABC จำกัด"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white duration-200 resize-none"
                                />
                            </div>

                            <!-- Position -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <icon name="hugeicons:id" class="w-4 h-4" />
                                    <span>ตำแหน่ง</span>
                                </label>
                                <input
                                    v-model="experience.work_experience_position"
                                    type="text"
                                    placeholder="เช่น Software Engineer"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white duration-200 resize-none"
                                />
                            </div>

                            <!-- Start Date -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <icon name="hugeicons:calendar-01" class="w-4 h-4 text-gray-500" />
                                    <span>วันที่เริ่มการทำงาน</span>
                                </label>
                                <input
                                    v-model="experience.work_experience_start_date"
                                    type="date"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white duration-200 resize-none"
                                />
                            </div>

                            <!-- End Date -->
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <icon name="hugeicons:calendar-02" class="w-4 h-4 text-gray-500" />
                                    <span>วันสิ้นสุดการทำงาน</span>
                                </label>
                                <input
                                    v-model="experience.work_experience_end_date"
                                    type="date"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white duration-200 resize-none"
                                />
                            </div>

                            <!-- Description -->
                            <div class="space-y-2 lg:col-span-2">
                                <label class="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <icon name="hugeicons:note-01" class="w-4 h-4 text-gray-500" />
                                    <span>คำอธิบาย</span>
                                </label>
                                <textarea
                                    v-model="experience.work_experience_description"
                                    placeholder="Describe your role and responsibilities"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                                    rows="4"
                                ></textarea>
                            </div>

                            <!-- Highlight -->
                            <div class="space-y-2 lg:col-span-2">
                                <label class="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <icon name="hugeicons:artificial-intelligence-08" class="w-4 h-4 text-gray-500" />
                                    <span>จุดเด่น</span>
                                </label>
                                <textarea
                                    v-model="experience.work_experience_highlight"
                                    placeholder="ความสำเร็จที่สำคัญ"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                                    rows="4"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Add New Work Experience Card -->
                    <div
                        @click="addNewWorkExperience"
                        class="group bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-2 border-dashed border-green-300 hover:border-green-400 rounded-xl p-8 transition-all duration-300 hover:shadow-md cursor-pointer"
                    >
                        <div class="flex flex-col items-center justify-center text-center">
                            <div class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <icon name="hugeicons:plus-sign-circle" class="w-6 h-6 text-white" />
                            </div>
                            <h3 class="text-lg font-semibold text-green-800 mb-2">เพิ่มประสบการณ์ทำงาน</h3>
                            <p class="text-green-600 text-sm">คลิกเพื่อเพิ่มประสบการณ์ทำงานใหม่</p>
                        </div>
                    </div>

                    <!-- Loading State -->
                    <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
                        <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
                        <p class="text-gray-500 text-lg">กำลังโหลดประสบการณ์ทำงานของคุณ...</p>
                        <p class="text-gray-400 text-sm">กรุณารอสักครู่</p>
                    </div>
                </div>

                <!-- Empty State (if no work experiences after loading) -->
            </div>

            <!-- Footer -->
            <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div class="flex items-center justify-between">
                    <div class="text-sm text-gray-500">ประสบการณ์ทำงานทั้งหมด {{ workExperienceData.length }} ประสบการณ์</div>
                    <div class="flex space-x-3">
                        <button @click="close" :disabled="isSaving" class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                            ยกเลิก
                        </button>
                        <button
                            @click="saveWorkExperiences"
                            :disabled="isSaving"
                            class="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 cursor-pointer"
                        >
                            <svg v-if="isSaving" class="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>{{ isSaving ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง" }}</span>
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

const workExperienceData = ref([]);
const isLoading = ref(true);
const isSaving = ref(false);
const { $axios } = useNuxtApp();
const { showAlert } = useAlert();

function syncRefData(target, source) {
    // สร้าง Set เก็บ work_experience_id ที่มีใน source
    const sourceSkillIds = new Set(source.map((item) => item.work_experience_id));
    console.log("Source work_experience_ids:", sourceSkillIds);

    // กรองเฉพาะ target ที่มี work_experience_id อยู่ใน source
    const filteredTarget = target.filter((targetItem) => {
        const exists = sourceSkillIds.has(targetItem.work_experience_id);
        if (!exists) {
            console.log("Removing work_experience_id:", targetItem.work_experience_id);
        }
        return exists;
    });

    // สร้าง Set เก็บ work_experience_id ที่เหลืออยู่ใน target หลังกรอง
    const remainingTargetIds = new Set(filteredTarget.map((item) => item.work_experience_id));

    // เพิ่ม work_experience_id ใหม่จาก source ที่ไม่มีใน target
    for (const sourceItem of source) {
        if (!remainingTargetIds.has(sourceItem.work_experience_id)) {
            console.log("Adding new work_experience_id:", sourceItem.work_experience_id);
            filteredTarget.push(sourceItem);
        }
    }

    return filteredTarget;
}

const getWorkExperience = async () => {
    try {
        isLoading.value = true;
        const res = await $axios.get("/student/work_experience");
        return res.data;
    } catch (error) {
        console.error("Failed to fetch work experiences:", error);
        return [];
    } finally {
        isLoading.value = false;
    }
};

const addNewWorkExperience = async () => {
    try {
        isSaving.value = true;
        const res = await $axios.post("/resume/increase_work_experience");
        console.log("Added new work experience:", res.data);
        const dataInApi = await getWorkExperience();
        const updateData = syncRefData(workExperienceData.value, dataInApi);
        workExperienceData.value = updateData;
    } catch (error) {
        console.error("Failed to add new work experience:", error);
    } finally {
        isSaving.value = false;
    }
};

const removeWorkExperience = async (work_experience_id) => {
    try {
        await $axios.delete(`/resume/work_experience/${work_experience_id}`);
        const dataInApi = await getWorkExperience();
        const updateData = syncRefData(workExperienceData.value, dataInApi);
        workExperienceData.value = updateData;
    } catch (error) {
        console.error("Failed to remove work experience:", error);
    }
};

const saveWorkExperiences = async () => {
    try {
        isSaving.value = true;
        for (const experience of workExperienceData.value) {
            await $axios.put(`/resume/work_experience/${experience.work_experience_id}`, {
                work_experience_company_name: experience.work_experience_company_name,
                work_experience_position: experience.work_experience_position,
                work_experience_start_date: experience.work_experience_start_date,
                work_experience_end_date: experience.work_experience_end_date,
                work_experience_description: experience.work_experience_description,
                work_experience_highlight: experience.work_experience_highlight,
            });
        }
        showAlert("บันทึกข้อมูลสำเร็จ", "success");
        emit("save", workExperienceData.value);
        close();
    } catch (error) {
        console.error("Failed to save work experiences:", error);
    } finally {
        isSaving.value = false;
    }
};

const close = () => {
    emit("close");
    resumeStore.fetchResume();
};

onMounted(async () => {
    workExperienceData.value = await getWorkExperience();
});
</script>
