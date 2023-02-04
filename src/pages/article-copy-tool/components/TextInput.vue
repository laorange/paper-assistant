<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{ value: string, placeholder: string }>();
const emits = defineEmits(["update:value"]);

const valueLocal = computed<string>({
  get: () => props.value,
  set: (newValue) => emits("update:value", newValue),
});
</script>

<template>
  <n-input ref="inputArea"
           type="textarea"
           :show-count="true"
           :placeholder="placeholder"
           size="large"
           :autosize="{minRows: 5}"
           v-model:value.lazy="valueLocal"/>
</template>

<style scoped>

</style>
