import json from "../../../../.conf";
import { fetchPost, fetchGet, fetchPut } from "../api";

/**
 * Obtiene la lista de registros de caja desde el servidor.
 * @async
 * @function
 * @returns {Promise<Array>} Una promesa que se resuelve con la lista de registros de caja.
 * @throws {Error} Si ocurre un error al obtener los registros de caja.
 */
export const getCashRegister = async () => {
    let response = []
    try {
        response = await fetchGet({ url: json.cashRegister });
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
    return response
}

/**
 * Crea un nuevo registro de caja enviando los datos al servidor.
 * @async
 * @function
 * @param {Object} params - Parámetros necesarios para la solicitud.
 * @param {Object} params.data - Los datos que se enviarán para crear el registro.
 * @returns {Promise<Object>} Una promesa que se resuelve con la respuesta del servidor.
 * @throws {Error} Si ocurre un error al enviar los datos.
 */
export const postCashRegister = async ({ data }) => {
    let response = {}
    try {
        response = await fetchPost({ 
            url: json.cashRegister,
            body: data,
        });
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
    return response
}

/**
 * Actualiza un registro de caja existente enviando los datos al servidor.
 * @async
 * @function
 * @param {Object} params - Parámetros necesarios para la solicitud.
 * @param {Object} params.data - Los datos actualizados que se enviarán.
 * @returns {Promise<Object>} Una promesa que se resuelve con la respuesta del servidor.
 * @throws {Error} Si ocurre un error al actualizar los datos.
 */
export const putCashRegister = async ({ data }) => {
    let response = {}
    try {
        response = await fetchPut({ 
            url: json.cashRegister,
            data: data,
        });
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
    return response
}

/**
 * Obtiene la lista de tipos de registros de caja desde el servidor.
 * @async
 * @function
 * @returns {Promise<Array>} Una promesa que se resuelve con la lista de tipos de registros de caja.
 * @throws {Error} Si ocurre un error al obtener los tipos de registros de caja.
 */
export const getTypeCashRegister = async () => {
    let response = []
    try {
        response = await fetchGet({ url: json.typeCashRegister });
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
    return response
}
