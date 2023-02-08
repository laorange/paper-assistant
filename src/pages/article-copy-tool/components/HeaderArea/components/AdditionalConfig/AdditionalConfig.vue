<script setup lang="ts">
import {useStore} from "../../../../../../store/useStore";
import ConfigSwitchButton from "./components/ConfigSwitchButton.vue";
import useClipboard from "vue-clipboard3";
import {onBeforeUnmount, onMounted} from "vue";
import {useMessage} from "naive-ui";

const store = useStore();
const {toClipboard} = useClipboard();
const message = useMessage();

function onLeavePage() {
  if (document.hidden) {
    if (store.storage.copy.copyOutputWhenLeave && store.copy.outputText) {
      toClipboard(store.copy.outputText).then(() => message.success("复制输出文本: 成功"));
    }
    if (store.storage.copy.clearInputWhenLeave) store.copy.inputText = "";
  }
}

onMounted(() => {
  document.addEventListener("visibilitychange", onLeavePage);
});

onBeforeUnmount(() => {
  document.removeEventListener("visibilitychange", onLeavePage);
});
</script>

<template>
  <n-space justify="center" align="center" wrap="wrap">
    <ConfigSwitchButton label="自动清空输入" v-model:status="store.storage.copy.clearInputWhenLeave"/>
    <ConfigSwitchButton label="自动复制输出" v-model:status="store.storage.copy.copyOutputWhenLeave"/>
    <ConfigSwitchButton label="实时输出" v-model:status="store.storage.copy.autoOutput"/>
  </n-space>
</template>

<style scoped>

</style>
