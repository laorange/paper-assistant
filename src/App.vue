<script setup lang="ts">
import CopyrightFooter from "./pages/components/CopyrightFooter.vue";
import packageJson from "../package.json";
import {onBeforeMount, watch} from "vue";
import {useStorage} from "vue3-storage";
import {useStore, Storage} from "./store/useStore";

const LOCAL_STORAGE_KEY = "PA";

const projectUrl = `https://${location.href.indexOf("gitee") > -1 ? "gitee" : "github"}.com/laorange/paper-assistant`;

const store = useStore();
const storage = useStorage();
const bilibiliUrl = "https://www.bilibili.com/video/BV1T24y1X78w/";

watch(() => store.storage, (newStorage) => {
  storage.setStorageSync(LOCAL_STORAGE_KEY, newStorage);
}, {deep: true});

onBeforeMount(() => {
  let storageNow = storage.getStorageSync<Storage>(LOCAL_STORAGE_KEY);
  if (!!storageNow && storageNow?.version !== packageJson.version) {
    // 1. 本地缓存不为空  2.更新版本时 => 1.清除本地缓存 2.弹出更新日志
    console.log(`版本更新：${storageNow?.version} → ${packageJson.version}`);
    storageNow = store.storage;
    store.showUpdateLog = true;
  }
  store.storage = {...store.storage, ...storageNow, version: packageJson.version};
});
</script>

<template>
  <n-message-provider>
    <main>
      <router-view/>
    </main>

    <CopyrightFooter :project-url="projectUrl" :version="packageJson.version"
                     repo-button-text="查看代码"
                     :bilibili-url="bilibiliUrl">
      <div>若您遇到问题或有好的建议😊欢迎在<a target="_blank" :href="bilibiliUrl">B站评论区</a>或<a
          target="_blank" href="https://github.com/laorange/paper-assistant/issues">GitHub</a>留言
      </div>
    </CopyrightFooter>
  </n-message-provider>
</template>

<style>
main {
  margin: 20px 10vw;
  min-height: calc(90vh - 130px);
}
</style>
