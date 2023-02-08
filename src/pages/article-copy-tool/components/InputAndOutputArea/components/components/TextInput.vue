<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import {useStore} from "../../../../../../store/useStore";

const store = useStore();

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

function focusAfterComeBack() {
  setTimeout(focus, 100);
}

function getRangeString(_?: Event) {
  let selection = document.getSelection()?.toString() ?? "";
  if (selection && store.copy.selection.couples.map(c => c.from).indexOf(selection) === -1) {
    store.copy.selection.temp = {active: true, from: selection, to: ""};
  }
}

onMounted(() => {
  if (props.focus) focus();
  if (props.focus) window.addEventListener("focus", focusAfterComeBack);
  if (props.handleSelection) innerInputArea?.value?.$el?.addEventListener("select", getRangeString);
});

onBeforeUnmount(() => {
  if (props.focus) window.removeEventListener("focus", focusAfterComeBack);
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
