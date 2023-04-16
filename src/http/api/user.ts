import myAxios from "@/http/axios";

//注册
export function userRegister(password:string, username:string) {
    return myAxios({
        url:"/user/register",
        method: 'POST',
        data:{},
        params: {
            password, username
        }
    })
}

//登录
export function userLogin(password:string, username:string) {
    return myAxios({
        url:"/user/userLogin",
        method: 'POST',
        data: {},
        params: {
            password, username
        }
    });
}