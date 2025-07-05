<template>
  <footer>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!--Grid-->
      <div
        class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 gap-y-8 md:gap-8 py-10 max-w-sm mx-auto sm:max-w-3xl lg:max-w-full"
      >
        <div class="col-span-full mb-10 lg:col-span-2 lg:mb-0">
          <a
            href="https://it.bru.ac.th/"
            class="flex justify-center lg:justify-start"
          >
            <NuxtImg
              src="./images/logo-it-bru-Photoroom.png"
              alt=""
              class="w-26 h-26"
            />
          </a>
        </div>
        <div class="col-span-full mb-10 lg:col-span-2 lg:mb-0">
          <a
            href="https://www.bru.ac.th/venue/bru/"
            class="flex justify-center lg:justify-start"
          >
            <NuxtImg src="./images/bru-web-logo-en.png" alt="" class="h-26" />
          </a>
        </div>
        <!--End Col-->
        <div class="lg:mx-auto text-left">
          <h4 class="text-lg text-gray-900 font-medium mb-7">E-Resume</h4>
          <ul class="text-sm transition-all duration-500">
            <li class="mb-6">
              <NuxtLink
                :to="
                  role === 'student'
                    ? localePath('/student')
                    : localePath('/teacher')
                "
                class="text-gray-600 hover:text-gray-900"
              >
                {{ $t("footer.home") }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <!--End Col-->
        <div class="lg:mx-auto text-left">
          <h4 class="text-lg text-gray-900 font-medium mb-7">
            {{ $t("footer.information") }}
          </h4>
          <ul class="text-sm transition-all duration-500">
            <li class="mb-6">
              <NuxtLink
                href="https://www.facebook.com/it.bru.ac.th"
                class="text-gray-600 hover:text-gray-900"
              >
                {{ $t("footer.facebook_page") }}</NuxtLink
              >
            </li>
            <li class="mb-6">
              <NuxtLink
                href="https://it.bru.ac.th/"
                class="text-gray-600 hover:text-gray-900"
              >
                {{ $t("footer.website") }}</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="flex mb-4 space-x-4 sm:justify-between lg:mt-0">
        <div
          class="flex items-center justify-center flex-col lg:justify-between lg:flex-row"
        >
          <span class="text-sm text-gray-500">{{
            $t("footer.copyright")
          }}</span>
        </div>
        <div class="flex gap-2 flex-row lg:flex-row items-center"></div>
      </div>
      <!--Grid-->
      <div class="py-7 border-t border-gray-200"></div>
    </div>
  </footer>
</template>

<script setup>
import { jwtDecode } from "jwt-decode";
const localePath = useLocalePath();
const tokenState = useState("token", () => useCookie("token").value);
let decodedToken = jwtDecode(tokenState.value);
const { role, userId, resume_id } = decodedToken || {};
</script>
