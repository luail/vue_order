// 중괄호가 쳐져있으면, 메서드를 import. 중괄호가 없으면 해당 파일 자체를 improt.
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

app.use(vuetify)
app.use(router)
app.mount('#app')
