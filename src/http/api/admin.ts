import myAxios from "../axios";

// 在文章中评论
export function adminCreateComment (content:string, passageID:number) {
    return myAxios({
        url:'/api/admin/createComment',
        method: 'POST',
        data: {
            content, passageID
        }
    })
}

// 创建文章
export function adminCreatePassage (content:string, title:string) {
    return myAxios({
        url:'/api/admin/createPassage',
        method: 'POST',
        data: {
            content, title
        }
    })
}

// 删除评论
export function adminDeleteComment (commentID: number) {
    return myAxios({
        url:'/api/admin/deleteComment',
        method: 'POST',
        data: {
            commentID,
        }
    })
}

// 删除大厅评论
export function adminDeleteHallComment (ID:number) {
    return myAxios({
        url:'/api/admin/deleteHallComment',
        method: 'POST',
        data: {
            ID
        }
    })
}

// 删除文章图片
export function adminDeleteImg (imgID:number) {
    return myAxios({
        url:'/api/admin/deleteImg',
        method: 'POST',
        data: {
            imgID
        }
    })
}

// 删除文章
export function adminDeletePassage (passageID:number) {
    return myAxios({
        url:'/api/admin/deletePassage',
        method: 'POST',
        data: {
            passageID
        }
    })
}

// 删除文章资源
export function adminDeleteResources (resourcesID:number) {
    return myAxios({
        url:'/api/admin/deleteResources',
        method: 'POST',
        data: {
            resourcesID
        }
    })
}

// 查询所有用户
export function adminQueryAllUser (pageNo:string, pageSize:string) {
    return myAxios({
        url:'/api/admin/queryAllUser',
        method: 'POST',
        data: {
            pageNo, pageSize
        }
    })
}

// 根据评论个数返回文章
export function adminQueryPassageByCommentCount () {
    return myAxios({
        url:'/api/admin/queryPassageByCommentCount',
        method: 'POST',
        data: { }
    })
}

// 查询文件总数
export function adminQueryTotalFileCount () {
    return myAxios({
        url:'/api/admin/queryTotalFileCount',
        method: 'POST',
        data: { }
    })
}

// 根据用户名查询注册信息
export function adminQueryUserInfoByName (name:string) {
    return myAxios({
        url:'/api/admin/queryUserInfoByName',
        method: 'POST',
        data: {
            name
        }
    })
}

// 更新公告
export function adminUpdateNotice (content:string) {
    return myAxios({
        url:'/api/admin/updateNotice',
        method: 'POST',
        data: {
            content
        }
    })
}

// 更新文章
export function adminUpdatePassage (content:string, passageID:number, title:string) {
    return myAxios({
        url:'/api/admin/updatePassage',
        method: 'POST',
        data: {
            content, passageID, title
        }
    })
}