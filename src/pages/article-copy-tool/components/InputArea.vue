<script setup lang="ts">
import {useStore} from "../../../store/useStore";
import GrammarlyEditor from "../../components/GrammarlyEditor.vue";

const store = useStore();
</script>

<template>
  <div class="input-area">
    <GrammarlyEditor v-model:value="store.copy.inputText" placeholder="在此输入文本" focus handle-selection/>
  </div>
</template>

<style lang="scss">
.input-area {
  .n-input__placeholder {
    text-align: center !important;
    font-size: min(10vw, 64px) !important;
  }
}
</style>
