import { fetchPostWioutSigned } from "../fetchs/fetchs";
import { getData, addDataToDB } from "../utils/utils"
import json from "../../../.conf"

const KEY = "MZDNJKZFBMU874JHSJHHUIRQWIURHIUNRKJNUIHU8GV"

export const getCrsftToken = async () => {
    const data = await getData() ?? {}
    if (data?.crsftToken) return data?.crsftToken

    const response = await fetchPostWioutSigned({
        dataSend: {key: KEY},
        urlEndPoint: `${json.URL}${json.csrftToken}`
    })
    addDataToDB(data,'crsftToken', response?.token)

    return response?.token
}

export const getAuthorization = async () => {
    const data = await getData() ?? {}
    console.log("no es de por aqui",data)
    // if (!data?.username) return  ``
    // if (data?.authorization) return data?.authorization

    const response = await fetchPostWioutSigned({
        dataSend: {
          username: "lenincar",
          password: "MBg3hZwdHb525qjUw"
        },
        urlEndPoint: `${json.URL}${json.authorization}`
    })
    addDataToDB(data,'authorization', response?.token)

    return response?.token
}