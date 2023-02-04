<script setup lang="ts">
import useClipboard from "vue-clipboard3";
import {useMessage} from "naive-ui";
import {useStore} from "../../../store/useStore";
import {nextTick} from "vue";

const {toClipboard} = useClipboard();
const message = useMessage();
const store = useStore();

async function copyInputText(info: string = "复制成功") {
  await toClipboard(store.copy.inputText);
  message.success(info);
}

async function cutInputText() {
  let outputTextTemp = store.copy.outputText;
  await copyInputText("剪切成功");
  store.copy.inputText = "";
  await nextTick(() => store.copy.outputText = outputTextTemp);
}

function clearInputText() {
  let outputTextTemp = store.copy.outputText;
  store.copy.inputText = "";
  nextTick(() => store.copy.outputText = outputTextTemp);
}
</script>

<template>
  <div class="input-func-buttons">
    <n-space :size="30">
      <n-button @click="copyInputText()" type="info" :disabled="!store.copy.inputText">复制</n-button>
      <n-button @click="cutInputText()" type="warning" :disabled="!store.copy.inputText">剪切</n-button>
      <n-button @click="clearInputText()" color="#3f3f3f" :disabled="!store.copy.inputText">清空</n-button>
    </n-space>
  </div>
</template>

<style scoped>
.input-func-buttons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
