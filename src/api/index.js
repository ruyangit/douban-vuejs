import axios from 'axios'
import qs from 'qs'
import store from '../store'

// store.dispatch('global/message', 'info', {content:'这是一个内容'})

axios.interceptors.request.use(config => {
    store.dispatch('global/gProgress', 0)
    store.dispatch('global/gMessage', {type:'loading',content:'正在加载中...',duration: 0})
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function checkStatus(response) {
    store.dispatch('global/gProgress', 100)
    store.dispatch('global/gMessage','destroy');
    
    // console.log(response);
    if (response.status === 200 || response.status === 304) {
        return response
    }
    return {
        data: {
            code: -404,
            message: response.statusText,
            data: ''
        }
    }
}

function checkCode(res) {
    if (res.data.code === -500) {
        // window.location.href = '/backend'
    } else if (res.data.code === -400) {
        // window.location.href = '/'
    } else if (res.data.code !== 200) {
        // store.dispatch('global/showMsg', res.data.message)
    }
    return res
}

export default {
    post(url, data) {
        return axios({
            method: 'post',
            url: url,
            data: qs.stringify(data),
            timeout: 30000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkStatus).then(checkCode)
    },
    get(url, params) {
        return axios({
            method: 'get',
            url: url,
            params,
            timeout: 30000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkStatus).then(checkCode)
    }
}
