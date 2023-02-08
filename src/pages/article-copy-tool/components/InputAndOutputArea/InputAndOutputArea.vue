<script setup lang="ts">
import InputArea from "./components/InputArea.vue";
import InputFuncButtons from "./components/InputFuncButtons.vue";
import OutputArea from "./components/OutputArea.vue";
import OutputFuncButtons from "./components/OutputFuncButtons.vue";
import {useStore} from "../../../../store/useStore";
import {computed} from "vue";

const store = useStore();

const cols = computed<string>(() => {
  if (store.copy.inputText.length > 500) {
    //  输入文本过长，转为在一行显示
    return `1`;
  } else if (store.copy.outputText.length === 0) {
    return `1`;
  } else {
    return `1 850:2`;
  }
});
</script>

<template>
  <n-grid :cols="cols" x-gap="10" y-gap="20">
    <n-gi>
      <InputArea/>
      <InputFuncButtons/>
    </n-gi>

    <n-gi v-if="store.copy.outputText.length">
      <OutputArea/>
      <OutputFuncButtons/>
    </n-gi>
  </n-grid>
</template>

<style scoped>

</style>
