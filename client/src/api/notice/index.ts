import api from "..";

export function _getNotice(query: any) {
    return api({
        method: 'GET',
        url: `/notice/list/${query.currentPage}/${query.pageSize}`
    })
}

export function _createNotice(data: Object) {
    return api({
        method: 'POST',
        data,
        url: '/notice/create'
    })
}

export function _updateNotice(id: string, data: Object) {
    return api({
        method: 'PUT',
        data,
        url: `/notice/update/${id}`
    })
}