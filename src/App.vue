<script setup lang="ts">
import CopyrightFooter from "./pages/components/CopyrightFooter.vue";
import packageJson from "../package.json";
import Initiator from "./pages/components/Initiator.vue";
import ArticleCopyTool from "./pages/article-copy-tool/ArticleCopyTool.vue";
import {darkTheme} from "naive-ui";
import {computed} from "vue";
import {useStore} from "./store/useStore";

const projectUrl = `https://${location.href.indexOf("gitee") > -1 ? "gitee" : "github"}.com/laorange/paper-assistant`;
const bilibiliUrl = "https://www.bilibili.com/video/BV1ZG4y1N7oM/";

const store = useStore();

const theme = computed(() => store.storage.darkMode ? darkTheme : null);
</script>

<template>
  <n-config-provider :theme="theme">
    <n-message-provider>
      <n-notification-provider placement="top-left" :max="3">
        <main>
          <ArticleCopyTool/>
        </main>

        <CopyrightFooter :project-url="projectUrl" :version="packageJson.version"
                         repo-button-text="查看代码"
                         :bilibili-url="bilibiliUrl">
          <div>若您遇到问题或有好的建议😊欢迎在<a target="_blank" :href="bilibiliUrl">B站评论区</a>或<a
              target="_blank" href="https://github.com/laorange/paper-assistant/issues">GitHub</a>留言
          </div>
        </CopyrightFooter>

        <Initiator/>
      </n-notification-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style lang="scss">
main {
  margin: 20px 10vw;
  min-height: calc(90vh - 130px);
}

.introjs-tooltip {
  width: max(50vw, min(500px, 80vw)) !important;

  .introjs-button {
    cursor: pointer !important;
  }
}

body.dark {
  background-color: #222;
  color: #eee;

  .introjs-tooltip {
    color: #eee;
    background-color: #444
  }

  a:link, a:visited, a:active {
    color: #eee;
  }

  a:hover {
    color: #63e2b7;
  }
}
</style>
