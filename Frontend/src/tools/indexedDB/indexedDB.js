// conf
const DATABASENAME = "_______"
const TABLENAME = "________"
const IDUSER = 1

export const initDB = () => {
    // Abrir la base de datos
    const request = indexedDB.open(DATABASENAME, 1);

    request.onupgradeneeded = function(event) {
        const db = event.target.result;
        db.createObjectStore(TABLENAME, { keyPath: "id", autoIncrement: true });
    };

    request.onsuccess = function(event) {
        const db = event.target.result;
        console.log("Base de datos abierta con éxito");
    };
    request.onerror = function(event) {
        console.log("Error al abrir la base de datos", event);
    };
};

export const saveUserData = (data) => {
    const request = indexedDB.open(DATABASENAME, 1);
    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(TABLENAME, "readwrite");
        const store = transaction.objectStore(TABLENAME);
        
        store.put({ id: IDUSER, ...data });
        transaction.oncomplete = () => console.log("Datos guardados");
    };
}

export const getUserData = (callback) => {
    if (typeof callback !== "function") {
        console.error("El callback proporcionado no es una función.");
        return;
    }

    const request = indexedDB.open(DATABASENAME, 1);
    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(TABLENAME, "readonly");
        const store = transaction.objectStore(TABLENAME);
        
        const consulta = store.get(IDUSER);
        consulta.onsuccess = () => {
            callback(consulta.result);
        };
    };
}

export const removeUserData = () => {
    const request = indexedDB.open(DATABASENAME, 1);
    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(TABLENAME, "readwrite");
        const store = transaction.objectStore(TABLENAME);

        store.delete(IDUSER);
        transaction.oncomplete = () => console.log("Datos eliminados");
    };
}

export const isUserAuthenticated = (callbacka_) => {
    getUserData(function(data) {
        callbacka_(data && data?.token ? true : false);
    });
}