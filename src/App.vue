<script setup lang="ts">
import ArticleCopyTool from "./components/ArticleCopyTool.vue";
import CopyrightFooter from "./components/CopyrightFooter.vue";
import packageJson from "../package.json";
</script>

<template>
  <n-message-provider>
    <main>
      <ArticleCopyTool/>
    </main>

    <CopyrightFooter project-url="https://github.com/laorange/paper-assistant" :version="packageJson.version"/>
  </n-message-provider>
</template>

<style>
main {
  margin: 20px 10vw;
  min-height: calc(90vh - 100px);
}
</style>
