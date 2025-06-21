import axios from "axios";
import { useCookie } from "#app";

export default defineNuxtPlugin(() => {
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
    timeout: 10000, // 10 seconds timeout
  });

  $axios.interceptors.request.use(
    (config: any) => {
      if (tokenCookie.value) {
        config.headers.Authorization = `Bearer ${tokenCookie.value}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  $axios.interceptors.response.use(
    (response) => {
      if (
        response.config.url?.includes("/users/login") &&
        response.data.token
      ) {
        tokenCookie.value = response.data.token;
      }
      return response;
    },
    (error) => {
      const { response } = error;

      // จัดการ HTTP Status Codes ต่างๆ
      switch (response?.status) {
        case 400:
          console.error("Bad Request:", response.data);
          break;
        case 401:
          console.warn("⚠️ Unauthorized! Token Expired or Invalid.");
          tokenCookie.value = null;
          // Redirect to login page
          if (process.client) {
            window.location.href = "/";
          }
          break;
        case 403:
          console.error("Forbidden: Access denied");
          break;
        case 404:
          console.error("Not Found:", response.config.url);
          break;
        case 422:
          console.error("Validation Error:", response.data);
          break;
        case 500:
          console.error("Internal Server Error:", response.data);
          break;
        case 502:
          console.error("Bad Gateway");
          break;
        case 503:
          console.error("Service Unavailable");
          break;
        default:
          if (error.code === "ECONNABORTED") {
            console.error("Request timeout");
          } else if (error.message.includes("Network Error")) {
            console.error("Network error - please check your connection");
          } else {
            console.error("Unknown error:", error.message);
          }
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
