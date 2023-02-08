<script setup lang="ts">
import {HelpCircle} from "@vicons/ionicons5";
import useIntroducer from "../../../../../assets/ts/article-copy-tool/useIntroducer";

const {introduce} = useIntroducer();
</script>

<template>
  <n-button id="intro-button" @click="introduce()" type="info" :dashed="true">
    <template #icon>
      <n-icon>
        <HelpCircle/>
      </n-icon>
    </template>
    使用说明
  </n-button>
</template>

<style scoped>

</style>
