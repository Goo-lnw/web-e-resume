<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" @click.self="close">
        <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
            <!-- Header -->
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-2 py-2 md:px-6 md:py-4 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-md md:text-2xl font-bold">ประสบการณ์ฝึกงาน</h2>
                        <p class="text-blue-100 text-sm mt-1">จัดการประสบการณ์ฝึกงานของคุณ</p>
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
                    <!-- Existing Internships -->
                    <div
                        v-for="(internship, index) in internshipData"
                        :key="internship.internship_id || `new-${index}`"
                        class="group bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-300 rounded-xl p-5 transition-all duration-300 hover:shadow-md"
                    >
                        <!-- Internship Header -->
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center space-x-3 min-w-0">
                                <div class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span class="text-white font-bold text-lg">{{ index + 1 }}</span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h3 class="font-semibold text-gray-800 break-words">
                                        {{ internship.internship_company_name || `Internship ${index + 1}` }}
                                    </h3>
                                    <p class="text-xs text-nowrap text-gray-500">กำหนดรายละเอียดการฝึกงานของคุณ</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-1 md:space-x-2 mb-3">
                                <button
                                    @click="removeInternship(internship.internship_id)"
                                    class="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-300 cursor-pointer transform hover:scale-120 ease-in-out"
                                    title="Remove internship"
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
                                <label class="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <icon name="mdi:format-list-bulleted" class="w-4 h-4" />
                                    <span>ชื่อองค์กรณ์/บริษัท</span>
                                </label>
                                <input
                                    v-model="internship.internship_company_name"
                                    type="text"
                                    placeholder="เช่น Startup Inc."
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                                />
                            </div>

                            <!-- Position -->
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <icon name="hugeicons:id" class="w-4 h-4" />
                                    <span>ตำแหน่ง</span>
                                </label>
                                <input
                                    v-model="internship.internship_position"
                                    type="text"
                                    placeholder="e.g., Intern Developer"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                                />
                            </div>

                            <!-- Start Date -->
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <icon name="hugeicons:calendar-03" class="w-4 h-4" />
                                    <span>วันที่เริ่มการฝึกงาน</span>
                                </label>
                                <input
                                    v-model="internship.internship_start_date"
                                    type="date"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                                />
                            </div>

                            <!-- End Date -->
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <icon name="hugeicons:calendar-03" class="w-4 h-4" />
                                    <span>วันสิ้นสุดการฝึกงาน</span>
                                </label>
                                <input
                                    v-model="internship.internship_end_date"
                                    type="date"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                                />
                            </div>

                            <!-- Description -->
                            <div class="space-y-2 col-span-2">
                                <label class="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <icon name="hugeicons:profile" class="w-4 h-4" />
                                    <span>รายละเอียด</span>
                                </label>
                                <textarea
                                    v-model="internship.internship_description"
                                    placeholder="รายละเอียดเกี่ยวกับการฝึกงาน เช่น โครงการที่ทำ, ทักษะที่เรียนรู้, ผลลัพธ์ที่ได้"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                                    rows="4"
                                ></textarea>
                            </div>

                            <!-- Related Files -->
                            <div class="space-y-2 col-span-2">
                                <label class="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                                    </svg>
                                    <span>ผลงานที่เกี่ยวข้อง</span>
                                </label>
                                <input
                                    v-model="internship.internship_related_files"
                                    type="url"
                                    placeholder="เช่น https://drive.google.com/your-files"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Add New Internship Card -->
                    <div
                        @click="addNewInternship"
                        class="group bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-2 border-dashed border-green-300 hover:border-green-400 rounded-xl p-8 transition-all duration-300 hover:shadow-md cursor-pointer"
                    >
                        <div class="flex flex-col items-center justify-center text-center">
                            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </div>
                            <h3 class="text-lg font-semibold text-green-800 mb-2">Add New Internship</h3>
                            <p class="text-green-600 text-sm">Click to add a new internship</p>
                        </div>
                    </div>

                    <!-- Loading State -->
                    <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
                        <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
                        <p class="text-gray-500 text-lg">Loading your internships...</p>
                        <p class="text-gray-400 text-sm">Please wait a moment</p>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div class="flex items-center justify-between">
                    <div class="text-sm text-gray-500">ประสบการณ์ฝึกงานทั้งหมด {{ internshipData.length }} รายการ</div>
                    <div class="flex space-x-3">
                        <button @click="close" :disabled="isSaving" class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                            ยกเลิก
                        </button>
                        <button
                            @click="saveInternships"
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

