<script setup lang="ts">
import {useStore} from "../../../store/useStore";

const store = useStore();
</script>

<template>
  <div class="output-area">
    <n-input type="textarea" placeholder="输出文本" :show-count="true" size="large" :autosize="true" v-model:value="store.copy.outputText"></n-input>
  </div>
</template>

<style scoped>

</style>
