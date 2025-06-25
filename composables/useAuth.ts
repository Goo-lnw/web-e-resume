export const useAuth = () => {
  const token = useCookie("token");

  const isAuthenticated = computed(() => !!token.value);
  const role = useCookie("token");

  function logout() {
    token.value = null;
    role.value = null;
    navigateTo("/");
  }

  return {
    token,
    isAuthenticated,
    role,
    logout,
  };
};
