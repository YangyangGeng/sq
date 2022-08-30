import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

const baseURL: string = "http://localhost:3000";

interface IResponse {
    success: boolean,
    msg: any
}

declare module 'axios' {
    interface AxiosInstance {
        (config: AxiosRequestConfig): Promise<any>
    }
}

const api = axios.create({
    baseURL,
    timeout: 8000,
})

api.interceptors.request.use((req: AxiosRequestConfig) => {
    const token: string = localStorage.getItem('token') as string;
    // req.headers.token = token;
    return req;
})

api.interceptors.response.use((res: AxiosResponse) => {
    const response: IResponse = res.data;
    if (!response.success) {
        ElMessage.warning({
            message: response.msg,
            type: 'warning'
        })
    }
    return response;
}, err => console.log(err))

export default api;