<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      class="sr-only peer"
      :checked="isThaiLocale"
      @change="toggleLocale"
    />

    <div
      class="group peer ring-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full outline-none duration-300 after:duration-300 w-13 h-7 shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-5 after:w-5 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-hover:after:scale-95"
    ></div>
    <div class="flex justify-between items-center">
      <span
        class="absolute text-xs left-2 text-white transition duration-300 opacity-100"
        >{{ isThaiLocale ? "TH" : "" }}</span
      >
      <span
        class="absolute text-xs left-7 text-white transition duration-300 opacity-100"
        >{{ !isThaiLocale ? "EN" : "" }}</span
      >
    </div>
  </label>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

// ใช้ Nuxt composables
const { locale, locales } = useI18n();
const route = useRoute();
const localePath = useLocalePath();

// สร้าง reactive state
const isThaiLocale = ref(false);

// Computed property สำหรับตรวจสอบ locale ปัจจุบัน
const currentLocale = computed(() => locale.value);
const availableLocales = computed(() => locales.value);

// ฟังก์ชันสำหรับอัพเดท locale ตาม path
function updateLocaleByPath(path) {
  const isThai = path.startsWith("/th");
  isThaiLocale.value = isThai;
  
  // อัพเดท locale ถ้าต่างจากปัจจุบัน
  if (isThai && currentLocale.value !== "th") {
    locale.value = "th";
  } else if (!isThai && currentLocale.value !== "en") {
    locale.value = "en";
  }
}

// ฟังก์ชันสำหรับสลับ locale
const toggleLocale = async () => {
  try {
    isThaiLocale.value = !isThaiLocale.value;
    const newLocale = isThaiLocale.value ? "th" : "en";
    
    // อัพเดท locale
    locale.value = newLocale;
    
    // สร้าง path ใหม่
    const currentPath = route.fullPath;
    const cleanedPath = currentPath.replace(/^\/(th|en)/, "") || "/";
    const newPath = localePath(cleanedPath);
    
    // ใช้ navigateTo แทน router.push
    await navigateTo(newPath, { replace: true });
  } catch (error) {
    console.error("Error toggling locale:", error);
  }
};

// ตั้งค่าเริ่มต้น
onMounted(() => {
  updateLocaleByPath(route.path);
});

// ดูการเปลี่ยนแปลงของ route
watch(
  () => route.path,
  (newPath) => {
    updateLocaleByPath(newPath);
  }
);

// ดูการเปลี่ยนแปลงของ locale
watch(
  () => currentLocale.value,
  (newLocale) => {
    isThaiLocale.value = newLocale === "th";
  }
);
</script>

<style scoped>
/* เพิ่ม transition สำหรับ smooth animation */
.transition-duration-300 {
  transition-duration: 300ms;
}
</style>
