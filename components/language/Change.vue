<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" class="sr-only peer" :checked="spanRef" @change="toggleLocale" />

    <div
      class="group peer ring-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full outline-none duration-300 after:duration-300 w-13 h-7 shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-5 after:w-5 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-hover:after:scale-95"
    ></div>
    <div class="flex justify-between items-center">
      <span class="absolute text-xs left-2 text-white transition duration-300 opacity-100">{{ spanRef ? "TH" : "" }}</span>
      <span class="absolute text-xs left-7 text-white transition duration-300 opacity-100">{{ !spanRef ? "EN" : "" }}</span>
    </div>
  </label>
</template>

<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const router = useRouter();
const { currentRoute } = router;

const spanRef = ref(false);
const { locales, locale, setLocale } = useI18n();
const rawLocales = locales.value;
const localeCodes = Object.values(rawLocales).map((l) => l.code);

const [firstLocale, secondLocale] = localeCodes;

function updateLocaleByPath(path) {
  if (path.startsWith("/th")) {
    if (!spanRef.value || locale.value !== secondLocale) {
      spanRef.value = true;
      setLocale(secondLocale);
    }
  } else {
    if (spanRef.value || locale.value !== firstLocale) {
      spanRef.value = false;
      setLocale(firstLocale);
    }
  }
}

onBeforeMount(() => {
  updateLocaleByPath(currentRoute.value.path);
});

watch(
  () => currentRoute.value.path,
  (newPath) => {
    updateLocaleByPath(newPath);
  }
);

const toggleLocale = () => {
  spanRef.value = !spanRef.value;
  const newLocale = spanRef.value ? secondLocale : firstLocale;
  setLocale(newLocale);

  // เปลี่ยน path ตามภาษา
  const currentPath = currentRoute.value.path;
  let newPath = "";

  if (spanRef.value) {
    // ไปภาษาไทย: เพิ่ม /th ถ้ายังไม่มี
    if (!currentPath.startsWith("/th")) {
      newPath = "/th" + currentPath;
    } else {
      newPath = currentPath;
    }
  } else {
    // ไปภาษาอังกฤษ: ลบ /th ออก
    if (currentPath.startsWith("/th")) {
      newPath = currentPath.replace(/^\/th/, "") || "/";
    } else {
      newPath = currentPath;
    }
  }

  if (newPath !== currentPath) {
    router.push(newPath);
  }
};
</script>
<style lang=""></style>
