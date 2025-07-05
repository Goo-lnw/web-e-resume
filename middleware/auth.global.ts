import { jwtDecode } from "jwt-decode";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // ตรวจสอบว่าเป็น client-side หรือไม่
  if (process.server) {
    return;
  }

  const tokenCookie = useCookie("token");
  
  // ถ้าไม่มี token และไม่ได้อยู่ที่หน้า login
  if (!tokenCookie.value) {
    if (to.path !== "/") {
      return navigateTo("/");
    }
    return;
  }

  // ถ้ามี token ให้ตรวจสอบ
  if (tokenCookie.value) {
    try {
      const decodedToken = await jwtDecode(tokenCookie.value);
      const { role, userId, resume_id }: any = decodedToken || {};
      const path = to.path;
      
      // ตรวจสอบสิทธิ์สำหรับหน้า student
      if (path.startsWith("/student")) {
        if (role !== "student" || !userId || !resume_id) {
          tokenCookie.value = null;
          return navigateTo("/");
        }
      }
      
      // ตรวจสอบสิทธิ์สำหรับหน้า teacher
      if (path.startsWith("/teacher")) {
        if (role !== "teacher" || !userId) {
          tokenCookie.value = null;
          return navigateTo("/");
        }
      }
      
      // ถ้าอยู่ที่หน้า login แต่มี token อยู่แล้ว ให้ redirect ไปตาม role
      if (path === "/" && role) {
        if (role === "student") {
          return navigateTo("/student");
        } else if (role === "teacher") {
          return navigateTo("/teacher");
        }
      }
      
    } catch (error) {
      console.error("Token validation error:", error);
      tokenCookie.value = null;
      if (to.path !== "/") {
        return navigateTo("/");
      }
    }
  }
});
