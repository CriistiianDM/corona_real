import Swal from "sweetalert2";
import '../estilos/AlertService.css';

const AlertService = {
  success: (message, title = "Acción exitosa", position = "top-end") => {
    console.log("Position:", position); // Agrega esta línea para depuración
    return Swal.fire({
      title,
      text: message,
      icon: "success",
      timer: 5000,
      timerProgressBar: true,
      toast: true,
      position,
      showConfirmButton: false,
      customClass: {
        popup: "custom-swal-popup-success",
        timerProgressBar: "custom-swal-progress-bar",
      },
    });
  },
  

  error: (message, title = "Error", position = "top-end") =>
    Swal.fire({
      title,
      text: message,
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
      toast: true,
      position,
      showConfirmButton: false,
      customClass: {
        popup: "custom-swal-popup-error",
        timerProgressBar: "custom-swal-progress-bar",
      },
    }),

  warning: (message, title = "Warning", position = "top-end") =>
    Swal.fire({
      title,
      text: message,
      icon: "warning",
      timer: 5000,
      timerProgressBar: true,
      toast: true,
      position,
      showConfirmButton: false,
      customClass: {
        popup: "custom-swal-popup-warning",
        timerProgressBar: "custom-swal-progress-bar",
      },
    }),

  info: (message, title = "Information", position = "top-end") =>
    Swal.fire({
      title,
      text: message,
      icon: "info",
      timer: 5000,
      timerProgressBar: true,
      toast: true,
      position,
      showConfirmButton: false,
      customClass: {
        popup: "custom-swal-popup-info",
        timerProgressBar: "custom-swal-progress-bar",
      },
    }),
};

export default AlertService;
