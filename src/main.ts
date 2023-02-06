import {createApp} from "vue";
import App from "./App.vue";
import "intro.js/introjs.css"
import {createPinia} from "pinia";
import Vue3Storage from "vue3-storage";

createApp(App)
    .use(createPinia())
    .use(Vue3Storage, { namespace: "laorange_" })
    .mount("#app");
