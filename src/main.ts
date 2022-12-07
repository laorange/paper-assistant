import {createApp} from "vue";
import App from "./App.vue";
import router from "./router/router";
import "intro.js/introjs.css"

createApp(App)
    .use(router)
    .mount("#app");
