import api from "..";

export function _getCity() {
    return api({
        method: 'GET',
        url: '/city/list'
    })
}

export function _createCity(data: Object) {
    return api({
        method: 'POST',
        data,
        url: '/city/create'
    })
}

export function _deleteCity(id: string) {
    return api({
        method: 'DELETE',
        url: `/city/delete/${id}`
    })
}

export function _updateCity(id: string, data: Object) {
    return api({
        method: 'PUT',
        data,
        url: `/city/update/${id}`
    })
}