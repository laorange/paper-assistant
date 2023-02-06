<script setup lang="ts">
import {textHandlers, TextHandlerWithName} from "../../../assets/ts/article-copy-tool/handlers";
import {ref, watch} from "vue";
import {useStore} from "../../../store/useStore";

const store = useStore();
const handlerAmount = store.textHandlerArray.length;

const showConfigDrawer = ref(false);
const refTextHandlerArray = ref<TextHandlerWithName[]>(store.textHandlerArray);

watch(() => store.copy.inputText, store.transformText);
watch(() => refTextHandlerArray.value, (ths) => {
  let handlerOptions: typeof store.storage.copy.handlerOptions = {};
  ths.map((th, index) => handlerOptions[th.handlerName] = {order: index, activate: th.activate});
  store.storage.copy.handlerOptions = handlerOptions; // 将顺序和激活状态写入localstorage
  store.transformText();
}, {deep: true, immediate: true});

function setTextHandlerArrayToDefault() {
  refTextHandlerArray.value = Object.entries(textHandlers).map(([handlerName, handler]) => {
    return {...handler, handlerName};
  });
}

function movePositionOfHandler(type: "up" | "down", index: number) {
  let temp: TextHandlerWithName = refTextHandlerArray.value[index];
  let indexTarget = type === "up" ? index - 1 : index + 1;
  refTextHandlerArray.value[index] = refTextHandlerArray.value[indexTarget];
  refTextHandlerArray.value[indexTarget] = temp;
}
</script>

<template>
  <div class="text-handler-config">
    <n-badge :value="`${refTextHandlerArray.filter(h=>h.activate).length}/${refTextHandlerArray.length}`" type="success">
      <n-button id="config-button" @click="showConfigDrawer = true" type="success" :dashed="true">功能设置</n-button>
    </n-badge>
  </div>

  <n-drawer v-model:show="showConfigDrawer" :height="`${Object.keys(textHandlers).length * 40 + 100}px`" placement="bottom">
    <n-drawer-content title="功能设置" :closable="true">
      <n-space justify="center" align="center" :vertical="true">
        <n-space style="height: 100%" :vertical="true" justify="center" align="end" :size="2">
          <n-form-item v-for="(textHandler, index) of refTextHandlerArray" :key="`textHandler-${textHandler.description}`"
                       :show-feedback="false" label-placement="left">
            <template #label>
              <div style="max-width: calc(100vw - 190px); flex-wrap: wrap">{{ textHandler.description }}</div>
            </template>

            <n-space :size="10">
              <n-switch v-model:value="textHandler.activate"/>
              <n-button round type="success" dashed size="small" @click="movePositionOfHandler(`up`, index)" :disabled="index===0">↑</n-button>
              <n-button round type="success" dashed size="small" @click="movePositionOfHandler(`down`, index)" :disabled="index===handlerAmount-1">↓</n-button>
            </n-space>
          </n-form-item>
        </n-space>
        <n-button type="warning" size="small" @click="setTextHandlerArrayToDefault()">恢复为默认值</n-button>
      </n-space>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>
