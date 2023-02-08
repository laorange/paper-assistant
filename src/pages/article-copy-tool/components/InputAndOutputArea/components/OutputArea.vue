<script setup lang="ts">
import {useStore} from "../../../../../store/useStore";
import TextInput from "./components/TextInput.vue";
import OutputFuncButtons from "./OutputFuncButtons.vue";

const store = useStore();
</script>

<template>
  <div class="output-area">
    <TextInput placeholder="输出文本" v-model:value="store.copy.outputText" handle-selection/>
    <OutputFuncButtons/>
  </div>
</template>

<style scoped>

</style>
