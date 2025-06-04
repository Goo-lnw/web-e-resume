import { ref } from "vue";

const alertMessage = ref("");
const alertType = ref<"success" | "error" | "info" | "">("");
const isAlertVisible = ref(false);

export function useAlert() {
  const showAlert = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    alertMessage.value = message;
    alertType.value = type;
    isAlertVisible.value = true;

    // Hide after 3s
    setTimeout(() => {
      isAlertVisible.value = false;
    }, 3000);
  };

  return {
    alertMessage,
    alertType,
    isAlertVisible,
    showAlert,
  };
}
