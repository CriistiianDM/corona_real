import { isUserAuthenticated, getUserData,saveUserData } from "../indexedDB/indexedDB"

export const getData = () => {
    return new Promise((resolve, reject) => {
        let existDB = false;
        isUserAuthenticated((isAuthenticated) => {
            existDB = isAuthenticated;
            if (existDB) {
                getUserData((userData) => {
                    resolve(userData);
                });
            } else {
                resolve({});
            }
        });
    });
};

export const addDataToDB = (oldData, type, newValue) => {
    oldData[type] = newValue
    saveUserData(oldData)
}