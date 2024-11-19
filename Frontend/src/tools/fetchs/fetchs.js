/**
 * @author: Cristian Machado <cristian.machado@correounivalle.edu.co>
 * @copyright: 2024 
*/

import { getCrsftToken, getAuthorization } from "../token/token";


const methodPut = 'PUT';
const methodPost = 'POST';
const methodGet = 'GET';

/**
 * General Structure HTTP REQUEST POST
 * 
 * @param {*} param0 
 * @returns 
 */
export const fetchPostGeneral = ({ 
    dataSend, 
    urlEndPoint,
}) => {
    return fetchGeneral({
        dataSend,
        urlEndPoint,
        type: methodPost     
    });
}


/**
 * General Structure HTTP REQUEST POST
 * 
 * @param {*} param0 
 * @returns 
 */
export const fetchPostWioutSigned = ({ 
    dataSend, 
    urlEndPoint,
}) => {
    return fetchGeneralWhioutSigned({
        dataSend: dataSend,
        urlEndPoint,
        type: methodPost     
    });
}


/**
 * General Structure HTTP REQUEST PUT
 * 
 * @param {*} param0 
 * @returns 
 */
export const fetchPutGeneral = ({ 
    dataSend, 
    urlEndPoint
}) => {
    return fetchGeneral({
        dataSend,
        urlEndPoint,
        type: methodPut    
    });
};

/**
 * General Structure HTTP REQUEST GET
 * 
 * @param {*} param0 
 * @returns 
 */
export const fetchGetGeneral = ({ 
    urlEndPoint
}) => {
    return fetchGeneral({
        urlEndPoint,
        type: methodGet  
    });
}

/**
 * General Structure HTTP REQUEST
 * 
 * @param {*} param0 
 * @returns 
 */
const fetchGeneral = async ({
    dataSend,
    urlEndPoint,
    type
}) => {
    let response = null

    const csrftToken = await getCrsftToken() ?? ""
    const authorization = await getAuthorization() ?? ""

    try {
        const options = {
            method: type,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': `${csrftToken}`,
                'Authorization': `Token ${authorization}`
            },
        };

        if (type === methodPost || type === methodPut) {
            options.body = JSON.stringify(dataSend);
        }

        response = await fetch(urlEndPoint, options);
        return await response.json();
        
    } catch (error) {
        console.log(error);
    }
    return response
}

/**
 * General Structure HTTP REQUEST
 * 
 * @param {*} param0 
 * @returns 
 */
const fetchGeneralWhioutSigned = async ({
    dataSend,
    urlEndPoint,
    type
}) => {
    let response = null
    try {
        const options = {
            method: type,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (type === methodPost || type === methodPut) {
            options.body = JSON.stringify(dataSend);
        }

        response = await fetch(urlEndPoint, options);
        return await response.json();
        
    } catch (error) {
        console.log(error);
    }
    return response
}