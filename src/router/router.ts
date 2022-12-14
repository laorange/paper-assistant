import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import ArticleCopyTool from "./article-copy-tool/ArticleCopyTool.vue";


const routes: RouteRecordRaw[] = [
    {
        name: "ArticleCopyTool",
        path: "/article-copy-tool/",
        component: ArticleCopyTool,
        alias: "/",
    },
];

export default createRouter({
    history: createWebHashHistory(),
    routes,
});
