<script setup lang="ts">
import {useStore} from "../../../../../../store/useStore";
import ConfigSwitchButton from "./components/ConfigSwitchButton.vue";
import useClipboard from "vue-clipboard3";
import {onBeforeUnmount, onMounted} from "vue";
import {useMessage} from "naive-ui";

const store = useStore();
const {toClipboard} = useClipboard();
const message = useMessage();

const THRESHOLD_WIDTH = 600;
const hasNotEnoughWidth = document.body.clientWidth < THRESHOLD_WIDTH;

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

  if (hasNotEnoughWidth) {
    store.storage.copy.horizontalLayout = false;
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("visibilitychange", onLeavePage);
});
</script>

<template>
  <n-space justify="center" align="center" wrap="wrap">
    <n-space>
      <ConfigSwitchButton class="clear-input-when-leave-switch" label="自动清空输入" v-model:status="store.storage.copy.clearInputWhenLeave"/>
      <ConfigSwitchButton class="copy-output-when-leave-switch" label="自动复制输出" v-model:status="store.storage.copy.copyOutputWhenLeave"/>
    </n-space>
    <n-space>
      <ConfigSwitchButton class="auto-output-switch" label="实时输出" v-model:status="store.storage.copy.autoOutput"/>
      <ConfigSwitchButton class="horizontal-layout-switch" label="布局方式" v-model:status="store.storage.copy.horizontalLayout"
                          true-label="水平" false-label="竖直" :disabled="hasNotEnoughWidth"/>
    </n-space>
  </n-space>
</template>

<style scoped>

</style>
