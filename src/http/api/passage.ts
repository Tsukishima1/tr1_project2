import myAxios from "../axios";
import { queryAllHallComment } from './hallcomment';

// 下载文章资源
interface DownResourceParams {
    filePath: string;
}
export function downResources (params: DownResourceParams) {
    return myAxios({
        url:'/passage/downResources',
        method: 'POST',
        params,
        responseType: 'blob'
    })
}

// 查询一个文章的图片、资源、及其内容
interface UpResourceParams {
    passageID: number;
}
export function passageResources (params: UpResourceParams) {
    return myAxios({
        url: '/passage/passageResources',
        method: 'GET',
        params: params
    })
}

// 查询所有文章
interface QueryAllPassageParams {
    pageNo: string,
    pageSize: string
}

export function queryAllPassage (params: QueryAllPassageParams) {
    return myAxios({
        url:'/passage/queryAllPassage',
        method: 'GET',
        params: {
            ...params,
        }
    })
}

// 查询文章评论
interface QueryCommentByPassageIDParams {
    pageNo: string,
    pageSize: string,
    passageID: number
}

export function queryCommentByPassageID (params: QueryCommentByPassageIDParams) {
    return myAxios({
        url:'/passage/queryCommentByPassageID',
        method: 'GET',
        params: {
            ...params
        }
    })
}