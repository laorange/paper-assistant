<script setup lang="ts">
import {GrammarlyEditorPlugin} from "@grammarly/editor-sdk-vue";
import {computed} from "vue";
import TextInput from "./TextInput.vue";

const props = defineProps<{ value: string, placeholder: string, focus?: boolean, handleSelection?: boolean }>();
const emits = defineEmits(["update:value"]);

const valueLocal = computed<string>({
  get: () => props.value,
  set: (newValue) => emits("update:value", newValue),
});
</script>

<template>
  <GrammarlyEditorPlugin clientId="client_FhwfFMz1zFmBVSJvtqjf8f">
    <TextInput v-model:value="valueLocal" :placeholder="placeholder" :focus="!!focus" :handle-selection="handleSelection"/>
  </GrammarlyEditorPlugin>
</template>

<style scoped>

</style>
