import myAxios from "../axios";

// 在文章中评论
export function createComment (content:string, passageID:number, userID:number) {
    return myAxios({
        url:'/api/comment/createComment',
        method: 'POST',
        data: {
            content, passageID, userID
        }
    })
}