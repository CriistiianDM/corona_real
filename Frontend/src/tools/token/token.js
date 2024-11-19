import { fetchPostWioutSigned } from "../fetchs/fetchs";
import { getData, addDataToDB } from "../utils/utils"
import json from "../../../.conf"

const KEY = "MZDNJKZFBMU874JHSJHHUIRQWIURHIUNRKJNUIHU8GV"

export const getCrsftToken = async () => {
    const data = await getData() ?? {}
    const response = await fetchPostWioutSigned({
        dataSend: {key: KEY},
        urlEndPoint: `${json.csrftToken}`
    })
    return response?.token
}

export const getAuthorization = async () => {
    const data = await getData() ?? {}
    if (data?.username === undefined) return  ``
    if (data?.authorization !== undefined) return data?.authorization
    const response = await fetchPostWioutSigned({
        dataSend: {
          username: data?.username,
          password: data?.password
        },
        urlEndPoint: `${json.authorization}`
    })
    addDataToDB(data,'authorization', response?.token)

    return response?.token
}