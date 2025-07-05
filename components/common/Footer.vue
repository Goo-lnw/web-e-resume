<template>
  <footer>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!--Grid-->
      <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 gap-y-8 md:gap-8 py-10 max-w-sm mx-auto sm:max-w-3xl lg:max-w-full">
        <div class="col-span-full mb-10 lg:col-span-2 lg:mb-0">
          <a href="https://it.bru.ac.th/" class="flex justify-center lg:justify-start">
            <NuxtImg src="./images/logo-it-bru-Photoroom.png" alt="" class="w-26 h-26" />
          </a>
        </div>
        <div class="col-span-full mb-10 lg:col-span-2 lg:mb-0">
          <a href="https://www.bru.ac.th/venue/bru/" class="flex justify-center lg:justify-start">
            <NuxtImg src="./images/bru-web-logo-en.png" alt="" class="h-26" />
          </a>
        </div>
        <!--End Col-->
        <div class="lg:mx-auto text-left">
          <h4 class="text-lg text-gray-900 font-medium mb-7">E-Resume</h4>
          <ul class="text-sm transition-all duration-500">
            <li class="mb-6">
              <NuxtLink href="/teacher" class="text-gray-600 hover:text-gray-900">{{ $t("footer.home") }}</NuxtLink>
            </li>
          </ul>
        </div>
        <!--End Col-->
        <div class="lg:mx-auto text-left">
          <h4 class="text-lg text-gray-900 font-medium mb-7">{{ $t("footer.information") }}</h4>
          <ul class="text-sm transition-all duration-500">
            <li class="mb-6">
              <NuxtLink href="https://www.facebook.com/it.bru.ac.th" class="text-gray-600 hover:text-gray-900"> {{ $t("footer.facebook_page") }}</NuxtLink>
            </li>
            <li class="mb-6">
              <NuxtLink href="https://it.bru.ac.th/" class="text-gray-600 hover:text-gray-900"> {{ $t("footer.website") }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex mb-4 space-x-4 sm:justify-between lg:mt-0">
        <div class="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
          <span class="text-sm text-gray-500">{{ $t("footer.copyright") }}</span>
        </div>
        <div class="flex gap-2 flex-row lg:flex-row items-center">
          <!-- <NuxtLink href="https://it.bru.ac.th/"
            class="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#337FFF] hover:bg-gray-900">
            <svg class="w-[1rem] h-[1rem] text-white" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.04111 7.81204L7.41156 5.46043H5.1296V3.93188C5.1296 3.28886 5.44818 2.66054 6.46692 2.66054H7.51899V0.657999C6.90631 0.560385 6.28723 0.507577 5.66675 0.5C3.78857 0.5 2.56239 1.62804 2.56239 3.66733V5.46043H0.480469V7.81204H2.56239V13.5H5.1296V7.81204H7.04111Z"
                fill="currentColor" />
            </svg>
          </NuxtLink>
          <NuxtLink href="https://www.youtube.com/watch?v=vqTh3UkZZBk"
            class="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#FF0000] hover:bg-gray-900">
            <svg class="w-[1.25rem] h-[0.875rem] text-white" viewBox="0 0 16 12" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M13.9191 1.10651C14.558 1.27906 15.0602 1.78251 15.2299 2.42069C15.5388 3.57887 15.5388 5.99687 15.5388 5.99687C15.5388 5.99687 15.5388 8.41487 15.2299 9.57306C15.0578 10.2136 14.5556 10.7171 13.9191 10.8872C12.7638 11.1969 8.12875 11.1969 8.12875 11.1969C8.12875 11.1969 3.49603 11.1969 2.33844 10.8872C1.69952 10.7147 1.19735 10.2112 1.0276 9.57306C0.71875 8.41487 0.71875 5.99687 0.71875 5.99687C0.71875 5.99687 0.71875 3.57887 1.0276 2.42069C1.1997 1.78015 1.70188 1.27669 2.33844 1.10651C3.49603 0.796875 8.12875 0.796875 8.12875 0.796875C8.12875 0.796875 12.7638 0.796875 13.9191 1.10651ZM10.4981 5.99687L6.6481 8.22578V3.76796L10.4981 5.99687Z"
                fill="white" />
            </svg>
          </NuxtLink> -->
        </div>
      </div>
      <!--Grid-->
      <div class="py-7 border-t border-gray-200"></div>
    </div>
  </footer>
</template>
