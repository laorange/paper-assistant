<script setup lang="ts">
import {useStore} from "../../../../../../store/useStore";
import ConfigSwitchButton from "./components/ConfigSwitchButton.vue";

const store = useStore();
</script>

<template>
  <n-space justify="center" align="center" wrap="wrap">
    <ConfigSwitchButton label="自动清空输入" v-model:status="store.storage.copy.clearInputWhenLeave"/>
    <ConfigSwitchButton label="自动复制输入" v-model:status="store.storage.copy.copyOutputWhenLeave"/>
    <ConfigSwitchButton label="实时输出" v-model:status="store.storage.copy.autoOutput"/>
  </n-space>
</template>

<style scoped>

</style>
