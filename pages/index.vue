<script setup>
definePageMeta({
  layout: "auth",
});

const toast = useToast();
const { $axios } = useNuxtApp();
const router = useRouter();

const formData = ref({
  email: "",
  password: "",
});

async function login() {
  try {
    const response = await $axios.post("/login", formData.value);
    console.log(response.data);
    if (response.status === 200) {
      const token = response.data.token;
      const tokenCookie = useCookie("token");
      tokenCookie.value = token;

      const role = response.data.data.role;
      //   console.log(response.data.data);

      if (role === "student") {
        router.push("/student");
      } else if (role === "teacher") {
        router.push("/teacher");
      }
    }
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <div class="">
    <form action="" @submit.prevent="login">
      <input type="email" v-model="formData.email" placeholder="Email" />
      <input
        type="password"
        v-model="formData.password"
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  </div>
</template>
