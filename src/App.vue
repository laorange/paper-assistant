<script setup lang="ts">
import ArticleCopyTool from "./router/article-copy-tool/ArticleCopyTool.vue";
import CopyrightFooter from "./components/CopyrightFooter.vue";
import packageJson from "../package.json";
import {onBeforeMount, watch} from "vue";
import {useStorage} from "vue3-storage";
import {useStore, Storage} from "./store/useStore";

const LOCAL_STORAGE_KEY = "PA";

const projectUrl = `https://${location.href.indexOf("gitee") > -1 ? "gitee" : "github"}.com/laorange/paper-assistant`;

const store = useStore();
const storage = useStorage();

watch(() => store.storage, (newStorage) => {
  storage.setStorageSync(LOCAL_STORAGE_KEY, newStorage);
}, {deep: true});

onBeforeMount(() => {
  let storageNow = storage.getStorageSync<Storage>(LOCAL_STORAGE_KEY);
  if (!!storageNow && storageNow?.version !== packageJson.version) storageNow.handlerOptions = {}; // 更新版本时，清除本地缓存
  store.storage = {...store.storage, ...storageNow ?? {}, version: packageJson.version};
});
</script>

<template>
  <n-message-provider>
    <main>
      <ArticleCopyTool/>
    </main>

    <CopyrightFooter :project-url="projectUrl" :version="packageJson.version"
                     repo-button-text="查看代码"
                     bilibili-url="https://www.bilibili.com/video/BV1T24y1X78w/"/>
  </n-message-provider>
</template>

<style>
main {
  margin: 20px 10vw;
  min-height: calc(90vh - 100px);
}
</style>
