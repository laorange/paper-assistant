<script setup lang="ts">
import {GrammarlyEditorPlugin} from "@grammarly/editor-sdk-vue";
import {computed} from "vue";

const props = defineProps<{ value: string, placeholder: string }>();
const emits = defineEmits(["update:value"]);

const valueLocal = computed<string>({
  get: () => props.value,
  set: (newValue) => emits("update:value", newValue),
});
</script>

<template>
  <GrammarlyEditorPlugin clientId="client_FhwfFMz1zFmBVSJvtqjf8f">
    <n-input ref="inputArea"
             type="textarea"
             :show-count="true"
             :placeholder="placeholder"
             size="large"
             :autosize="{minRows: 5}"
             v-model:value.lazy="valueLocal"/>
  </GrammarlyEditorPlugin>
</template>

<style scoped>

</style>