const internshipData = ref([]);
const isLoading = ref(true);
const isSaving = ref(false);
const { $axios } = useNuxtApp();
const { showAlert } = useAlert();

function syncRefData(target, source) {
    // สร้าง Set เก็บ internship_id ที่มีใน source
    const sourceSkillIds = new Set(source.map((item) => item.internship_id));
    console.log("Source internship_ids:", sourceSkillIds);

    // กรองเฉพาะ target ที่มี internship_id อยู่ใน source
    const filteredTarget = target.filter((targetItem) => {
        const exists = sourceSkillIds.has(targetItem.internship_id);
        if (!exists) {
            console.log("Removing internship_id:", targetItem.internship_id);
        }
        return exists;
    });

    // สร้าง Set เก็บ internship_id ที่เหลืออยู่ใน target หลังกรอง
    const remainingTargetIds = new Set(filteredTarget.map((item) => item.internship_id));

    // เพิ่ม internship_id ใหม่จาก source ที่ไม่มีใน target
    for (const sourceItem of source) {
        if (!remainingTargetIds.has(sourceItem.internship_id)) {
            console.log("Adding new internship_id:", sourceItem.internship_id);
            filteredTarget.push(sourceItem);
        }
    }

    return filteredTarget;
}

const getInternship = async () => {
    try {
        isLoading.value = true;
        const res = await $axios.get("/student/internship");
        return res.data;
    } catch (error) {
        console.error("Failed to fetch internships:", error);
        return [];
    } finally {
        isLoading.value = false;
    }
};

const addNewInternship = async () => {
    try {
        isSaving.value = true;
        const res = await $axios.post("/resume/increase_internship");

        const dataInApi = await getInternship();
        const updateData = syncRefData(internshipData.value, dataInApi);
        internshipData.value = updateData;
        console.log("Added new internship:", res.data);
    } catch (error) {
        console.error("Failed to add new internship:", error);
    } finally {
        isSaving.value = false;
    }
};

const removeInternship = async (index) => {
    const internship_id = index;
    try {
        await $axios.delete(`/resume/internship/${internship_id}`);
        // internshipData.value.splice(index, 1); // ลบจาก array
        const dataInApi = await getInternship();
        const updateData = syncRefData(internshipData.value, dataInApi);
        internshipData.value = updateData;
        console.log("Internship removed successfully");
    } catch (error) {
        console.error("Failed to remove internship:", error);
    }
};

const saveInternships = async () => {
    try {
        isSaving.value = true;
        for (const internship of internshipData.value) {
            await $axios.put(`/resume/internship/${internship.internship_id}`, {
                internship_company_name: internship.internship_company_name,
                internship_position: internship.internship_position,
                internship_start_date: internship.internship_start_date,
                internship_end_date: internship.internship_end_date,
                internship_description: internship.internship_description,
                internship_related_files: internship.internship_related_files,
            });
        }
        showAlert("บันทึกข้อมูลสำเร็จ", "success");
        emit("save", internshipData.value);
        close();
    } catch (error) {
        console.error("Failed to save internships:", error);
        showAlert("บันทึกข้อมูลล้มเหลว", "error");
    } finally {
        isSaving.value = false;
    }
};

const close = () => {
    emit("close");
    resumeStore.fetchResume();
};

onMounted(async () => {
    internshipData.value = await getInternship();
});
</script>
