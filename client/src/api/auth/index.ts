import api from "..";

export function _login(data: Object) {
    return api({
        method: 'POST',
        data,
        url: '/auth/login'
    })
}