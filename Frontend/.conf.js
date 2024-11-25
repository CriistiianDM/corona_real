const LOCAL_URL = "http://localhost:8000";
const REMOTE_URL = "https://redesigned-xylophone-gwvxgwqj65395x7-8000.app.github.dev";

// Selecciona la URL adecuada dependiendo del hostname
const URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? LOCAL_URL
  : REMOTE_URL;


export default {
    "csrftToken": `${URL}/api/person/____/`,
    "authorization": `${URL}/api/token/`,
    "login": `${URL}/api/person/login/`,
    "create": `${URL}/api/person/accounts/`,
    "products": `${URL}/api/inventory/products/`,
    "person": `${URL}/api/person/person/`,
    "cashRegister": `${URL}/api/transactions/cash_register/`,
    "typeCashRegister": `${URL}/api/transactions/types_cash_register/`,
    "rooms": `${URL}/api/inventory/rooms/`,

}