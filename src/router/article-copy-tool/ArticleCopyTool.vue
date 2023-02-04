<script setup lang="ts">
import {computed} from "vue";
import {useStore} from "../../store/useStore";
import UpdateLogDisplayUnit from "../../components/UpdateLogDisplayUnit.vue";
import InputArea from "./components/InputArea.vue";
import InputFuncButtons from "./components/InputFuncButtons.vue";
import OutputArea from "./components/OutputArea.vue";
import OutputFuncButtons from "./components/OutputFuncButtons.vue";
import PreferenceConfig from "./components/PreferenceConfig.vue";
import useIntroducer from "../../assets/ts/article-copy-tool/useIntroducer";

const store = useStore();
const introduce = useIntroducer();

const tooManyInput = computed(() => store.copy.inputText.length > 500);
</script>

<template>
  <div class="article-copy-tool">
    <header>
      <h1>文本复制工具</h1>
      <n-space>
        <n-button id="intro-button" @click="introduce" type="info" :dashed="true">使用说明</n-button>
        <PreferenceConfig/>
        <UpdateLogDisplayUnit v-model:show="store.showUpdateLog"/>
      </n-space>
    </header>

    <n-grid :cols="tooManyInput?`1`:`1 800:2`" x-gap="10" y-gap="20">
      <n-gi>
        <InputArea/>
        <InputFuncButtons/>
      </n-gi>

      <n-gi>
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
