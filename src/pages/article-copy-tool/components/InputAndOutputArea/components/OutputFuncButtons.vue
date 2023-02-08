<script setup lang="ts">
import {useStore} from "../../../../../store/useStore";
import {useMessage} from "naive-ui";
import useClipboard from "vue-clipboard3";

const message = useMessage();
const {toClipboard} = useClipboard();
const store = useStore();

async function copyOutputText(info: string = "复制成功") {
  await toClipboard(store.copy.outputText);
  message.success(info);
}

async function cutOutputText() {
  await copyOutputText("剪切成功");
  store.copy.outputText = "";
}

function clearOutputText() {
  store.copy.outputText = "";
}
</script>

<template>
  <div class="output-func-buttons">
    <n-space :size="10">
      <n-button size="large" @click="copyOutputText()" type="info" v-show="store.copy.outputText">复制</n-button>
      <n-button size="large" @click="cutOutputText()" type="warning" v-show="store.copy.outputText">剪切</n-button>
      <n-button size="large" @click="clearOutputText()" color="#808080" v-show="store.copy.outputText">清空</n-button>
    </n-space>
  </div>
</template>

<style scoped>
.output-func-buttons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
