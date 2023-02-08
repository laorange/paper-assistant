<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{ label: string, status: boolean }>();
const emits = defineEmits(["update:status"]);

const statusLocal = computed<boolean>({
  get: () => props.status,
  set: (newValue) => emits("update:status", newValue),
});

const statusString = computed(() => statusLocal.value ? `开` : `关`);
</script>

<template>
  <n-button @click="statusLocal = !statusLocal" tertiary :type="statusLocal ? `primary` : `default`">
    {{ label }}：{{ statusString }}
  </n-button>
</template>

<style scoped>

</style>
