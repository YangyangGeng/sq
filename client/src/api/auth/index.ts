import api from "..";

export function _login(data: Object) {
    return api({
        method: 'POST',
        data,
        url: '/auth/login'
    })
}

export function _register(data: Object) {
    return api({
        method: 'POST',
        data,
        url: '/auth/register'
    })
}