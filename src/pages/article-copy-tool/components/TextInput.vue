<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, ref} from "vue";

const props = defineProps<{ value: string, placeholder: string, focus?: boolean, handleSelection?: boolean }>();
const emits = defineEmits(["update:value"]);

const valueLocal = computed<string>({
  get: () => props.value,
  set: (newValue) => emits("update:value", newValue),
});

const innerInputArea = ref();

function focus() {
  if (props.focus) innerInputArea?.value?.focus();
}

function getRangeString(_?: Event) {
  let selection = document.getSelection()?.toString() ?? "";
  console.log(selection); // TODO 处理选中的文本
}

onMounted(() => {
  if (props.focus) focus();
  if (props.handleSelection) innerInputArea?.value?.$el?.addEventListener("select", getRangeString);
});

onBeforeUnmount(() => {
  if (props.handleSelection) innerInputArea?.value?.$el?.removeEventListener("select", getRangeString);
});

defineExpose({focus});
</script>

<template>
  <n-input ref="innerInputArea"
           type="textarea"
           :show-count="true"
           :placeholder="placeholder"
           size="large"
           :autosize="{minRows: 5}"
           v-model:value.lazy="valueLocal"/>
</template>

<style scoped>

</style>
