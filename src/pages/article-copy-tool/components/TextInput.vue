<script setup lang="ts">
import {computed, onMounted, ref} from "vue";

const props = defineProps<{ value: string, placeholder: string, focus?: boolean }>();
const emits = defineEmits(["update:value"]);

const valueLocal = computed<string>({
  get: () => props.value,
  set: (newValue) => emits("update:value", newValue),
});

const innerInputArea = ref();

function focus() {
  if (props.focus) innerInputArea?.value?.focus();
}

onMounted(() => {
  if (props.focus) focus();
});

defineExpose({focus})
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
