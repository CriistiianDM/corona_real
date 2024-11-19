// Configuración de la base de datos
const DATABASENAME = "corona_real";
const TABLENAME = "users";
const IDUSER = 1;

// Inicializa la base de datos de usuario
export const initDB = () => {
  const request = indexedDB.open(DATABASENAME, 1);
  
  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore(TABLENAME, { keyPath: "id" });
  };

  request.onsuccess = (event) => {
    console.log("Base de datos abierta con éxito");
  };

  request.onerror = (event) => {
    console.error("Error al abrir la base de datos", event);
  };
};

// Guarda los datos del usuario en IndexedDB
export const saveUserData = (data) => {
  const request = indexedDB.open(DATABASENAME, 1);

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(TABLENAME, "readwrite");
    const store = transaction.objectStore(TABLENAME);
    store.put({ id: IDUSER, ...data });
  };
};

// Obtiene los datos del usuario almacenados
export const getUserData = (callback) => {
  const request = indexedDB.open(DATABASENAME, 1);

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(TABLENAME, "readonly");
    const store = transaction.objectStore(TABLENAME);
    const query = store.get(IDUSER);

    query.onsuccess = () => callback(query.result);
  };
};

// Verifica si el usuario está autenticado
export const isUserAuthenticated = (callback) => {
  getUserData((data) => {
    callback(data?.authorization ? data : null);
  });
};

// Elimina los datos del usuario al cerrar sesión
export const removeUserData = () => {
  const request = indexedDB.open(DATABASENAME, 1);

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(TABLENAME, "readwrite");
    const store = transaction.objectStore(TABLENAME);
    store.delete(IDUSER);
  };
};
