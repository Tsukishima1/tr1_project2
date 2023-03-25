import myAxios from "../axios";

// 创建大厅评论
export function createHallComment (content:string) {
    return myAxios({
        url:'/api/hallComment/createHallComment',
        method: 'POST',
        data: {
            content
        }
    })
}

// 查询所有大厅评论
export function queryAllHallComment (pageNo:string, pageSize:string) {
    return myAxios({
        url:'/api/hallComment/queryAllHallComment',
        method: 'POST',
        data: {
            pageNo, pageSize
        }
    })
}