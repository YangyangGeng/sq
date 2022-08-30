import api from "..";

export function _hello() {
    return api({
        method: 'GET',
        url: '/user/hello'
    })
}

export function _getUserInfo(uid: string) {
    return api({
        method: 'GET',
        url: `/user/getUserInfo/${uid}`
    })
}

export function _getUsers(query: any) {
    const params: any = {};
    if (query.phone) {
        params.phone = query.phone;
    }
    if (query.nickname) {
        params.nickname = query.nickname;
    }
    return api({
        method: 'GET',
        params,
        url: `/user/list/${query.currentPage}/${query.pageSize}`
    })
}

export function _deleteUser(uid: string) {
    return api({
        method: 'DELETE',
        url: `/user/deleteUser/${uid}`
    })
}

export function _updateUser(data: any) {
    return api({
        method: 'PUT',
        data,
        url: `/user/updateUser`
    })
}
