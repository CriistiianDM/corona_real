import json from "../../../../.conf";
import { fetchPost, fetchGet, fetchPut } from "../api";

// Hoosk
import { updateRoom } from "../inventory/api"

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

/**
 * Crea un nuevo registro de caja enviando los datos al servidor.
 * @async
 * @function
 * @param {Object} params - Parámetros necesarios para la solicitud.
 * @param {Object} params.data - Los datos que se enviarán para crear el registro.
 * @returns {Promise<Object>} Una promesa que se resuelve con la respuesta del servidor.
 * @throws {Error} Si ocurre un error al enviar los datos.
 */
export const postTransaction = async ({ data }) => {
    let response = {}
    try {
        response = await fetchPost({ 
            url: json.transactionPost,
            body: data,
        });
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
    return response
}


export const createRoomReservation = async ({ data }) => {
    let response = {}
    try {
        // Actualizar Estados
        const {
            data_room, // Asegurada
            data_transactions, // Asegurada
            data_room_reservation,
            data_user // Asegurada
        } = data

        if (data_room == null) return response

        // Cambiamos el estado
        data_room.status = "ocupado"

        // Actualizar estado a ocupado la habitacion
        const roomState = await updateRoom(
            data_room.id,
            data_room
        )

        if (roomState?.id === undefined) return response

        const data_transaction = {
            type_transaction: data_transactions?.type_transaction ?? 1,
            cash_register: data_transactions?.cash_register ?? 1,
            description: "room_reservation",
            value: data_transactions?.value ?? 0,
        }

        const transaction_res = await postTransaction({ data: data_transaction })
        
        if (transaction_res?.id === undefined) return response

        const room_reservation_body = {
            reservation: null,
            room: data_room.id,
            update_by: data_user.id,
            id_transaction: transaction_res?.id ?? null,
            occupancy: {list: []},
            count_accompany: data_room_reservation?.count_accompany ?? 0,
            date: data_room_reservation?.date,
            date_finish: data_room_reservation?.date_finish,
            status: data_room_reservation?.status,
            id_guest: data_room_reservation?.id_guest ?? 1,
        }

        // Crear La transacion
        response = await fetchPost({ 
            url: json.room_reservation,
            body: room_reservation_body,
        });
    } catch (error) {
        console.error("Error al crear RoomReservation:", error);
    }
    return response
}
