import axios from "axios";
import { useCookie } from "#app";
import { useAlert } from "~/composables/useAlert";

export default defineNuxtPlugin(() => {
  const router = useRouter();
  const config = useRuntimeConfig();
  const tokenCookie = useCookie("token", {
    maxAge: 60 * 60 * 24, // 1 วัน
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  const $axios = axios.create({
    baseURL: config.public.apiBase,
    withCredentials: true,
    timeout: 10000,
  });

  $axios.interceptors.request.use(
    (config: any) => {
      if (tokenCookie.value) {
        config.headers.Authorization = `Bearer ${tokenCookie.value}`;
      }
      return config;
    },
    (error) => {
      console.error("Request error:", error);
      return Promise.reject(error);
    }
  );

  $axios.interceptors.response.use(
    (response) => {
      if (response.config.url?.includes("/") && response.data.token) {
        tokenCookie.value = response.data.token;
      }
      return response;
    },
    (error) => {
      console.error("Response error:", error);
      
      if (error.response?.status === 401) {
        tokenCookie.value = null;
        if (process.client) {
          router.push("/");
        }
      } else if (error.response?.status === 403) {
        tokenCookie.value = null;
        if (process.client) {
          router.push("/");
        }
      } else if (error.response?.status >= 500) {
        console.error("Server error:", error.response?.data);
      }
      
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      axios: $axios,
    },
  };
});
