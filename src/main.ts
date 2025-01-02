import { createApp } from "vue";
import App from "./App.vue";
import "intro.js/introjs.css";
import { createPinia } from "pinia";
import Vue3Storage from "vue3-storage";


// 创建 Vue 应用
createApp(App)
    .use(createPinia())
    .use(Vue3Storage, { namespace: "laorange_" })
    .mount("#app");
