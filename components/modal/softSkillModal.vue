<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" @click.self="close">
        <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
            <!-- Header -->
            <div class="bg-gradient-to-r from-purple-600 to-pink-600 px-2 py-2 md:px-6 md:py-4 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-md md:text-2xl font-bold">ทักษะพื้นฐาน</h2>
                        <p class="text-purple-100 text-sm mt-1">จัดการทักษะพื้นฐานของคุณ</p>
                    </div>
                    <button @click="close" class="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 cursor-pointer" aria-label="Close modal">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Content -->
            <div class="p-2 md:p-4 overflow-y-auto space-y-2 max-h-[calc(90vh-120px)]">
                <div class="space-y-2">
                    <!-- Existing Soft Skills -->
                    <div
                        v-for="(softSkill, index) in softSkillData"
                        :key="softSkill.soft_skill_id || `new-${index}`"
                        class="group bg-gradient-to-r from-gray-50 to-gray-100 hover:from-purple-50 hover:to-pink-50 border border-gray-200 hover:border-purple-300 rounded-xl p-6 transition-all duration-200 hover:shadow-md"
                    >
                        <!-- Soft Skill Header -->
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center space-x-3 min-w-0">
                                <div class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        ></path>
                                    </svg>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h3 class="font-semibold text-gray-800 break-words">
                                        {{ softSkill.soft_skill_name || `Soft Skill ${index + 1}` }}
                                    </h3>
                                    <p class="text-xs text-nowrap text-gray-500">กำหนดรายละเอียดทักษะของคุณ</p>
                                </div>
                            </div>

                            <div class="flex items-center space-x-1 md:space-x-2 mb-3">
                                <span class="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"> Soft Skill </span>
                                <button @click="removeSoftSkill(index)" class="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-300 cursor-pointer transform hover:scale-120 ease-in-out" title="Remove soft skill">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Inline Form Fields -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Soft Skill Name -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <icon name="mdi:format-list-bulleted" class="w-4 h-4"></icon>
                                    <span>ชื่อทักษะ</span>
                                </label>
                                <input
                                    v-model="softSkill.soft_skill_name"
                                    type="text"
                                    placeholder="e.g., Communication, Leadership"
                                    max="50"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                                />
                            </div>

                            <!-- Soft Skill Description -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <icon name="hugeicons:pencil-edit-01"></icon>
                                    <span>คำอธิบาย</span>
                                </label>
                                <input
                                    v-model="softSkill.soft_skill_description"
                                    type="text"
                                    placeholder="Describe your proficiency in this skill"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                                />
                            </div>
                        </div>

                        <!-- Visual Enhancement Bar -->
                        <div class="mt-4">
                            <div class="flex items-center space-x-3">
                                <span class="text-xs text-gray-600">สถานะ</span>
                                <div class="flex-1 bg-gray-200 rounded-full h-2">
                                    <div
                                        class="h-2 rounded-full transition-all duration-500"
                                        :class="{
                                            'bg-gradient-to-r from-purple-400 to-pink-500 w-full': softSkill.soft_skill_name && softSkill.soft_skill_description,
                                            'bg-gradient-to-r from-purple-400 to-pink-500 w-1/2': softSkill.soft_skill_name && !softSkill.soft_skill_description,
                                            'bg-gradient-to-r from-gray-400 to-gray-500 w-1/4': !softSkill.soft_skill_name && !softSkill.soft_skill_description,
                                        }"
                                    ></div>
                                </div>
                                <span class="text-xs text-gray-500">
                                    {{ softSkill.soft_skill_name && softSkill.soft_skill_description ? "Complete" : softSkill.soft_skill_name ? "Partial" : "Incomplete" }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Add New Soft Skill Card -->
                    <div
                        @click="addNewSoftSkill"
                        :class="[
                            'group bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border-2 border-dashed border-purple-300 hover:border-purple-400 rounded-xl p-8 transition-all duration-300 hover:shadow-md cursor-pointer',
                            { 'opacity-50 cursor-not-allowed': isSaving },
                        ]"
                        :disabled="isSaving"
                    >
                        <div class="flex flex-col items-center justify-center text-center">
                            <div class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg v-if="!isSaving" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <svg v-else class="w-6 h-6 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                            <h3 class="text-lg font-semibold text-purple-800 mb-2">
                                {{ isSaving ? "กำลังเพิ่ม..." : "เพิ่มทักษะใหม่" }}
                            </h3>
                            <p class="text-purple-600 text-sm">
                                {{ isSaving ? "กรุณารอสักครู่..." : "คลิกเพื่อเพิ่มทักษะซอฟต์" }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mb-4"></div>
                    <p class="text-gray-500 text-lg">กำลังโหลด...</p>
                    <p class="text-gray-400 text-sm">กรุณารอสักครู่</p>
                </div>
            </div>

            <!-- Footer -->
            <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div class="flex items-center justify-between">
                    <div class="text-sm text-gray-500">ทักษะทั้งหมด {{ softSkillData.length }} ทักษะ</div>
                    <div class="flex space-x-3">
                        <button @click="close" :disabled="isSaving" class="px-2 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                            ยกเลิก
                        </button>
                        <button
                            @click="saveSoftSkills"
                            :disabled="isSaving"
                            class="px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 cursor-pointer"
                        >
                            <icon v-if="isSaving" name="svg-spinners:180-ring-with-bg" class="w-4 h-4" />
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

const softSkillData = ref([]);
const isLoading = ref(true);
const isSaving = ref(false);
const { $axios } = useNuxtApp();
const { showAlert } = useAlert();

function syncRefData(target, source) {
    // สร้าง Set เก็บ skill_id ที่มีใน source
    const sourceSkillIds = new Set(source.map((item) => item.soft_skill_id));
    console.log("Source soft_skill_ids:", sourceSkillIds);

    // กรองเฉพาะ target ที่มี soft_skill_id อยู่ใน source
    const filteredTarget = target.filter((targetItem) => {
        const exists = sourceSkillIds.has(targetItem.soft_skill_id);
        if (!exists) {
            console.log("Removing soft_skill_id:", targetItem.soft_skill_id);
        }
        return exists;
    });

    // สร้าง Set เก็บ soft_skill_id ที่เหลืออยู่ใน target หลังกรอง
    const remainingTargetIds = new Set(filteredTarget.map((item) => item.soft_skill_id));

    // เพิ่ม soft_skill_id ใหม่จาก source ที่ไม่มีใน target
    for (const sourceItem of source) {
        if (!remainingTargetIds.has(sourceItem.soft_skill_id)) {
            console.log("Adding new soft_skill_id:", sourceItem.soft_skill_id);
            filteredTarget.push(sourceItem);
        }
    }

    return filteredTarget;
}

const getSoftSkill = async () => {
    try {
        isLoading.value = true;
        const res = await $axios.get("/student/soft_skill");

        return res.data;
    } catch (error) {
        console.error("Failed to fetch softSkill:", error);
        return [];
    } finally {
        isLoading.value = false;
    }
};
const addNewSoftSkill = async () => {
    if (isSaving.value) return;

    try {
        isSaving.value = true;
        // Call the increaseSoftSkill API to add a new skill
        const res = await $axios.post("/resume/increase_soft_skill");
        console.log("Added new soft skill:", res.data);

        // Refresh the skills list after adding
        const dataInApi = await getSoftSkill();
        const updateData = syncRefData(softSkillData.value, dataInApi);
        softSkillData.value = updateData;
    } catch (error) {
        console.error("Failed to add new soft skill:", error);
    } finally {
        isSaving.value = false;
    }
};

const removeSoftSkill = async (index) => {
    const softSkill = softSkillData.value[index];
    if (!softSkill.soft_skill_id) {
        // If it's a new skill without ID, just remove from local array
        softSkillData.value.splice(index, 1);

        return;
    }

    try {
        await $axios.delete(`/resume/delete_soft_skill/${softSkill.soft_skill_id}`);
        const dataInApi = await getSoftSkill();
        const updateData = syncRefData(softSkillData.value, dataInApi);
        softSkillData.value = updateData;
        console.log("Removed soft skill successfully");
        // Refresh the skills list after deletion
        // await getSoftSkill();
    } catch (error) {
        console.error("Failed to remove soft skill:", error);
    }
};

const saveSoftSkills = async () => {
    try {
        isSaving.value = true;

        // Save each soft skill individually
        for (const softSkill of softSkillData.value) {
            if (softSkill.soft_skill_id) {
                await $axios.put(`/resume/soft_skill/${softSkill.soft_skill_id}`, {
                    soft_skill_name: softSkill.soft_skill_name,
                    soft_skill_description: softSkill.soft_skill_description,
                });
            }
        }
        showAlert("บันทึกข้อมูลสำเร็จ", "success");
        console.log("Soft skills saved successfully");
        emit("save", softSkillData.value);
        close();
    } catch (error) {
        console.error("Failed to save soft skills:", error);
    } finally {
        isSaving.value = false;
    }
};

function close() {
    emit("close");
    resumeStore.fetchResume();
}

onMounted(async () => {
    softSkillData.value = await getSoftSkill();
});
</script>
