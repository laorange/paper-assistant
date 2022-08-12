<script setup lang="ts">
import ArticleCopyTool from "./components/ArticleCopyTool.vue";
import CopyrightDiv from "./components/CopyrightDiv.vue";

</script>

<template>
  <n-message-provider>
    <main>
      <ArticleCopyTool/>
    </main>

    <CopyrightDiv project-url="https://github.com/laorange/paper-assistant"/>
  </n-message-provider>
</template>

<style>
main {
  margin: 20px 10vw;
  min-height: calc(90vh - 70px);
}
</style>
