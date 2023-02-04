<script setup lang="ts">
import {useStore} from "../../../store/useStore";
import GrammarlyEditor from "../../../components/GrammarlyEditor.vue";

const store = useStore();
</script>

<template>
    <div class="input-area">
      <GrammarlyEditor v-model:value="store.copy.inputText" placeholder="输入文本"/>
    </div>
</template>

<style scoped>

</style>
