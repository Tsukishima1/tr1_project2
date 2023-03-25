import axios, {AxiosInstance} from 'axios';

function myAxios(axiosConfig:any) {
    const service:AxiosInstance = axios.create({
        // baseURL:"http://pve.lycoris.site:9780",
        timeout: 10000,
    });

    // 设置请求拦截器
    service.interceptors.request.use((config)=> {
        // if (config.data && config.headers['Content-Type']==='application/x-www-form-urlencoded') {
        //     config.data = new URLSearchParams(config.data).toString();
        // }
        // // 绑定token
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = 'Bearer ' + token;
        // }

        return config;
    },function (error) {
        return Promise.reject(error);
    })
    

    return service(axiosConfig);
}

export default myAxios;