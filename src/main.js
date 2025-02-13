// 중괄호가 쳐져있으면, 메서드를 import. 중괄호가 없으면 해당 파일 자체를 improt.
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import axios from 'axios'

const app = createApp(App)

// axios 모든 요청을 인터셉팅하여 모든 요청마다 액세스 토큰을 자동으로 포함.
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if(token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => {
        // 에러가 발생시, 사용자의 본래요청의 화면으로 되돌아가야함.
        return Promise.reject(error);
    }

)

// 모든 axios요청에서 401 또는 403 응답을 받을 경우에 interceptor를 통해 rt를 통한 at 재발급
// rt마저 만료되었을때는 login창으로 이동
axios.interceptors.response.use(
    response => response,
    async error => {
        if(error.response && error.response.status === 401 ) {
            try{
                const refreshToken = localStorage.getItem('refreshToken')
                localStorage.removeItem('token')
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/refresh-token`, {refreshToken})
                console.log(response)
                const token = response.data.token;
                localStorage.setItem('token', token)
                window.location.reload()
            } catch(e) {
                localStorage.clear()
                window.location.href = "/member/login"
            }
        }
        return Promise.reject(error)
    }

)

app.use(vuetify)
app.use(router)
app.mount('#app')
