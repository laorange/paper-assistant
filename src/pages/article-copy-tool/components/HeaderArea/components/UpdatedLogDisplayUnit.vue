<script setup lang="ts">
import {computed} from "vue";
import UpdatedLogs from "../../../../../assets/UpdatedLogs.md";
import {AnalyticsOutline} from "@vicons/ionicons5";

const props = defineProps<{ show: boolean }>();
const emits = defineEmits(["update:show"]);

const showLocal = computed<boolean>({
  get: () => props.show,
  set: (newValue) => emits("update:show", newValue),
});
</script>

<template>
  <n-button class="show-update-log-button" @click="showLocal=true" type="info" :dashed="true">
    <template #icon>
      <n-icon>
        <AnalyticsOutline/>
      </n-icon>
    </template>
    更新日志
  </n-button>

  <n-drawer v-model:show="showLocal" height="80%" placement="bottom">
    <n-drawer-content title="更新日志" :closable="true">
      <n-space justify="center" align="center" :vertical="true">
        <n-space style="height: 100%" :vertical="true" justify="center" align="end" :size="2">
          <UpdatedLogs/>
        </n-space>
      </n-space>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>
