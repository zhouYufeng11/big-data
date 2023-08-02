import { createApp } from 'vue'
import App from './App.vue'
import './main.css';
import router from './router/index'
import { Message } from '@arco-design/web-vue';
import { createPinia } from 'pinia'

const pinia = createPinia();

const app = createApp(App)

// 状态管理
app.use(pinia);
// 路由
app.use(router)

Message._context = app._context;

app.config.globalProperties.$message = Message;

// console.log(app.config);
app.config.errorHandler = (err, vm, info) => {
  // 处理错误
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // console.log(err);
  // console.log(info);
}

app.mount('#app')