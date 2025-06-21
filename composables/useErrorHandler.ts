import { useAlert } from "./useAlert";

export const useErrorHandler = () => {
  const { showAlert } = useAlert();
  
  const handleApiError = (error: any, customMessage: string | null = null) => {
    const { response } = error;
    
    if (customMessage) {
      showAlert(customMessage, "error");
      return;
    }
    
    // จัดการ error ตาม status code
    switch (response?.status) {
      case 400:
        showAlert("ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง", "error");
        break;
      case 401:
        showAlert("เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่", "error");
        break;
      case 403:
        showAlert("ไม่มีสิทธิ์เข้าถึงข้อมูลนี้", "error");
        break;
      case 404:
        showAlert("ไม่พบข้อมูลที่ต้องการ", "error");
        break;
      case 422:
        showAlert(response.data.message || "ข้อมูลไม่ถูกต้อง", "error");
        break;
      case 500:
        showAlert("เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่อีกครั้ง", "error");
        break;
      case 502:
        showAlert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้", "error");
        break;
      case 503:
        showAlert("บริการไม่พร้อมใช้งาน กรุณาลองใหม่อีกครั้ง", "error");
        break;
      default:
        if (error.code === 'ECONNABORTED') {
          showAlert("การเชื่อมต่อหมดเวลา กรุณาลองใหม่อีกครั้ง", "error");
        } else if (error.message.includes('Network Error')) {
          showAlert("ไม่สามารถเชื่อมต่ออินเทอร์เน็ตได้", "error");
        } else {
          showAlert("เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ", "error");
        }
    }
  };
  
  const handleValidationError = (errors: any) => {
    if (typeof errors === 'string') {
      showAlert(errors, "error");
    } else if (Array.isArray(errors)) {
      showAlert(errors.join(', '), "error");
    } else if (typeof errors === 'object') {
      const errorMessages = Object.values(errors).flat();
      showAlert(errorMessages.join(', '), "error");
    }
  };
  
  return { 
    handleApiError,
    handleValidationError
  };
}; 