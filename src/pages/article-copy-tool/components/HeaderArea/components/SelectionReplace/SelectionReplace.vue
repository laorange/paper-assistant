<script setup lang="ts">
import {useStore} from "../../../../../../store/useStore";
import SelectionReplaceEditor from "./components/SelectionReplaceEditor.vue";
import {watch} from "vue";
import {HelpCircle} from "@vicons/ionicons5";
import useIntroducer from "../../../../../../assets/ts/article-copy-tool/useIntroducer";

const store = useStore();
const {introduceSelectionReplace} = useIntroducer();

function addSelection() {
  store.copy.selection.couples.push({...store.copy.selection.temp, active: true, addTime: (new Date()).getTime()});
  store.copy.selection.temp.active = false;
}

function deleteSelection(index: number) {
  store.copy.selection.couples.splice(index, 1);
}

watch(() => store.copy.selection.couples, store.transformText, {deep: true});
</script>

<template>
  <n-drawer v-model:show="store.copy.selection.temp.active" height="125px" placement="top" :show-mask="false">
    <n-drawer-content title="文本替换" :closable="true">
      <template #header>
        <n-space align="center">
          <div>文本替换</div>
          <n-button type="info" size="small" round @click="introduceSelectionReplace()">
            <n-icon size="18">
              <HelpCircle/>
            </n-icon>
            &nbsp;使用说明
          </n-button>
        </n-space>
      </template>

      <SelectionReplaceEditor v-model:to="store.copy.selection.temp.to" v-model:from="store.copy.selection.temp.from">
        <n-button class="add-selection-replace-button" type="success" @click="addSelection()">启用</n-button>
      </SelectionReplaceEditor>
    </n-drawer-content>
  </n-drawer>

  <div class="selections-display">
    <n-space vertical>
      <template v-for="(couple, index) in store.copy.selection.couples" :key="`${couple.addTime ?? couple.from + couple.to}`">
        <SelectionReplaceEditor :disabled="!couple.active"
                                v-model:to="couple.to" v-model:from="couple.from">
          <n-button @click="couple.active = !couple.active" dashed :type="couple.active ? `warning` : `success` ">{{ couple.active ? `禁用` : `启用` }}</n-button>
          <n-button type="error" @click="deleteSelection(index)" dashed>删除</n-button>
        </SelectionReplaceEditor>
      </template>
    </n-space>
  </div>

</template>

<style scoped>

</style>
