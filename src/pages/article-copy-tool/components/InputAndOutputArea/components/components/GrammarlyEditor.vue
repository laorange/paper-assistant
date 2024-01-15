<script setup lang="ts">
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
    <TextInput v-model:value="valueLocal" :placeholder="placeholder" :focus="!!focus" :handle-selection="handleSelection"/>
</template>

<style scoped>

</style>
