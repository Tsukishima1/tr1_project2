import myAxios from "../axios";

// 创建大厅评论
interface CreateHallCommentParams {
    content: string;
}

export function createHallComment (params: CreateHallCommentParams) {
    return myAxios({
        url:'/hallComment/createHallComment',
        method: 'POST',
        data: {},
        params: params
    })
}

// 查询所有大厅评论
interface QueryAllHallCommentParams {
    pageNo: string,
    pageSize: string
}

export function queryAllHallComment (params: QueryAllHallCommentParams) {
    return myAxios({
        url:'/hallComment/queryAllHallComment',
        method: 'POST',
        data: {},
        params: {
            ...params
        }
    })
}