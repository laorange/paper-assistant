<script setup lang="ts">
import {useStore} from "../../../store/useStore";
import GrammarlyEditor from "../../components/GrammarlyEditor.vue";

const store = useStore();
</script>

<template>
    <div class="input-area">
      <GrammarlyEditor v-model:value="store.copy.inputText" placeholder="点此输入文本"/>
    </div>
</template>

<style>
.n-input__placeholder {
  text-align: center !important;
  font-size: min(10vw, 64px) !important;
}
</style>
