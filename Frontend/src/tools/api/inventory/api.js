import json from "../../../../.conf";
import { fetchPost, fetchGet } from "../api"; 

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
        const url = `${json.products}${productId}/`; 
        const response = await fetchPost({
            url: url,
            body: productData, 
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
