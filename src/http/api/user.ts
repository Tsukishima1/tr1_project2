import myAxios from "../axios";

//注册
export function userRegister(password:string, username:string) {
    return myAxios({
        url:"/api/user/register",
        method: 'POST',
        data: {
            password, username
        }
    })
}

//登录
export function userLogin(password:string, username:string) {
    return myAxios({
        url:"/api/user/login",
        method: 'POST',
        data: {
            password, username
        }
    });
}