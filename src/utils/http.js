import axios from 'axios';
// import store from '@/store';

const http = {}

const instance = axios.create({
    timeout: 5000, // 超时时间 (毫秒)
});

instance.interceptors.request.use(
    function(config) {
        // 在发送请求之前做些什么
        // if (store.state.userToken) {
        //     config.headers.Authorization = store.state.userToken; 
        // }
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        const res = response.data;
        if (res.code !== 200) { // 根据业务需求判断状态码
            console.error(`Error: ${res.message}`);
            return Promise.reject(new Error(res.message || 'Request failed'));
        } else {
            return res;
        }
    },
    error => {
        // 对响应错误做点什么
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.error('Unauthorized');
                    break;
                case 403:
                    console.error('Forbidden');
                    break;
                case 404:
                    console.error('Not Found');
                    break;
                default:
                    console.error('Network error');
            }
        }
        return Promise.reject(error);
    }
);

http.get = function(url, params){
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
        })
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            reject(err.data)
        })
    })
}


// Post2 数据格式不用转化，且可以指定头部信息
http.post = function(url, params, type){
    return new Promise((resolve, reject) => {
        axios.post(url, params, type)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}


export default http