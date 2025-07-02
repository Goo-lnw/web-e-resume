<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" @click.self="close">
        <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 overflow-hidden max-h-[90vh] flex flex-col">
            <!-- Header -->
            <div class="bg-gradient-to-r from-purple-600 to-pink-600 px-2 py-2 md:px-6 md:py-4 text-white">
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="text-md md:text-2xl font-bold">โปรเจค</h2>
                        <p class="text-purple-100 text-sm mt-1">จัดการโปรเจคที่เคยทำของคุณ</p>
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
                    <!-- Existing Projects -->
                    <div
                        v-for="(project, index) in projectData"
                        :key="project.project_id || `new-${index}`"
                        class="group bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-300 rounded-xl p-6 transition-all duration-300 hover:shadow-md"
                    >
                        <!-- Project Header -->
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex items-center space-x-3 min-w-0">
                                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span class="text-white font-bold text-lg">{{ index + 1 }}</span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h3 class="font-normal text-gray-800 break-words">
                                        {{ project.project_name || `Project ${index + 1}` }}
                                    </h3>
                                    <p class="text-xs text-nowrap text-gray-500">จัดการโปรเจคที่คุณเคยทำ</p>
                                </div>
                            </div>
                            <div class="flex items-center pace-x-1 md:space-x-2 mb-3">
                                <button @click="removeProject(project.project_id)" class="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-300 cursor-pointer transform hover:scale-120 ease-in-out" title="Remove project">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Inline Form Fields -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Project Name -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-700 flex items-center">
                                    <icon name="hugeicons:computer" class="w-4 h-4 text-gray-500 mr-2"></icon>
                                    <span>ชื่อ โปรเจค</span>
                                </label>
                                <input
                                    v-model="project.project_name"
                                    type="text"
                                    placeholder="เช่น, E-commerce Platform"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white duration-200 resize-none"
                                />
                            </div>

                            <!-- Technologies Used -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-700 flex items-center">
                                    <icon name="hugeicons:source-code-square" class="w-4 h-4 text-gray-500 mr-2"></icon>
                                    <span>เทคโลยีที่ใช้</span>
                                </label>
                                <input
                                    v-model="project.project_technology_used"
                                    type="text"
                                    placeholder="เช่น, React, Node.js, MongoDB"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white duration-200 resize-none"
                                />
                            </div>

                            <!-- Description -->
                            <div class="space-y-2 col-span-2">
                                <label class="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <icon name="hugeicons:note-01" class="w-4 h-4 text-gray-500 mr-2"></icon>
                                    <span>รายละเอียด</span>
                                </label>
                                <textarea
                                    v-model="project.project_description"
                                    placeholder="รายละเอียดเกี่ยวกับโปรเจคของคุณ เช่น วัตถุประสงค์, ฟีเจอร์หลัก"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white duration-200 resize-none"
                                    rows="4"
                                ></textarea>
                            </div>

                            <!-- Impact -->
                            <div class="space-y-2 col-span-2">
                                <label class="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <icon name="hugeicons:artificial-intelligence-08" class="w-4 h-4 text-gray-500 mr-2"></icon>
                                    <span>ผล/ประโยชน์ที่ได้รับ</span>
                                </label>
                                <textarea
                                    v-model="project.project_impact"
                                    placeholder="Describe the impact of your project"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white duration-200 resize-none"
                                    rows="4"
                                ></textarea>
                            </div>

                            <!-- Attachment Link -->
                            <div class="space-y-2 col-span-2">
                                <label class="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                                    </svg>
                                    <span>ลิงค์โปรเจค</span>
                                </label>
                                <input
                                    v-model="project.project_attachment_link"
                                    type="url"
                                    placeholder="e.g., https://github.com/your-project"
                                    class="w-full text-xs px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white duration-200 resize-none"
                                />
                            </div>
                        </div>
                    </div>
                    <!-- Add New Project Card -->
                    <div
                        @click="addNewProject"
                        class="group bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-2 border-dashed border-green-300 hover:border-green-400 rounded-xl p-8 transition-all duration-300 hover:shadow-md cursor-pointer"
                    >
                        <div class="flex flex-col items-center justify-center text-center">
                            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <icon name="hugeicons:plus-sign-circle" class="w-6 h-6 text-white" />
                            </div>
                            <h3 class="text-lg font-semibold text-green-800 mb-2">เพิ่มโปรเจคใหม่</h3>
                            <p class="text-green-600 text-sm">คลิกเพื่อเพิ่มโปรเจคใหม่</p>
                        </div>
                    </div>

                    <!-- Loading State -->
                    <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
                        <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
                        <p class="text-gray-500 text-lg">กำลังโหลดโปรเจคของคุณ...</p>
                        <p class="text-gray-400 text-sm">กรุณารอสักครู่</p>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div class="flex items-center justify-between">
                    <div class="text-sm text-gray-500">โปรเจคทั้งหมด {{ projectData.length }} รายการ</div>
                    <div class="flex space-x-3">
                        <button @click="close" :disabled="isSaving" class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                            ยกเลิก
                        </button>
                        <button
                            @click="saveProjects"
                            :disabled="isSaving"
                            class="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 cursor-pointer"
                        >
                            <svg v-if="isSaving" class="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>{{ isSaving ? "กำลังบันทึก" : "บันทึก" }}</span>
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

