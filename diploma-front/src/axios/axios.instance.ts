import axios, {CreateAxiosDefaults} from 'axios'
import {toast} from "react-toastify";

const instance = axios.create({
    baseURL: 'http://localhost:4000',
} as CreateAxiosDefaults)

instance.interceptors.response.use((res) => {
    toast.success(res.data.message)
    return res;
}, (err) => {
    toast.error(err.response.data.message)
    if (err.response.status === 403) {
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
        setTimeout(() => {
            window.location.assign('/login')
        }, 1500)
    }
})

export default instance;
