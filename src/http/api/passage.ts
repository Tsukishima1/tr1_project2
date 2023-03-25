import myAxios from "../axios";

// 下载文章资源
export function downResources (filePath: string) {
    return myAxios({
        url:'/api/passage/downResources',
        method: 'POST',
        data: {
            filePath
        }
    })
}

// 查询一个文章的图片、资源、及其内容
export function passageResources (passageID:number) {
    return myAxios({
        url: '/api/passage/passageResources',
        method: 'GET',
        params: {
            passageID
        }
    })
}

// 查询所有文章
export function queryAllPassage (pageNo:string, pageSize:string) {
    return myAxios({
        url:'/api/passage/queryAllPassage',
        method: 'GET',
        params: {
            pageNo, pageSize
        }
    })
}

// 查询文章评论
export function queryCommentByPassageID (pageNo:string, pageSize:string, passageID:number) {
    return myAxios({
        url:'/api/passage/queryCommentByPassageID',
        method: 'GET',
        params: {
            pageNo,pageSize,passageID
        }
    })
}