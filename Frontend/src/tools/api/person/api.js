// Importaciones locales
import json from "../../../../.conf";

// Importaciones de utilidades y funciones
import { removeUserData, saveUserData } from "../../indexedDB/indexedDB"
import { getData, addDataToDB } from "../../utils/utils"
import {fetchPost, fetchGet, fetchPut} from "../api"

export const Login = async ({ username, password}) => {
    let response = {}
    try {
        const db_ = await getData() ?? {}
        const res = await fetchPost({
            url: json.login,
            body: {
                username: username,
                password: password
            }
        })
    
        if (res?.status) {
            removeUserData()
            response.authorization = db_?.authorization
            response.username = username
            response.password = password
            response.token = true
            saveUserData(response)
        }
    
    } catch (e) {
        console.log(e)
    }
    return response
}

export const updatePerson = async (id, personData) => {
    try {
      const response = await fetchPut({
        url: json.person + id + '/', 
        data: personData,
      });
      return response;
    } catch (error) {
      console.error("Error al actualizar persona:", error);
      throw error;
    }
  };

export const CreateUser = async (data) => {
    let response = {}
    const db_ = await getData() ?? {}
    const res = await fetchPost({
        url: json.create,
        body: data
    })
    if (res?.status) {
        response.authorization = db_?.authorization
        response.user = res.user
        response.username = data.username
        response.password = data.password
        removeUserData()
        saveUserData(response)
    }

    return response
}

export const createPerson = async (personData) => {
    try {
        const response = await fetchPost({
            url: json.person, // Define que el endpoint sea '/api/person/'.
            body: personData,
        });
        return response;
    } catch (error) {
        console.error("Error al crear persona:", error);
        return null;
    }
};

// Obtener todas las personas
export const getPersons = async () => {
    try {
        const response = await fetchGet({ url: json.person });
        return response;
    } catch (error) {
        console.error("Error al obtener personas:", error);
    }
};