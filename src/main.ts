import { createApp } from "vue";
import App from "./App.vue";
import "intro.js/introjs.css";
import { createPinia } from "pinia";
import Vue3Storage from "vue3-storage";

// 扩展 Window 接口，声明 gtag 属性
declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        dataLayer?: any[];
    }
}

// 定义 Google Ads 加载函数
function loadGoogleAds() {
    if (!window.gtag) {
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=GTM-P7SH7GHFBW";
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            window.dataLayer!.push(arguments);
        };
        window.gtag("js", new Date());
        window.gtag("config", "GTM-P7SH7GHFBW");
    }
}

// 调用 Google Ads 加载函数
loadGoogleAds();

// 创建 Vue 应用
createApp(App)
    .use(createPinia())
    .use(Vue3Storage, { namespace: "laorange_" })
    .mount("#app");
