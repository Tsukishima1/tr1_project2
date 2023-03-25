import myAxios from "../axios";

// 查询公告
export function queryNotice () {
    return myAxios({
        url:'/api/notice/queryNotice',
        method: 'GET'
    })
}