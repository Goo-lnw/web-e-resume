<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" @click.self="close">
        <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
            <!-- Header -->
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-2 py-2 md:px-6 md:py-4 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-md md:text-2xl font-bold">
                            {{ $t("skill_modal.title") }}
                        </h2>
                        <p class="text-blue-100 text-sm mt-1">
                            {{ $t("skill_modal.subtitle") }}
                        </p>
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
                    <!-- Existing Skills -->
                    <div
                        v-for="(skill, index) in skillData"
                        :key="skill.skill_id || `new-${index}`"
                        class="group bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-300 rounded-xl p-2 md:p-4 transition-all duration-300 hover:shadow-md"
                    >
                        <!-- Skill Header -->
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center space-x-3 min-w-0">
                                <div class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span class="text-white font-bold text-lg">{{ index + 1 }}</span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h3 class="font-normal text-gray-800 break-words">
                                        {{ skill.skill_name || `ทักษะที่ ${index + 1}` }}
                                    </h3>
                                    <p class="text-xs text-nowrap text-gray-500">
                                        {{ $t("skill_modal.skill_detail") }}
                                    </p>
                                </div>
                            </div>

                            <div class="flex items-center space-x-1 md:space-x-2 mb-3">
                                <span
                                    class="px-2 py-1 rounded-full text-xs font-medium text-nowrap"
                                    :class="{
                                        'bg-green-100 text-green-800': skill.skill_proficiency === 'advanced',
                                        'bg-yellow-400 text-yellow-800': skill.skill_proficiency === 'intermediate',
                                        'bg-yellow-200 text-yellow-500': skill.skill_proficiency === 'beginner',
                                    }"
                                >
                                    {{ skill.skill_proficiency ? $t("skill_modal.proficiency_" + skill.skill_proficiency) : $t("skill_modal.proficiency_not_set") }}
                                </span>
                                <button
                                    @click="removeSkill(skill.skill_id)"
                                    class="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-300 cursor-pointer transform hover:scale-120 ease-in-out"
                                    title="Remove skill"
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
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <!-- Skill Name -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <icon name="mdi:format-list-bulleted" class="w-4 h-4" />
                                    <span>{{ $t("skill_modal.skill_name") }}</span>
                                </label>
                                <input
                                    v-model="skill.skill_name"
                                    type="text"
                                    :placeholder="$t('skill_modal.skill_name_placeholder')"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                                />
                            </div>

                            <!-- Skill Type -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <icon name="hugeicons:all-bookmark" class="w-4 h-4" />
                                    <span>{{ $t("skill_modal.skill_type") }}</span>
                                </label>
                                <select
                                    v-model="skill.skill_type"
                                    class="appearance-none w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                                >
                                    <option value="">
                                        {{ $t("skill_modal.skill_type_placeholder") }}
                                    </option>
                                    <option value="language">
                                        {{ $t("skill_modal.skill_type_language") }}
                                    </option>
                                    <option value="software">
                                        {{ $t("skill_modal.skill_type_software") }}
                                    </option>
                                </select>
                            </div>

                            <!-- Proficiency -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <icon name="hugeicons:ranking" class="w-4 h-4" />
                                    <span>{{ $t("skill_modal.proficiency") }}</span>
                                </label>
                                <select
                                    v-model="skill.skill_proficiency"
                                    class="appearance-none w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                                >
                                    <option value="">
                                        {{ $t("skill_modal.proficiency_placeholder") }}
                                    </option>
                                    <option value="beginner">
                                        {{ $t("skill_modal.proficiency_beginner") }}
                                    </option>
                                    <option value="intermediate">
                                        {{ $t("skill_modal.proficiency_intermediate") }}
                                    </option>
                                    <option value="advanced">
                                        {{ $t("skill_modal.proficiency_advanced") }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <!-- Progress Bar (Visual indicator) -->
                        <div class="mt-4">
                            <div class="flex items-center space-x-3">
                                <span class="text-sm text-gray-600">{{ $t("skill_modal.proficiency_label") }}</span>
                                <div class="flex-1 bg-gray-200 rounded-full h-2">
                                    <div
                                        class="h-2 rounded-full transition-all duration-500"
                                        :class="{
                                            'bg-gradient-to-r from-green-400 to-green-600 w-full': skill.skill_proficiency === 'advanced',
                                            'bg-gradient-to-r from-yellow-400 to-orange-500 w-2/3': skill.skill_proficiency === 'intermediate',
                                            'bg-gradient-to-r from-yellow-200 to-yellow-500 w-1/3': skill.skill_proficiency === 'beginner',
                                            'w-0': !skill.skill_proficiency,
                                        }"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Add New Skill Card -->
                    <div
                        @click="addNewSkill"
                        class="group bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-2 border-dashed border-green-300 hover:border-green-400 rounded-xl p-2 md:p-4 transition-all duration-300 hover:shadow-md cursor-pointer"
                    >
                        <div class="flex flex-col items-center justify-center text-center">
                            <div class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <icon name="hugeicons:plus-sign-circle" class="w-6 h-6 text-white" />
                            </div>
                            <h3 class="text-xs md:text-md font-semibold text-green-800 mb-2">
                                {{ $t("skill_modal.add_skill") }}
                            </h3>
                            <p class="text-green-600 text-xs">
                                {{ $t("skill_modal.add_skill_hint") }}
                            </p>
                        </div>
                    </div>

                    <!-- Loading State -->
                    <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
                        <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
                        <p class="text-gray-500 text-lg">
                            {{ $t("skill_modal.loading") }}
                        </p>
                        <p class="text-gray-400 text-sm">
                            {{ $t("skill_modal.loading_hint") }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="bg-gray-50 px-2 py-2 md:px-6 md:py-4 border-t border-gray-200">
                <div class="text-xs text-gray-500">{{ $t("skill_modal.total_skills") }}{{ skillData.length }}</div>

                <div class="flex items-center justify-end space-x-3">
                    <button
                        @click="close"
                        :disabled="isSaving"
                        class="px-2 py-2 sm:px-3 text-xs border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {{ $t("skill_modal.cancel") }}
                    </button>
                    <button
                        @click="saveSkills"
                        :disabled="isSaving"
                        class="px-2 py-2 sm:px-3 text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 cursor-pointer"
                    >
                        <icon v-if="isSaving" name="svg-spinners:180-ring-with-bg" class="w-4 h-4" />
                        <span>
                            {{ isSaving ? $t("skill_modal.saving") : $t("skill_modal.save") }}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useResumeStore } from "../../stores/resumeStore";
