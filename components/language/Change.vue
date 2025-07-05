<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      class="sr-only peer"
      :checked="locale === secondLocale"
      @change="toggleLocale"
    />

    <div
      class="group peer ring-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full outline-none duration-300 after:duration-300 w-13 h-7 shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-5 after:w-5 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-hover:after:scale-95"
    ></div>
    <div class="flex justify-between items-center">
      <span
        class="absolute text-xs left-2 text-white transition duration-300 opacity-100"
        :class="{ hidden: spanRef }"
        >TH</span
      >
      <span
        class="absolute text-xs left-7 text-white transition duration-300 opacity-100"
        :class="{ hidden: !spanRef }"
        >EN</span
      >
    </div>
  </label>
</template>

<script setup>
import { ref } from "vue";
const spanRef = ref(true);
const { locales, locale, setLocale } = useI18n();
const rawLocales = locales.value;
const localeCodes = Object.values(rawLocales).map((l) => l.code);

const [firstLocale, secondLocale] = localeCodes;

const toggleLocale = () => {
  if (spanRef.value) {
    spanRef.value = false;
  } else {
    spanRef.value = true;
  }
  const newLocale = locale.value === firstLocale ? secondLocale : firstLocale;
  setLocale(newLocale);
};
</script>
<style lang=""></style>
