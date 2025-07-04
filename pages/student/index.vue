<script setup>
import { useResumeStore } from "../../stores/resumeStore";
import { computed } from "vue";

const resumeStore = useResumeStore();

definePageMeta({
    layout: "student",
});

function formatDate(dateString) {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
    });
}

const githubUsername = computed(() => {
    const url = resumeStore.student.github || "";
    return url.replace(/^https:\/\/github\.com\//, "");
});

onMounted(() => {
    resumeStore.fetchResume();
    console.log("this is pinia", resumeStore.student);
    console.log("student name:", resumeStore.student.student_name);
});

function getProficiencyColor(proficiency) {
    switch (proficiency) {
        case "advanced":
            return "bg-green-500 w-4/4";
        case "intermediate":
            return "bg-yellow-500 w-3/4";
        case "beginner":
            return "bg-red-500 w-2/4";
        default:
            return "bg-gray-300 w-1/4";
    }
}
</script>

<template>
    <div class="min-h-screen bg-slate-100 py-4 sm:py-8">
        <div v-if="loading" class="flex justify-center items-center min-h-screen">
            <div class="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-b-2 border-gray-800"></div>
        </div>

        <div v-else-if="error" class="max-w-4xl mx-auto px-2 sm:px-4">
            <div class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
                {{ error }}
            </div>
        </div>

        <!-- Resume Paper Container -->
        <div v-else class="max-w-7xl mx-auto px-1 sm:px-2 md:px-4">
            <div class="" style="min-height: 11in">
                <!-- Paper Content -->
                <div class="p-2 sm:p-4 md:p-6 lg:p-12">
                    <!-- Header Section -->
                    <div class="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-lg"></div>
                    <div class="text-center bg-white border-gray-800 pb-4 lg:pb-2 mb-2 lg:mb-4 rounded p-2 sm:p-4">
                        <div class="flex flex-col sm:flex-row items-center mb-3 lg:mb-4 gap-2 sm:gap-4">
                            <img
                                v-if="resumeStore.student.student_profile_image"
                                :src="resumeStore.student.student_profile_image"
                                :alt="resumeStore.student.student_name"
                                class="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 border-1 border-gray-300 object-cover"
                            />
                            <div class="text-start w-full">
                                <h1 v-if="resumeStore.student.student_name_thai" class="text-2xl sm:text-3xl font-bold text-blue-900 mb-1">
                                    {{ resumeStore.student.student_name_thai }}
                                </h1>
                                <p class="text-lg sm:text-xl font-bold text-blue-900 mb-1 sm:mb-2 tracking-wide">
                                    {{ resumeStore.student.student_name }}
                                </p>
                                <p class="text-base sm:text-xl text-gray-800 mb-2 sm:mb-3">
                                    {{ resumeStore.student.position || "ไม่ระบุ" }}
                                </p>
                                <div v-if="resumeStore.student.student_email" class="flex items-center text-xs sm:text-sm text-gray-900 mb-2 sm:mb-3">
                                    <icon name="i-heroicons-envelope-solid" class="w-4 h-4 mr-2" />
                                    {{ $t("resume_student.email") }}:
                                    {{ resumeStore.student.student_email }}
                                </div>
                                <div v-if="resumeStore.student.student_phone" class="flex items-center text-xs sm:text-sm text-gray-900 mb-2 sm:mb-3">
                                    <icon name="i-heroicons-phone-solid" class="w-4 h-4 mr-2" />
                                    {{ $t("resume_student.phone") }}:
                                    {{ resumeStore.student.student_phone }}
                                </div>
                                <div v-if="resumeStore.student.student_main_id" class="flex items-center text-xs sm:text-sm text-gray-900 mb-2 sm:mb-3">
                                    <icon name="i-heroicons-identification-solid" class="w-4 h-4 mr-2" />
                                    {{ $t("resume_student.student_id") }}:
                                    {{ resumeStore.student.student_main_id }}
                                </div>
                                <div v-if="resumeStore.student.github" class="flex items-center text-xs sm:text-sm text-gray-900 mb-2 sm:mb-3">
                                    <icon name="mdi:github" class="w-4 h-4 mr-2" />
                                    <a :href="resumeStore.student.github" target="_blank" class="hover:text-gray-800 underline">
                                        {{ githubUsername }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Two Column Layout -->
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        <!-- Left Column -->
                        <div class="lg:col-span-1 space-y-3 sm:space-y-4 lg:space-y-6">
                            <!-- Personal Information -->
                            <div class="bg-white rounded-lg p-3 sm:p-6">
                                <h2 class="text-base text-shadow-sm text-blue-800 lg:text-lg font-bold mb-2 lg:mb-3 pb-1 border-b border-gray-400 uppercase tracking-wide">
                                    {{ $t("resume_student.personal_info") }}
                                </h2>
                                <div class="border-l-4 border-blue-600 pl-3 sm:pl-4 space-y-2 text-xs sm:text-sm">
                                    <div v-if="resumeStore.student.nationality" class="flex justify-between font-bold">
                                        <span class="text-gray-600">{{ $t("resume_student.nationality") }}</span>
                                        <span class="text-gray-800 font-medium">{{ resumeStore.student.nationality }}</span>
                                    </div>
                                    <div v-if="resumeStore.student.ethnicity" class="flex justify-between font-bold">
                                        <span class="text-gray-600">{{ $t("resume_student.ethnicity") }}</span>
                                        <span class="text-gray-800 font-medium">{{ resumeStore.student.ethnicity }}</span>
                                    </div>
                                    <div v-if="resumeStore.student.religion" class="flex justify-between font-bold">
                                        <span class="text-gray-600">{{ $t("resume_student.religion") }}</span>
                                        <span class="text-gray-800 font-medium">{{ resumeStore.student.religion }}</span>
                                    </div>
                                    <div v-if="resumeStore.student.height" class="flex justify-between font-bold">
                                        <span class="text-gray-600">{{ $t("resume_student.height") }}</span>
                                        <span class="text-gray-800 font-medium">{{ resumeStore.student.height }} {{ $t("resume_student.cm") }}</span>
                                    </div>
                                    <div v-if="resumeStore.student.weight" class="flex justify-between font-bold">
                                        <span class="text-gray-600">{{ $t("resume_student.weight") }}</span>
                                        <span class="text-gray-800 font-medium">{{ resumeStore.student.weight }} {{ $t("resume_student.kg") }}</span>
                                    </div>
                                    <div v-if="resumeStore.student.address" class="mt-3">
                                        <span class="text-gray-600 block mb-1 font-bold">{{ $t("resume_student.address") }}</span>
                                        <span class="text-gray-800 text-xs leading-relaxed">{{ resumeStore.student.address }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Contact & Social -->
                            <div v-if="resumeStore.student.facebook || resumeStore.student.line" class="bg-white rounded-lg p-3 sm:p-6">
                                <h2 class="text-base lg:text-lg text-shadow-sm font-bold text-green-600 mb-2 lg:mb-3 pb-1 border-b border-gray-400 uppercase tracking-wide">
                                    {{ $t("resume_student.social_media") }}
                                </h2>
                                <div class="border-l-4 border-green-600 pl-3 sm:pl-4 space-y-2 text-xs sm:text-sm">
                                    <div v-if="resumeStore.student.facebook" class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class="w-6 h-6" viewBox="0 0 48 48">
                                            <path fill="#3F51B5" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path>
                                            <path fill="#FFF" d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"></path>
                                        </svg>
                                        <span class="text-gray-800">{{ resumeStore.student.facebook }}</span>
                                    </div>
                                    <div v-if="resumeStore.student.line" class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class="w-6 h-6" viewBox="0,0,256,256">
                                            <g
                                                fill="#32d942"
                                                fill-rule="nonzero"
                                                stroke="none"
                                                stroke-width="1"
                                                stroke-linecap="butt"
                                                stroke-linejoin="miter"
                                                stroke-miterlimit="10"
                                                stroke-dasharray=""
                                                stroke-dashoffset="0"
                                                font-family="none"
                                                font-weight="none"
                                                font-size="none"
                                                text-anchor="none"
                                                style="mix-blend-mode: normal"
                                            >
                                                <g transform="scale(8.53333,8.53333)">
                                                    <path
                                                        d="M6,4c-1.105,0 -2,0.895 -2,2v18c0,1.105 0.895,2 2,2h18c1.105,0 2,-0.895 2,-2v-18c0,-1.105 -0.895,-2 -2,-2zM15.00391,7.66602c4.717,0 8.55469,3.11436 8.55469,6.94336c0,1.533 -0.59398,2.91444 -1.83398,4.27344c-1.795,2.066 -5.8077,4.5818 -6.7207,4.9668c-0.912,0.384 -0.77819,-0.24494 -0.74219,-0.46094c0.022,-0.128 0.12305,-0.73242 0.12305,-0.73242c0.029,-0.219 0.0577,-0.55644 -0.0293,-0.77344c-0.097,-0.237 -0.47491,-0.36188 -0.75391,-0.42187c-4.112,-0.544 -7.1543,-3.41956 -7.1543,-6.85156c0,-3.828 3.83964,-6.94336 8.55664,-6.94336zM12.62695,12.91016c-0.251,0 -0.45508,0.1975 -0.45508,0.4375v3.30469c0,0.242 0.20408,0.4375 0.45508,0.4375c0.251,0 0.45508,-0.1965 0.45508,-0.4375v-3.30469c0,-0.24 -0.20408,-0.4375 -0.45508,-0.4375zM14.5625,12.91016c-0.045,0 -0.09172,0.00549 -0.13672,0.02149c-0.177,0.06 -0.29687,0.22606 -0.29687,0.41406v3.30469c0,0.242 0.19359,0.43945 0.43359,0.43945c0.24,0 0.43359,-0.19945 0.43359,-0.43945v-2.04492l1.68359,2.30859c0.081,0.11 0.2097,0.17578 0.3457,0.17578c0.047,0 0.09272,-0.00744 0.13672,-0.02344c0.178,-0.06 0.29883,-0.22606 0.29883,-0.41406h-0.00391v-3.30469c0,-0.24 -0.19364,-0.4375 -0.43164,-0.4375c-0.238,0 -0.43359,0.1975 -0.43359,0.4375v2.04492l-1.68359,-2.30664c-0.081,-0.11 -0.2097,-0.17578 -0.3457,-0.17578zM18.92969,12.91016c-0.251,0 -0.45508,0.1975 -0.45508,0.4375v1.65039v0.00195v1.65039c0,0.242 0.20408,0.43945 0.45508,0.43945h1.72461c0.252,0 0.45703,-0.1975 0.45703,-0.4375c0,-0.24 -0.20603,-0.43555 -0.45703,-0.43555h-1.26953v-0.78125h1.26953c0.252,0 0.45703,-0.19555 0.45703,-0.43555c0,-0.242 -0.20603,-0.4375 -0.45703,-0.4375l-1.26953,0.00195v-0.78125h1.26953c0.252,0 0.45703,-0.19455 0.45703,-0.43555c0,-0.24 -0.20603,-0.4375 -0.45703,-0.4375zM9.34375,12.91211c-0.251,0 -0.45508,0.19455 -0.45508,0.43555v3.30469c0,0.242 0.20408,0.4375 0.45508,0.4375h1.72461c0.252,0 0.45408,-0.19655 0.45508,-0.43555c0,-0.24 -0.20408,-0.43555 -0.45508,-0.43555h-1.26953v-2.87109c0,-0.24 -0.20408,-0.43555 -0.45508,-0.43555z"
                                                    ></path>
                                                </g>
                                            </g>
                                        </svg>

                                        <span class="text-gray-800">{{ resumeStore.student.line }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Hobbies & Interests -->
                            <div v-if="resumeStore.student.hobby" class="bg-white rounded-lg p-3 sm:p-6">
                                <h2 class="text-base lg:text-lg font-bold text-yellow-500 mb-2 lg:mb-3 pb-1 border-b border-gray-400 uppercase tracking-wide">
                                    {{ $t("resume_student.hobbies") }}
                                </h2>
                                <p class="border-l-4 border-yellow-500 pl-3 sm:pl-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
                                    {{ resumeStore.student.hobby }}
                                </p>
                            </div>

                            <!-- Technical Skills -->
                            <div class="bg-white rounded-lg p-3 sm:p-6">
                                <h2 class="text-base lg:text-lg font-bold text-shadow-sm text-blue-800 mb-2 lg:mb-3 pb-1 border-b border-gray-400 uppercase tracking-wide">
                                    {{ $t("resume_student.technical_skills") }}
                                </h2>
                                <div class="space-y-2">
                                    <div v-for="skill in resumeStore.skills" :key="skill.skill_name">
                                        <div class="flex justify-between items-center">
                                            <span class="text-lg font-medium text-gray-700">{{ skill.skill_name }}</span>
                                            <span v-if="skill.skill_type" class="text-xs px-1 py-1 bg-gray-100 rounded-full text-gray-600">
                                                {{ skill.skill_type || "ไม่ระบุ" }}
                                            </span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <div class="flex-1 bg-gray-200 rounded-full h-2">
                                                <div class="h-2 rounded-full transition-all duration-300" :class="getProficiencyColor(skill.skill_proficiency)"></div>
                                            </div>
                                            <span class="text-xs text-gray-600 min-w-fit">
                                                {{ skill.skill_proficiency }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Soft Skills -->
                            <div class="bg-white rounded-lg p-3 sm:p-6">
                                <h2 class="text-base lg:text-lg font-bold text-shadow-sm text-violet-800 mb-2 lg:mb-3 pb-1 border-b border-gray-400 uppercase tracking-wide">
                                    {{ $t("resume_student.soft_skills") }}
                                </h2>
                                <div class="border-l-4 border-violet-600 pl-3 sm:pl-4 space-y-2 lg:space-y-3">
                                    <div v-for="softSkill in resumeStore.softSkills" :key="softSkill.soft_skill_name">
                                        <h3 class="text-xs sm:text-sm font-semibold text-gray-800">
                                            {{ softSkill.soft_skill_name }}
                                        </h3>
                                        <p v-if="softSkill.soft_skill_description" class="text-xs text-gray-600 leading-relaxed">
                                            {{ softSkill.soft_skill_description }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!-- Education -->
                            <div class="bg-white rounded-lg p-3 sm:p-6">
                                <h2 class="text-base lg:text-lg font-bold text-indigo-800 mb-2 lg:mb-3 pb-1 border-b border-gray-400 uppercase tracking-wide">
                                    {{ $t("resume_student.education") }}
                                </h2>
                                <div class="space-y-2 lg:space-y-3 border-l-4 border-indigo-600 pl-3 sm:pl-4">
                                    <div v-for="edu in resumeStore.education" :key="edu.education_history_institution">
                                        <h3 class="text-xs sm:text-sm font-bold text-gray-900">
                                            {{ edu.education_history_institution }}
                                        </h3>
                                        <p class="text-xs sm:text-sm text-gray-700 font-medium">
                                            {{ edu.education_history_major }}
                                        </p>
                                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-gray-600 space-y-1 sm:space-y-0">
                                            <span>{{ edu.education_history_start_year }}</span>
                                            <span class="font-semibold">GPA: {{ edu.education_history_gpa }}</span>
                                        </div>
                                        <p v-if="edu.education_history_notes" class="text-xs text-gray-600 italic mt-1">
                                            {{ edu.education_history_notes }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Right Column -->
                        <div class="lg:col-span-2 space-y-3 sm:space-y-4 lg:space-y-6">
                            <!-- Work Experience -->
                            <div class="bg-white rounded-lg p-3 sm:p-6">
                                <h2 class="text-base lg:text-lg font-bold text-blue-800 text-shadow-sm mb-3 lg:mb-4 pb-1 border-b border-gray-400 uppercase tracking-wide">
                                    {{ $t("resume_student.professional_experience") }}
                                </h2>
                                <div class="border-l-4 border-blue-600 pl-3 sm:pl-4 space-y-3 lg:space-y-4">
                                    <div v-for="work in resumeStore.workExperience" :key="work.work_experience_company_name">
                                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 space-y-1 sm:space-y-0">
                                            <div>
                                                <h3 class="text-sm lg:text-base font-bold text-gray-900">
                                                    {{ work.work_experience_position }}
                                                </h3>
                                                <p class="text-xs lg:text-sm font-semibold text-blue-700">
                                                    {{ work.work_experience_company_name }}
                                                </p>
                                            </div>
                                            <span class="text-xs text-gray-600 font-medium">
                                                {{ formatDate(work.work_experience_start_date) }} -
                                                {{ formatDate(work.work_experience_end_date) }}
                                            </span>
                                        </div>
                                        <p class="text-xs lg:text-sm text-gray-700 mb-2 leading-relaxed">
                                            {{ work.work_experience_description }}
                                        </p>
                                        <div v-if="work.work_experience_highlight" class="text-xs lg:text-sm text-gray-800 font-medium mb-2">• {{ work.work_experience_highlight }}</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Internships -->
                            <div v-if="resumeStore.internships?.length" class="bg-white rounded-lg p-3 sm:p-6">
                                <h2 class="text-base lg:text-lg font-bold text-shadow-sm text-orange-800 mb-3 lg:mb-4 pb-1 border-b border-gray-400 uppercase tracking-wide">
                                    {{ $t("resume_student.internships") }}
                                </h2>
                                <div class="border-l-4 border-orange-800 pl-3 sm:pl-4 space-y-3 lg:space-y-4">
                                    <div v-for="internship in resumeStore.internships" :key="internship.internship_company_name">
                                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 space-y-1 sm:space-y-0">
                                            <div>
                                                <h3 class="text-sm lg:text-base font-bold text-gray-900">
                                                    {{ internship.internship_position }}
                                                </h3>
                                                <p class="text-xs lg:text-sm font-semibold text-gray-700">
                                                    {{ internship.internship_company_name }}
                                                </p>
                                            </div>
                                            <span class="text-xs text-gray-600 font-medium">
                                                {{ formatDate(internship.internship_start_date) }} -
                                                {{ formatDate(internship.internship_end_date) }}
                                            </span>
                                        </div>
                                        <p class="text-xs lg:text-sm text-gray-700 leading-relaxed">
                                            {{ internship.internship_description }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!-- Projects -->
                            <div class="bg-white rounded-lg p-3 sm:p-6">
                                <h2 class="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 pb-1 border-b border-gray-400 uppercase tracking-wide">
                                    {{ $t("resume_student.projects") }}
                                </h2>
                                <div class="space-y-3 lg:space-y-4">
                                    <div v-for="project in resumeStore.projects" :key="project.project_name">
                                        <div v-if="project.project_name" class="border border-gray-200 rounded-lg p-2 sm:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 space-y-1 sm:space-y-0">
                                            <h3 class="text-sm lg:text-base font-bold text-orange-900">
                                                {{ project.project_name || $t("resume_student.projects") }}
                                            </h3>
                                            <a
                                                v-if="project.project_attachment_link"
                                                :href="project.project_attachment_link"
                                                target="_blank"
                                                class="text-xs text-blue-600 underline hover:text-blue-800 self-start sm:self-auto hover:scale-105 transition-all duration-200 ease-in-out"
                                            >
                                                {{ $t("resume_student.view_project") }}
                                            </a>
                                        </div>
                                        <p class="text-xs lg:text-sm font-semibold text-gray-700 mb-1 pl-2 sm:pl-4">
                                            {{ project.project_technology_used }}
                                        </p>
                                        <p class="text-xs lg:text-sm text-gray-700 mb-2 leading-relaxed pl-2 sm:pl-4">
                                            {{ project.project_description }}
                                        </p>
                                        <p class="text-xs lg:text-sm text-blue-800 font-medium pl-2 sm:pl-4">{{ project.project_impact }}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Training -->
                            <div v-if="resumeStore.training?.length" class="bg-white rounded-lg p-3 sm:p-6">
                                <h2 class="text-base lg:text-lg font-bold text-yellow-700 mb-3 lg:mb-4 pb-1 border-b border-gray-400 uppercase tracking-wide">
                                    {{ $t("resume_student.training") }}
                                </h2>
                                <div class="space-y-2 lg:space-y-3">
                                    <div v-for="training in resumeStore.training" :key="training.training_history_course_id">
                                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 space-y-1 sm:space-y-0">
                                            <div>
                                                <h3 class="text-xs lg:text-sm font-bold text-gray-900">
                                                    {{ training.training_history_course_name }}
                                                </h3>
                                                <p class="text-xs lg:text-sm text-gray-700">
                                                    {{ training.training_history_organization }}
                                                </p>
                                                <p class="text-xs text-gray-600">
                                                    {{ training.training_history_location }}
                                                </p>
                                            </div>
                                            <span class="text-xs text-gray-600 font-medium">
                                                {{ formatDate(training.training_history_date) }}
                                            </span>
                                        </div>
                                        <div v-if="training.training_history_certificate_file" class="mt-1">
                                            <a
                                                :href="training.training_history_certificate_file"
                                                target="_blank"
                                                class="text-xs text-blue-600 underline hover:text-blue-800 self-start sm:self-auto hover:scale-105 transition-all duration-200 ease-in-out"
                                            >
                                                {{ $t("resume_student.view_certificate") }}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Additional Info -->
                            <div v-if="resumeStore.additionalInfo?.length" class="bg-white rounded-lg p-3 sm:p-6">
                                <h2 class="text-base lg:text-lg font-bold text-yellow-700 mb-3 lg:mb-4 pb-1 border-b border-gray-400 uppercase tracking-wide">
                                    {{ $t("resume_student.additional_info") }}
                                </h2>
                                <div class="space-y-2 lg:space-y-3">
                                    <div v-for="info in resumeStore.additionalInfo" :key="info.additional_info_id">
                                        <h3 class="text-xs lg:text-sm font-bold text-gray-900">
                                            {{ info.additional_info_title }}
                                        </h3>
                                        <p class="text-xs lg:text-sm text-gray-700 leading-relaxed">
                                            {{ info.additional_info_description }}
                                        </p>
                                        <div v-if="info.additional_info_file_attachment" class="mt-1">
                                            <a
                                                :href="info.additional_info_file_attachment"
                                                target="_blank"
                                                class="text-xs text-blue-600 underline hover:text-blue-800 self-start sm:self-auto hover:scale-105 transition-all duration-200 ease-in-out"
                                            >
                                                {{ $t("resume_student.view_file") }}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Resume Status Footer -->
                    <div class="mt-4 sm:mt-6 lg:mt-8 pt-2 sm:pt-3 lg:pt-4 border-t border-gray-300">
                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-gray-600 space-y-2 sm:space-y-0">
                            <div>
                                {{ $t("resume_student.status") }}
                                <span class="font-semibold capitalize ml-1">
                                    {{ resumeStore.resume.resume_status || "Draft" }}
                                </span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:space-x-4">
                                <span>
                                    {{ $t("resume_student.submitted") }}
                                    {{ formatDate(resumeStore.resume.submitted_at) }}
                                </span>
                                <span v-if="resumeStore.resume.approved_at">
                                    {{ $t("resume_student.approved") }}
                                    {{ formatDate(resumeStore.resume.approved_at) }}
                                </span>
                            </div>
                        </div>
                        <div v-if="resumeStore.resume.resume_teacher_comment" class="mt-2">
                            <p class="text-xs text-gray-600">
                                <span class="font-semibold">Teacher Comment:</span>
                                {{ resumeStore.resume.resume_teacher_comment }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* Print styles */
@media print {
    .bg-gray-100 {
        background: white !important;
    }

    .shadow-2xl {
        box-shadow: none !important;
    }

    .min-h-screen {
        min-height: auto !important;
    }

    .py-8 {
        padding: 0 !important;
    }

    .px-4 {
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
}
</style>
