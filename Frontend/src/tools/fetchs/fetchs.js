/**
 * @author: Cristian Machado <cristian.machado@correounivalle.edu.co>
 * @copyright: 2024 
*/

import { getCrsftToken, getAuthorization } from "../token/token";

// Añadir al inicio del archivo
const methodDelete = 'DELETE';
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
    let response = null;

    const csrftToken = await getCrsftToken() ?? "";
    const authorization = await getAuthorization() ?? "";

    try {
        const options = {
            method: type,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': `${csrftToken}`,
                'Authorization': `Token ${authorization}`
            },
        };

        if (type === methodPost || type === methodPut || type === methodDelete) {
            options.body = JSON.stringify(dataSend);
        }

        response = await fetch(urlEndPoint, options);
        return await response.json();

    } catch (error) {
        console.log(error);
    }
    return response;
};


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



// ...

// /**
//  * Estructura General para HTTP REQUEST DELETE
//  *
//  * @param {*} param0
//  * @returns
//  */
// export const fetchDeleteGeneral = ({
//     dataSend,
//     urlEndPoint
// }) => {
//     return fetchGeneral({
//         dataSend,
//         urlEndPoint,
//         type: methodDelete
//     });
// };


/**
 * Estructura General para HTTP REQUEST DELETE
 *
 * @param {*} param0
 * @returns
 */
export const fetchDeleteGeneral = async ({
    urlEndPoint
}) => {
    let response = null;

    // Obtener tokens necesarios
    const csrftToken = await getCrsftToken() ?? "";
    const authorization = await getAuthorization() ?? "";

    try {
        // Configuración de la solicitud DELETE
        const options = {
            method: methodDelete,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': `${csrftToken}`,
                'Authorization': `Token ${authorization}`
            },
        };

        // Realizar la solicitud DELETE
        const res = await fetch(urlEndPoint, options);

        // Validar respuesta
        if (res.ok) {
            response = await res.json(); // Si el servidor responde con datos JSON
        } else {
            console.error(`Error en el DELETE: ${res.status} - ${res.statusText}`);
        }
    } catch (error) {
        console.error("Error al realizar la solicitud DELETE:", error);
    }

    return response;
};
