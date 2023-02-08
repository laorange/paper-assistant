<script setup lang="ts">
import InputArea from "./components/InputArea.vue";
import OutputArea from "./components/OutputArea.vue";
import {useStore} from "../../../../store/useStore";
import {computed} from "vue";

const store = useStore();
</script>

<template>
  <n-space :vertical="!store.storage.copy.horizontalLayout" :wrap-item="false">
    <InputArea style="flex: 1"/>
    <OutputArea style="flex: 1" v-if="store.copy.outputText.length"/>
  </n-space>
</template>

<style scoped>

</style>
