<script setup lang="ts">
import {computed} from "vue";

const props = withDefaults(defineProps<{
  label: string, status: boolean, trueLabel?: string, falseLabel?: string, disabled?: boolean,
}>(), {trueLabel: "开", falseLabel: "关"});
const emits = defineEmits(["update:status"]);

const statusLocal = computed<boolean>({
  get: () => props.status,
  set: (newValue) => emits("update:status", newValue),
});

const statusString = computed(() => statusLocal.value ? props.trueLabel : props.falseLabel);
</script>

<template>
  <n-button @click="statusLocal = !statusLocal"
            tertiary
            :disabled="!!disabled"
            :type="statusLocal ? `primary` : `default`">
    {{ label }}：{{ statusString }}
  </n-button>
</template>

<style scoped>

</style>
