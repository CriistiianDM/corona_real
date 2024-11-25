// Importaciones locales
import json from "../../../.conf";

// Importaciones de utilidades y funciones
import { initDB } from "../indexedDB/indexedDB";
import { fetchPostGeneral , fetchGetGeneral , fetchPutGeneral} from "../fetchs/fetchs";
import { Login , CreateUser } from "./person/api"

export const createDB = () => initDB()

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


export const fetchPut = async ({ data ,url }) => {
    let response = {}
    try {
        const res_ = await fetchPutGeneral({
           dataSend : data,
           urlEndPoint: url
        })
        if (res_) response = res_
    } catch (e) {
        console.log(e)
    }
    return response
}