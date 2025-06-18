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
    baseURL: config.public.apiBase ,
    withCredentials: true,
  });

  $axios.interceptors.request.use(
    (config) => {
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
      if (error.response?.status === 401) {
        console.warn("⚠️ Unauthorized! Token Expired or Invalid.");
        tokenCookie.value = null;
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
