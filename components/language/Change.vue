<template>
  <div class="flex gap-2">
    <button
      v-for="item in locales"
      :key="item.code"
      @click="setLocale(item.code)"
      :class="[
        'px-4 py-2 rounded transition hover:cursor-pointer',
        locale === item.code
          ? 'bg-blue-400 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      ]"
    >
      {{ item.name }}
    </button>
  </div>
</template>

<script setup>
const { locales, locale, setLocale } = useI18n();
</script>