const projectData = ref([]);
const isLoading = ref(true);
const isSaving = ref(false);
const { $axios } = useNuxtApp();
const { showAlert } = useAlert();

function syncRefData(target, source) {
    // สร้าง Set เก็บ skill_id ที่มีใน source
    const sourceSkillIds = new Set(source.map((item) => item.project_id));
    console.log("Source project_ids:", sourceSkillIds);

    // กรองเฉพาะ target ที่มี project_id อยู่ใน source
    const filteredTarget = target.filter((targetItem) => {
        const exists = sourceSkillIds.has(targetItem.project_id);
        if (!exists) {
            console.log("Removing project_id:", targetItem.project_id);
        }
        return exists;
    });

    // สร้าง Set เก็บ project_id ที่เหลืออยู่ใน target หลังกรอง
    const remainingTargetIds = new Set(filteredTarget.map((item) => item.project_id));

    // เพิ่ม project_id ใหม่จาก source ที่ไม่มีใน target
    for (const sourceItem of source) {
        if (!remainingTargetIds.has(sourceItem.project_id)) {
            console.log("Adding new project_id:", sourceItem.project_id);
            filteredTarget.push(sourceItem);
        }
    }

    return filteredTarget;
}

const getProject = async () => {
    try {
        isLoading.value = true;
        const res = await $axios.get("/student/project");
        return res.data;
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        return [];
    } finally {
        isLoading.value = false;
    }
};

const addNewProject = async () => {
    try {
        isSaving.value = true;
        const res = await $axios.post("/resume/increase_project");
        console.log("Added new project:", res.data);

        const dataInApi = await getProject();
        const updateData = syncRefData(projectData.value, dataInApi);
        projectData.value = updateData;
    } catch (error) {
        console.error("Failed to add new project:", error);
    } finally {
        isSaving.value = false;
    }
};

const removeProject = async (project_id) => {
    try {
        await $axios.delete(`/resume/project/${project_id}`);
        const dataInApi = await getProject();
        const updateData = syncRefData(projectData.value, dataInApi);
        projectData.value = updateData;
    } catch (error) {
        console.error("Failed to remove project:", error);
    }
};

const saveProjects = async () => {
    try {
        isSaving.value = true;
        for (const project of projectData.value) {
            await $axios.put(`/resume/project/${project.project_id}`, {
                project_name: project.project_name,
                project_technology_used: project.project_technology_used,
                project_description: project.project_description,
                project_impact: project.project_impact,
                project_attachment_link: project.project_attachment_link,
            });
        }
        showAlert("บันทึกข้อมูลสำเร็จ", "success");
        emit("save", projectData.value);
        close();
    } catch (error) {
        console.error("Failed to save projects:", error);
    } finally {
        isSaving.value = false;
    }
};

const close = () => {
    emit("close");
    resumeStore.fetchResume();
};

onMounted(async () => {
    projectData.value = await getProject();
});
</script>
