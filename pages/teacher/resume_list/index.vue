<script setup>
definePageMeta({
  layout: "teacher",
});
import { ref, onMounted } from "vue";
const r = useRouter();
const { $axios } = useNuxtApp();
const resume = ref([]);
const search = ref("");

const filteredResume = computed(() => {
  if (!search.value) return resume.value;
  return resume.value.filter((item) => {
    const name = item.student?.student_name?.toLowerCase() || "";
    const email = item.student?.student_main_id?.toLowerCase() || "";
    return (
      name.includes(search.value.toLowerCase()) ||
      email.includes(search.value.toLowerCase())
    );
  });
});

const formData = ref({
  resume_status: "",
  resume_teacher_comment: "",
});

async function fetchResume() {
  try {
    const res = await $axios.get("/resume");
    const data = res.data;
    console.log("resume ", data);

    data.map((item) => {
      item.resume_teacher_comment = "";
      item.resume_status = "";
    });
    resume.value = res.data;
  } catch (err) {
    console.log(err);
  }
}

async function Resume(params) {
  console.log(params);

  r.push(`/teacher/resume_list/${params}`);
}
async function likeHendler(params) {
  console.log(params);
  try {
    const res = await $axios.patch(`/resume/like/${params}`);
    if (res.status === 200) {
      fetchResume();
    }
  } catch (err) {
    console.log(err);
  }
}
onMounted(() => {
  fetchResume();
});
</script>

<template>
  <div class="container min-h-screen p-2 sm:p-4 rounded bg-gray-100">
    <!-- 1. Header -->
    <div
      class="flex justify-center items-center text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-"
    >
      <h1 class="text-center font-semibold text-gray-800">
        {{ $t("resume_list.header") }}
      </h1>
    </div>
    <!-- 2. Search Section -->
    <div class="mb-4 sm:mb-6">
      <div class="flex items-center w-full max-w-d mx-auto">
        <div class="relative w-full">
          <input
            type="text"
            v-model="search"
            :placeholder="$t('resume_list.search_placeholder')"
            class="pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg shadow-lg w-full text-sm sm:text-base"
          />
          <div class="absolute left-2 sm:left-3 top-2 sm:top-2.5 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <!-- 3. Mian Content  Grid-->
    <div class="max-w-7xl mx-auto sm:px-4 px-2">
      <div
        class="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
      >
        <!-- 4. Left Sidebar -->
        <div class="lg:col-span-1 lg:order-1 order-2">
          <div class="bg-white rounded-lg shadow-md p-4 top-20 sticky">
            <h2 class="flex items-center justify-center">
              {{ $t("resume_list.filter_title") }}
            </h2>
          </div>
        </div>
        <!-- 5. Center content -->
        <div
          class="lg:col-span-2 xl:col-span-3 order-1 lg:order-2 space-y-4 sm:space-y-6"
        >
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 active:scale-98"
            v-for="(item, index) in filteredResume"
            :key="index"
          >
            <!-- 6. User Header -->
            <div class="flex items-center p-3 sm:p-4 border-b border-gray-100">
              <div
                class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm sm:text-base font-semibold mr-3"
              >
                {{
                  item.student.student_name
                    ? item.student.student_name.charAt(0).toUpperCase()
                    : ""
                }}
              </div>

              <div>
                <h1 class="text-sm md:text-sm text-gray-800">
                  {{ item.student.student_name }}
                </h1>
              </div>
            </div>

            <!-- 7. Resume Content -->
            <div
              class="text-gray-800 p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-200"
              @click="Resume(item.resume.resume_id)"
            >
              <div class="flex items-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span class="text-sm sm:text-sm text-gray-600">{{
                  item.student.student_email
                }}</span>
              </div>
            </div>

            <!-- 8. Action button -->
            <div class="border-t border-gray-100">
              <div class="flex">
                <button
                  @click="likeHendler(item.resume.resume_id)"
                  class="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 hover:scale-110 transition-all duration-200 ease-in-out px-3 py-2 rounded-lg flex-1 justify-center cursor-pointer group"
                >
                  <Icon
                    v-if="item.resume.resume_follow_resume === '1'"
                    name="material-symbols:favorite"
                    style="color: red"
                  />

                  <Icon
                    v-else
                    name="material-symbols:favorite"
                    style="color: black"
                  />
                  <span class="text-sx sm:text-sm font-medium">
                    <span>{{ $t("resume_list.like") }}</span></span
                  >
                </button>
                <div class="bg-gray-200 w-px"></div>
                <button
                  class="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 hover:scale-110 transition-all duration-200 ease-in-out px-3 py-2 rounded-lg flex-1 justify-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      d="M10 3H4.9S0 3 0 8c0 3.9 3 8 3 8S1.3 9 4.8 9H10v3l6-6l-6-6z"
                    />
                  </svg>
                  <span>{{ $t("resume_list.share") }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- 9. Right Sidebar -->
        <div class="lg:col-span-1 order-3">
          <!--  -->
          <div class="bg-white rounded-lg shadow p-4 sticky top-20">
            <h3 class="font-semibold text-gray-700">
              {{ $t("resume_list.support_title") }}
            </h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-8 sm:mt-12 p-4 text-center text-gray-100 text-xs sm:text-sm">
      <p>{{ $t("resume_list.footer") }}</p>
    </div>
  </div>
</template>

<style scoped></style>
