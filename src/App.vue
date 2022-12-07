<script setup lang="ts">
import ArticleCopyTool from "./router/article-copy-tool/ArticleCopyTool.vue";
import CopyrightFooter from "./components/CopyrightFooter.vue";
import packageJson from "../package.json";

const projectUrl = `https://${location.href.indexOf("gitee") > -1 ? "gitee" : "github"}.com/laorange/paper-assistant`;
</script>

<template>
  <n-message-provider>
    <main>
      <ArticleCopyTool/>
    </main>

    <CopyrightFooter :project-url="projectUrl" :version="packageJson.version"/>
  </n-message-provider>
</template>

<style>
main {
  margin: 20px 10vw;
  min-height: calc(90vh - 100px);
}
</style>
