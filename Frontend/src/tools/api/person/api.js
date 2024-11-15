// Importaciones locales
import json from "../../../../.conf";

// Importaciones de utilidades y funciones
import { removeUserData, saveUserData } from "../../indexedDB/indexedDB"
import { getData, addDataToDB } from "../../utils/utils"
import {fetchPost, fetchGet} from "../api"

export const Login = async ({ username, password}) => {
    let response = {}
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

    return response
}

export const CreateUser = async (data) => {
    let response = {}
    const db_ = await getData() ?? {}
    const res = await fetchPost({
        url: json.login,
        body: data
    })

    if (res_?.status) {
        response.authorization = db_?.authorization
        response.user = res_.user
        response.username = data.username
        response.password = data.password
        removeUserData()
        saveUserData(response)
    }

    return response
}