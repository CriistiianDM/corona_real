// /GestProySoft/corona_real/Frontend/src/utils/AlertService.js
import Swal from "sweetalert2";

// Configuración básica para SweetAlert2
const AlertService = {
  success: (message, title = "Success") =>
    Swal.fire({
      title,
      text: message,
      icon: "success",
      confirmButtonText: "OK",
    }),

  error: (message, title = "Error") =>
    Swal.fire({
      title,
      text: message,
      icon: "error",
      confirmButtonText: "OK",
    }),

  warning: (message, title = "Warning") =>
    Swal.fire({
      title,
      text: message,
      icon: "warning",
      confirmButtonText: "OK",
    }),

  info: (message, title = "Information") =>
    Swal.fire({
      title,
      text: message,
      icon: "info",
      confirmButtonText: "OK",
    }),

  custom: (options) => Swal.fire(options),
};

export default AlertService;
