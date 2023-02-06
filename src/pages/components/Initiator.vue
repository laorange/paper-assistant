<script setup lang="ts">
import {h, onBeforeMount, watch} from "vue";
import {Storage, useStore} from "../../store/useStore";
import {useStorage} from "vue3-storage";
import packageJson from "../../../package.json";
import {useNotification, NButton} from "naive-ui";
import useIntroducer from "../../assets/ts/article-copy-tool/useIntroducer";
import axios from "axios";
import MarkdownParser from "./MarkdownParser.vue";

const store = useStore();
const storage = useStorage();
const notification = useNotification();
const {introduce} = useIntroducer();

const LOCAL_STORAGE_KEY = "PA";

class ProjectInitiator {
  storage: Storage;
  previousStorage: Storage;
  isNewComer: boolean = false;

  constructor() {
    this.watchStorage();
    this.watchDarkMode();

    this.storage = storage.getStorageSync<Storage>(LOCAL_STORAGE_KEY) ?? this.useNewComerHook();
    this.previousStorage = JSON.parse(JSON.stringify(this.storage));

    if (!this.isNewComer && this.storage?.version !== packageJson.version) {
      // 已有本地缓存（不是第一次访问），且更新版本时
      this.useUpdateHook();
    }

    this.updateStorageInPinia();
    if (import.meta.env.MODE !== "development") this.checkReleasedVersion();  // 在非调试模式下，查询是否为最新版本
  }

  watchStorage() {
    watch(() => store.storage, (newStorage) => {
      storage.setStorageSync(LOCAL_STORAGE_KEY, newStorage);
    }, {deep: true});
  }

  watchDarkMode() {
    watch(() => store.storage.darkMode, (darkMode) => {
      let classList = document.body.classList;
      console.log("store.storage.darkMode", store.storage.darkMode);
      if (darkMode) classList.add("dark");
      else classList.remove("dark");
    }, {immediate: true});
  }

  useNewComerHook(): Storage {
    this.isNewComer = true;
    let n = notification.info({
      title: "🎉欢迎",
      description: "😊本网站开源免费，希望能对您能有所帮助",
      content: `若您是第一次访问本网站\n推荐您先查看"使用说明":`,
      action: () => h(NButton, {
            type: "info", onClick: () => {
              introduce();
              n.destroy();
            },
          }, {default: () => "查看使用说明"},
      ),
    });
    return store.storage;
  }

  useUpdateHook() {
    // 1.清除本地缓存 2.弹出更新日志
    console.log(`版本更新：${this.storage?.version} → ${packageJson.version}`);
    this.storage = store.storage;

    let n = notification.info({
      title: "版本更新",
      content: `可点击"更新日志"来查看更新内容`,
      description: `${this.previousStorage?.version} → ${packageJson.version}`,
      action: () => h(NButton, {
        type: "info", onClick: () => {
          store.showUpdateLog = true;
          n.destroy();
        },
      }, {default: () => "查看更新日志"}),
    });
  }

  updateStorageInPinia() {
    store.storage = {...store.storage, ...this.storage, version: packageJson.version};
  }

  async checkReleasedVersion() {
    const RELEASED_API_URL = "https://gitee.com/api/v5/repos/laorange/paper-assistant/releases/latest";
    try {
      let apiData = (await axios.get(RELEASED_API_URL)).data;
      let latestVersion = (apiData?.tag_name?.replace("v", "") ?? "") as string;
      if (latestVersion !== packageJson.version) {
        notification.warning({
          title: "🎉新版本已发布",
          description: `当前版本：v${packageJson.version}，最新版本：v${latestVersion}`,
          content: () => h(MarkdownParser, {markdown: apiData?.body ?? ""}),
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
}

onBeforeMount(() => {
  new ProjectInitiator();
});
</script>

<template/>

<style/>
