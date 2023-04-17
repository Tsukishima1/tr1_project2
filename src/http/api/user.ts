import myAxios from "@/http/axios";

interface RegisterParams {
    password:string;
    username:string;
}

//注册
export function userRegister(params:RegisterParams) {
    return myAxios({
        url:"/user/register",
        method: 'POST',
        data:{},
        params: {
            ...params
        }
    })
}

interface LoginParams {
    password:string;
    username:string;
}

//登录
export function userLogin(params:LoginParams) {
    return myAxios({
        url:"/user/userLogin",
        method: 'POST',
        data: {},
        params: {
            ...params
        }
    });
}