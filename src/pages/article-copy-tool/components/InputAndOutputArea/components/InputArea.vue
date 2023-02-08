<script setup lang="ts">
import {useStore} from "../../../../../store/useStore";
import GrammarlyEditor from "./components/GrammarlyEditor.vue";
import {watch} from "vue";
import InputFuncButtons from "./InputFuncButtons.vue";

const store = useStore();

watch(() => store.copy.inputText, () => {
  if (store.storage.copy.autoOutput) store.transformText();
});
</script>

<template>
  <div class="input-area">
    <GrammarlyEditor v-model:value="store.copy.inputText" placeholder="在此输入文本" focus handle-selection/>
    <InputFuncButtons/>
  </div>
</template>

<style lang="scss">
.input-area {
  flex: 1;

  .n-input__placeholder {
    text-align: center !important;
    font-size: max(16px, min(5vw, 64px)) !important;
  }
}
</style>
