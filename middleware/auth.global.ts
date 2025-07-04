import { jwtDecode } from "jwt-decode";
export default defineNuxtRouteMiddleware(async (to, from) => {
    let decodedToken;

    const tokenState: any = useState("token", () => useCookie("token").value);
    console.log(tokenState.value, "tokenState");

    if (tokenState.value) {
        try {
            decodedToken = await jwtDecode(tokenState.value);
            console.log(decodedToken, "decodedToken");
            const { role, userId, resume_id }: any = decodedToken || {};
            const path = to.path;
            if (path.startsWith("/student") && (role !== "student" || !userId || !resume_id)) {
                useCookie("token").value = null; // Clear the token if the role does not match
                return navigateTo("/");
            }
            if (path.startsWith("/teacher") && (role !== "teacher" || !userId || !resume_id)) {
                useCookie("token").value = null; // Clear the token if the role does not match
                return navigateTo("/");
            }
        } catch (error) {
            console.error("expected Token:", error);
            // If the token is invalid or expired, redirect to the login page
            return navigateTo("/");
        }
    } else {
        if (to.path !== "/") {
            return navigateTo("/");
        }
    }
});
