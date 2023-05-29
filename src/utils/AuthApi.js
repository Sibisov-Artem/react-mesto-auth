export const BASE_URL = ' https://auth.nomoreparties.co';

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка:  ${res.status}`);
}

function request(url, options) {
    return fetch(url, options).then(checkResponse);
}

export const register = (inputData) => {
    return request(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: inputData.email,
            password: inputData.password
        }),
    })
};

export const login = (inputData) => {
    return request(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: inputData.email,
            password: inputData.password
        }),
    })
};

export const checkToken = (token) => {
    return request(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    })
};