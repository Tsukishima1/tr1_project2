import myAxios from "../axios";

// 在文章中评论
interface CreateCommentParams {
    content: string,
    passageID: number,
    userID: number
}

export function createComment (params: CreateCommentParams) {
    return myAxios({
        url:'/comment/createComment',
        method: 'POST',
        data: {},
        params: {
            ...params,
        }
    })
}