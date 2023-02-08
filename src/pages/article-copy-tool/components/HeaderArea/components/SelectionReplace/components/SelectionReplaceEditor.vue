<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{ from: string, to: string, disabled?: boolean }>();
const emits = defineEmits(["update:from", "update:to"]);

const selectionReplaceCouple = computed<string[]>({
  get: () => [props.from, props.to],
  set: (newValue) => {
    emits("update:from", newValue[0]);
    emits("update:to", newValue[1]);
  },
});
</script>

<template>
  <n-space align="center" justify="center" style="height: 100%">
    <n-input pair separator="替换为"
             :placeholder="['待替换的文本', '新的文本(默认为空)']" :disabled="disabled"
             v-model:value="selectionReplaceCouple" passively-activated/>
    <slot/>
  </n-space>
</template>

<style scoped>

</style>
