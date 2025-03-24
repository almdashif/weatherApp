import logger from '../Utils/logger';



export async function PostApiSelect(url, data) {

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => {
            return res;
        })
        .catch((error) => {
            logger.log(error, 'error');
        });
};

export async function GetApiSelect(url) {

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    return fetch(url, {
        method: 'GET',
        headers: headers,
    })
        .then(res => res.json())
        .then(res => {
            return res;
        })
        .catch((error) => {
            logger.log(error, 'error');
        });
};