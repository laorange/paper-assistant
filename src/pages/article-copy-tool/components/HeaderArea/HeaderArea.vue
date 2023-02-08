<script setup lang="ts">
import UpdateLogDisplayUnit from "./components/UpdatedLogDisplayUnit.vue";
import TextHandlerConfig from "./components/TextHandlerConfig.vue";
import ThemeConfig from "./components/ThemeConfig.vue";
import HelpButton from "./components/HelpButton.vue";
import SelectionReplace from "./components/SelectionReplace/SelectionReplace.vue";
import AdditionalConfig from "./components/AdditionalConfig/AdditionalConfig.vue";
import {useStore} from "../../../../store/useStore";

defineProps<{ title: string }>();

const store = useStore();
</script>

<template>
  <header>
    <h1>{{ title }}</h1>
    <n-space vertical>
      <n-space wrap="wrap" justify="center">
        <n-space>
          <HelpButton/>
          <TextHandlerConfig/>
        </n-space>
        <n-space>
          <ThemeConfig/>
          <UpdateLogDisplayUnit v-model:show="store.showUpdateLog"/>
        </n-space>
      </n-space>
      <AdditionalConfig/>
      <SelectionReplace/>
    </n-space>
  </header>
</template>

<style scoped lang="scss">
header {
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;

  h1 {
    text-align: center;
  }
}
</style>
