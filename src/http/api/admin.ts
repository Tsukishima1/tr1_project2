import myAxios from "../axios";

// 在文章中评论
interface AdminCreateCommentParams {
    content: string,
    passageID: number,
}

export function adminCreateComment (params: AdminCreateCommentParams) {
    return myAxios({
        url:'/admin/createComment',
        method: 'POST',
        data: {},
        params: {
            ...params,
        }
    })
}

// 创建文章
interface AdminCreatePassageParams {
    content: string,
    title: string,
}

export function adminCreatePassage (params: AdminCreatePassageParams) {
    return myAxios({
        url:'/admin/createPassage',
        method: 'POST',
        data: {},
        params: {
            ...params,
        }
    })
}

// 删除评论
interface AdminDeleteCommentParams {
    commentID: number,
}

export function adminDeleteComment (params: AdminDeleteCommentParams) {
    return myAxios({
        url:'/admin/deleteComment',
        method: 'POST',
        data: {},
        params: {
            ...params,
        }
    })
}

// 删除大厅评论
interface AdminDeleteHallCommentParams {
    ID: number,
}

export function adminDeleteHallComment (params: AdminDeleteHallCommentParams) {
    return myAxios({
        url:'/admin/deleteHallComment',
        method: 'POST',
        data: {},
        params: params
    })
}

// 删除文章图片
interface AdminDeleteImgParams {
    imgID: number
}

export function adminDeleteImg (params: AdminDeleteImgParams) { 
    return myAxios({
        url:'/admin/deleteImg',
        method: 'POST',
        data: {},
        params: params
    })
}

// 删除文章
interface AdminDeletePassageParams {
    passageID: number
}

export function adminDeletePassage (params: AdminDeletePassageParams) {
    return myAxios({
        url:'/admin/deletePassage',
        method: 'POST',
        data: {},
        params: params
    })
}

// 删除文章资源
interface AdminDeleteResourcesParams {
    resourcesID: number
}

export function adminDeleteResources (params: AdminDeleteResourcesParams) {
    return myAxios({
        url:'/admin/deleteResources',
        method: 'POST',
        data: {},
        params: params
    })
}

// 查询所有用户
interface AdminQueryAllUserParams {
    pageNo: string,
    pageSize: string
}

export function adminQueryAllUser (params: AdminQueryAllUserParams) {
    return myAxios({
        url:'/admin/queryAllUser',
        method: 'POST',
        data: {},
        params: {
            ...params
        }
    })
}

// 根据评论个数返回文章
export function adminQueryPassageByCommentCount () {
    return myAxios({
        url:'/admin/queryPassageByCommentCount',
        method: 'POST',
        data: {}
    })
}

// 查询文件总数
export function adminQueryTotalFileCount () {
    return myAxios({
        url:'/admin/queryTotalFileCount',
        method: 'POST',
        data: {}
    })
}

// 根据用户名查询注册信息
interface AdminQueryUserInfoByName {
    name: string
}

export function adminQueryUserInfoByName (params: AdminQueryUserInfoByName) {
    return myAxios({
        url:'/admin/queryUserInfoByName',
        method: 'POST',
        data: {},
        params: params
    })
}

// 更新公告
interface AdminUpdateNoticeParams {
    content: string
}

export function adminUpdateNotice (params: AdminUpdateNoticeParams) {
    return myAxios({
        url:'/admin/updateNotice',
        method: 'POST',
        data: {},
        params: params
    })
}

// 更新文章
interface AdminUpdatePassageParams {
    content: string,
    passageID: number,
    title: string
}

export function adminUpdatePassage (params: AdminUpdatePassageParams) {
    return myAxios({
        url:'/admin/updatePassage',
        method: 'POST',
        data: {},
        params: {
            ...params,
        }
    })
}

// 上传文章图片
// interface UploadImgParams {
//     file: File,
//     passageID: number,
// }

