import api from "..";

export function _getCategory() {
    return api({
        method: 'GET',
        url: '/category/list'
    })
}

export function _createCategory(data: Object) {
    return api({
        method: 'POST',
        data,
        url: '/category/create'
    })
}

export function _deleteCategory(id: string) {
    return api({
        method: 'DELETE',
        url: `/category/delete/${id}`
    })
}

export function _updateCategory(id: string, data: Object) {
    return api({
        method: 'PUT',
        data,
        url: `/category/update/${id}`
    })
}