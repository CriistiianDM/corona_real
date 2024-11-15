// Importaciones locales
import json from "../../../.conf";

// Importaciones de utilidades y funciones
import { initDB } from "../indexedDB/indexedDB";
import { fetchPostGeneral , fetchGetGeneral} from "../fetchs/fetchs";
import { Login } from "./person/api"

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

export const fetchPost = async ({url , body}) => {
    let response = {}
    try {
        const res_ = await fetchPostGeneral({
           dataSend: body,
           urlEndPoint: url
        })
        if (res_) response = res_
    } catch (e) {
        console.log(e)
    }
    return response
}

export const fetchGet = async ({ url }) => {
    let response = {}
    try {
        const res_ = await fetchGetGeneral({
           urlEndPoint: url
        })
        if (res_) response = res_
    } catch (e) {
        console.log(e)
    }
    return response
}