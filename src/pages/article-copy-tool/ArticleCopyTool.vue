<script setup lang="ts">
import {computed} from "vue";
import {useStore} from "../../store/useStore";
import UpdateLogDisplayUnit from "../components/UpdatedLogDisplayUnit.vue";
import InputArea from "./components/InputArea.vue";
import InputFuncButtons from "./components/InputFuncButtons.vue";
import OutputArea from "./components/OutputArea.vue";
import OutputFuncButtons from "./components/OutputFuncButtons.vue";
import TextHandlerConfig from "./components/TextHandlerConfig.vue";
import useIntroducer from "../../assets/ts/article-copy-tool/useIntroducer";

const store = useStore();
const {introduce} = useIntroducer();

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
  <div class="article-copy-tool">
    <header>
      <h1>文本复制工具</h1>
      <n-space>
        <n-button id="intro-button" @click="introduce()" type="info" :dashed="true">使用说明</n-button>
        <TextHandlerConfig/>
        <UpdateLogDisplayUnit v-model:show="store.showUpdateLog"/>
      </n-space>
    </header>

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
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

header {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
</style>
