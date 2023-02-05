<script setup lang="ts">
import CopyrightFooter from "./pages/components/CopyrightFooter.vue";
import packageJson from "../package.json";
import Initiator from "./pages/components/Initiator.vue";

const projectUrl = `https://${location.href.indexOf("gitee") > -1 ? "gitee" : "github"}.com/laorange/paper-assistant`;
const bilibiliUrl = "https://www.bilibili.com/video/BV1T24y1X78w/";
</script>

<template>
  <n-message-provider>
    <n-notification-provider placement="top-left">
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

      <Initiator/>
    </n-notification-provider>
  </n-message-provider>
</template>

<style>
main {
  margin: 20px 10vw;
  min-height: calc(90vh - 130px);
}
</style>