const resumeStore = useResumeStore();

const emit = defineEmits(["close", "save"]);

const skillData = ref([]);
const isLoading = ref(true);
const isSaving = ref(false);
const { $axios } = useNuxtApp();
const { showAlert } = useAlert();

function syncRefData(target, source) {
    // สร้าง Set เก็บ skill_id ที่มีใน source
    const sourceSkillIds = new Set(source.map((item) => item.skill_id));
    console.log("Source skill_ids:", sourceSkillIds);

    // กรองเฉพาะ target ที่มี skill_id อยู่ใน source
    const filteredTarget = target.filter((targetItem) => {
        const exists = sourceSkillIds.has(targetItem.skill_id);
        if (!exists) {
            console.log("Removing skill_id:", targetItem.skill_id);
        }
        return exists;
    });

    // สร้าง Set เก็บ skill_id ที่เหลืออยู่ใน target หลังกรอง
    const remainingTargetIds = new Set(filteredTarget.map((item) => item.skill_id));

    // เพิ่ม skill_id ใหม่จาก source ที่ไม่มีใน target
    for (const sourceItem of source) {
        if (!remainingTargetIds.has(sourceItem.skill_id)) {
            console.log("Adding new skill_id:", sourceItem.skill_id);
            filteredTarget.push(sourceItem);
        }
    }

    return filteredTarget;
}

const getSkill = async () => {
    try {
        isLoading.value = true;
        const res = await $axios.get("/student/skill");
        return res.data;
    } catch (error) {
        console.error("Failed to fetch skills:", error);
        return [];
    } finally {
        isLoading.value = false;
    }
};

const addNewSkill = async () => {
    try {
        isSaving.value = true;
        // Call the increaseSkill API to add a new skill
        const res = await $axios.post("/resume/increase_skill");
        console.log("Added new skill:", res.data);

        const dataInApi = await getSkill();
        console.log("data in API", dataInApi);

        const updateData = syncRefData(skillData.value, dataInApi);
        console.log("updateData", updateData);

        skillData.value = updateData;
    } catch (error) {
        console.error("Failed to add new skill:", error);
    } finally {
        isSaving.value = false;
    }
};

const removeSkill = async (index) => {
    const skill_id = index;
    try {
        await $axios.delete(`/resume/delete_skill/${skill_id}`);
        skillData.value.splice(index, 1);
        const dataInApi = await getSkill();
        const removedData = syncRefData(skillData.value, dataInApi);
        skillData.value = removedData;
    } catch (error) {
        console.error("Failed to remove skill:", error);
    }
};

const saveSkills = async () => {
    try {
        for (const skill of skillData.value) {
            await $axios.put(`/resume/skill/${skill.skill_id}`, {
                skill_name: skill.skill_name,
                skill_type: skill.skill_type,
                // if skill_proficiency is also needed in DB, include it:
                skill_proficiency: skill.skill_proficiency,
            });
        }
        showAlert("บันทึกข้อมูลสำเร็จ", "success");
        emit("save", skillData.value);
        close();
    } catch (error) {
        console.error("Failed to save skills:", error);
    }
};

function close() {
    emit("close");
    resumeStore.fetchResume();
}

onMounted(async () => {
    skillData.value = await getSkill();
});
</script>
