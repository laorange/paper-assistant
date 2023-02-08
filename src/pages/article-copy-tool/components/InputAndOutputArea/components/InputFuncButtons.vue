<script setup lang="ts">
import useClipboard from "vue-clipboard3";
import {useMessage} from "naive-ui";
import {useStore} from "../../../../../store/useStore";
import {computed, nextTick} from "vue";

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

// 大前提条件：输入框有值；"实时输出: 关" 或 "输出为空"时显示输出按钮
const showOutputButton = computed(() => store.copy.inputText && (!store.storage.copy.autoOutput || !store.copy.outputText));
</script>

<template>
  <div class="input-func-buttons">
    <n-space :size="10">
      <n-button size="large" v-show="store.copy.inputText" @click="copyInputText()" type="info">复制</n-button>
      <n-button size="large" v-show="store.copy.inputText" @click="cutInputText()" type="warning">剪切</n-button>
      <n-button size="large" v-show="store.copy.inputText" @click="clearInputText()" color="#808080">清空</n-button>
      <n-button size="large" v-show="showOutputButton" @click="store.transformText()" type="success">输出</n-button>
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
