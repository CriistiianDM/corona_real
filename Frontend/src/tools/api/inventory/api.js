import json from "../../../../.conf";
import { fetchPost, fetchGet, fetchPut, fetchDelete } from "../api"; 
import { postTransaction, putCashRegister, getCashRegisterById } from  "../transaction/api";

// Obtener todos los productos
export const getProducts = async () => {
    try {
        const response = await fetchGet({ url: json.products });
        return response;
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
};

// Crear un nuevo producto
export const createProduct = async (productData) => {
    try {
        const response = await fetchPost({
            url: json.products,
            body: productData,
        });
        return response;
    } catch (error) {
        console.error("Error al crear producto:", error);
    }
};

// Actualizar un producto
export const updateProduct = async (productId, productData) => {
    try {
        const response = await fetchPut({
            url: json.products + productId + '/',
            data: productData, 
        });
        return response;
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        throw error;
    }
};

// Eliminar un producto
export const deleteProduct = async (productId) => {
    try {
        const url = `${json.products}${productId}/`;
        const response = await fetchPost({
            url: url,
            body: {}, // Elimina con body vacío
            method: 'DELETE', // Indica que es un DELETE
        });
        return response;
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        throw error;
    }
};

//Listar Habitaciones 
export const getRooms = async () => {
    try {
        const response = await fetchGet({ url: json.rooms });
        return response;
    } catch (error) {
        console.error("Error al obtener las habitaciones:", error);
    }
};

//Crear Habitación 
export const createRoom = async (roomData) => {
    try {
        const response = await fetchPost({
            url: json.rooms,
            body: roomData,
        });
        return response;
    } catch (error) {
        console.error("Error al crear habitación:", error);
    }
};

// Actualizar una habitación 
export const updateRoom = async (roomId, roomData) => {
    try {
        const response = await fetchPut({
            url: json.rooms + roomId + '/',
            data: roomData, 
        });
        return response;
    } catch (error) {
        console.error("Error al actualizar habitación:", error);
        throw error;
    }
};


//Crear una nota
export const createNote = async (noteData) => {
  console.log(noteData)
  try {
      const response = await fetchPost({
          url: json.notes,
          body: noteData,
      });
      return response;
  } catch (error) {
      console.error("Error al crear la nota:", error);
  }
};



//Actualzar una nota
export const updateNote = async (noteId, noteData) => {
  try {
      const response = await fetchPut({
          url: json.notes + noteId + '/',
          data: noteData, 
      });
      return response;
  } catch (error) {
      console.error("Error al actualizar la nota", error);
      throw error;
  }
};

//Listar notas
export const getNotes = async () => {
  try {
      const response = await fetchGet({ url: json.notes });
      return response;
  } catch (error) {
      console.error("Error al obtener las notas:", error);
  }
};


// Eliminar una nota
export const deleteNote = async (noteId) => {
  try {
      const url = json.notes + noteId + '/';
      const response = await fetchDelete({
          data: {}, // Si no necesitas enviar datos en el cuerpo, puede ser vacío
          url: url
      });
      return response;
  } catch (error) {
      console.error("Error al eliminar una nota:", error);
      throw error;
  }
};


  
export const createSellerProduct = async ({ data }) => {
    let response = {};
    try {
      const { data_product, data_transactions } = data;
  
      // Validaciones iniciales
      if (!data_product?.id) {
        throw new Error("Producto no identificado.");
      }
  
      // Actualizar el producto directamente (Stock)
      const productUpdateResponse = await updateProduct(data_product.id, data_product);
      if (!productUpdateResponse?.id) {
        throw new Error("No se pudo actualizar el producto.");
      }
  
      // Crear la transacción
      const transactionResponse = await postTransaction({
        data: {
          type_transaction: data_transactions.type_transaction, // 1: Venta, 2: Compra
          cash_register: 1, // Caja fija
          description: "producto", // Descripción fija
          value: data_transactions.value, // Valor procesado en el frontend
        },
      });
  
      if (!transactionResponse?.id) {
        throw new Error("No se pudo crear la transacción.");
      }
  
      // **Actualizar el balance de la caja**
      // Obtener el balance actual de la caja
      const cashRegisterResponse = await getCashRegisterById(1); // Caja fija con ID: 1
      if (!cashRegisterResponse?.id) {
        throw new Error("No se pudo obtener la caja.");
      }
  
      const updatedCashBalance =
        data_transactions.type_transaction === 1 // Venta
        ? Number(cashRegisterResponse.cash_balance) + Number(data_transactions.value) // Asegura que ambos sean números
        : Number(cashRegisterResponse.cash_balance) - Number(data_transactions.value); // Compra

  
      // Actualizar el balance de la caja
      const updateCashResponse = await putCashRegister({
        id: cashRegisterResponse.id, // ID de la caja a actualizar
        data: {
          ...cashRegisterResponse,
          cash_balance: updatedCashBalance, // Actualiza el balance de la caja
        },
      });
      
      if (!updateCashResponse?.id) {
        throw new Error("No se pudo actualizar el balance de la caja.");
      }
  
      // Crear el registro en SellerProducts (solo para ventas)
      if (data_transactions.type_transaction === 1) {
        const sellerProductBody = {
          person: data_transactions.user_id, // Usuario que realiza la venta
          product: data_product.id,
          transaction_id: transactionResponse.id,
          transacted: data_transactions.amount, // Cantidad transaccionada
          date: new Date().toISOString(),
          is_active: true,
        };
  
        const sellerProductResponse = await fetchPost({
          url: json.seller_products,
          body: sellerProductBody,
        });
  
        if (!sellerProductResponse?.id) {
          throw new Error("No se pudo registrar en SellerProducts.");
        }
  
        response = {
          success: true,
          product: productUpdateResponse,
          transaction: transactionResponse,
          seller_product: sellerProductResponse,
          cash_register: updateCashResponse,
        };
      } else {
        response = {
          success: true,
          product: productUpdateResponse,
          transaction: transactionResponse,
          cash_register: updateCashResponse,
        };
      }
    } catch (error) {
      console.error("Error en createSellerProduct:", error);
      response = { success: false, error: error.message };
    }
    return response;
  };
  