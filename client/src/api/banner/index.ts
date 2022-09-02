import api from "..";

export function _getBanner(query: any) {
    return api({
        method: 'GET',
        url: `/banner/list/${query.currentPage}/${query.pageSize}`
    })
}

export function _createBanner(data: Object) {
    return api({
        method: 'POST',
        data,
        url: '/banner/create'
    })
}

export function _updateBanner(id: string, data: Object) {
    return api({
        method: 'PUT',
        data,
        url: `/banner/update/${id}`
    })
}