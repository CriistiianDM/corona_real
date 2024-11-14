// Importaciones locales
import json from "../../../.conf"; // Archivo de configuración

// Importaciones de utilidades y funciones
import { initDB } from "../indexedDB/indexedDB";
import { getCrsftToken } from "../token/token";
import { fetchPostGeneral } from "../fetchs/fetchs";
import { removeUserData, saveUserData } from "../indexedDB/indexedDB"
import { getData, addDataToDB } from "../utils/utils"

export const createDB = () => initDB()

export const test = async () => {
    await Login({
        "username": "holi",
        "password": "password123",
    })
    // await CreateUser({
    //     "name": "Juan Perez",
    //     "username": "ajnhd",
    //     "password": "password123",
    //     "type_person": 1,
    //     "identification": 12493789,
    //     "fecha_expedition": "2024-01-01T10:00:00Z"
    // })
}

export const Login = async ({ username, password}) => {
    let response = {}
    try {
        const db_ = await getData() ?? {}
        const res_ = await fetchPostGeneral({
           dataSend: { 
                username: username, 
                password: password
            },
           urlEndPoint: `${json.URL}${json.login}`
        })

        if (res_?.status) {
            removeUserData()
            response.crsftToken = db_?.crsftToken
            response.authorization = db_?.authorization
            response.username = username
            response.password = password
            saveUserData(response)
        }
    } catch (e) {
        console.log(e)
    }
    return response
}

export const CreateUser = async (data) => {
    let response = {}
    try {
        const db_ = await getData() ?? {}
        const res_ = await fetchPostGeneral({
           dataSend: data,
           urlEndPoint: `${json.URL}${json.create}`
        })

        if (res_?.status) {
            console.log(res_)
            response.crsftToken = db_?.crsftToken
            response.authorization = db_?.authorization
            response.user = res_.user
            response.username = data.username
            response.password = data.password
            removeUserData()
            saveUserData(response)
        }
    } catch (e) {
        console.log(e)
    }
    return response
}