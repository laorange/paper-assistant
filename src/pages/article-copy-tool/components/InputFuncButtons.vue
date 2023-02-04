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
    <n-space :size="10">
      <n-button size="large" v-show="store.copy.inputText" @click="copyInputText()" type="info">复制</n-button>
      <n-button size="large" v-show="store.copy.inputText" @click="cutInputText()" type="warning">剪切</n-button>
      <n-button size="large" v-show="store.copy.inputText" @click="clearInputText()" color="#3f3f3f">清空</n-button>
      <n-button size="large" v-show="store.copy.inputText && !store.copy.outputText" @click="store.transformText()" type="success">输出</n-button>
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
