export const BASE_URL = ' https://auth.nomoreparties.co';

export const register = (inputData) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: inputData.email,
            password: inputData.password
        }),
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка:  ${res.status}`));
};

export const login = (inputData) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: inputData.email,
            password: inputData.password
        }),
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка:  ${res.status}`));
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка getContent: ${res.status}`));
};