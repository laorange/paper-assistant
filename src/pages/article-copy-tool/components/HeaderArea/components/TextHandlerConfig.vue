<script setup lang="ts">
import {textHandlers, TextHandlerWithName} from "../../../../../assets/ts/article-copy-tool/handlers";
import {ref, watch} from "vue";
import {useStore} from "../../../../../store/useStore";
import Draggable from "vuedraggable";
import {SettingsSharp, HelpCircle} from "@vicons/ionicons5";
import useIntroducer from "../../../../../assets/ts/article-copy-tool/useIntroducer";

const store = useStore();
const {introduceTextHandler} = useIntroducer();

const showConfigDrawer = ref(false);
const refTextHandlerArray = ref<TextHandlerWithName[]>(store.textHandlerArray);

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

function turnOffAllTextHandler() {
  refTextHandlerArray.value.forEach(th => th.activate = false);
}
</script>

<template>
  <div class="text-handler-config">
    <n-badge :value="`${refTextHandlerArray.filter(h=>h.activate).length}/${refTextHandlerArray.length}`" type="success">
      <n-button id="config-button" @click="showConfigDrawer = true" type="success" :dashed="true">
        <template #icon>
          <n-icon>
            <SettingsSharp/>
          </n-icon>
        </template>
        功能设置
      </n-button>
    </n-badge>
  </div>

  <n-drawer v-model:show="showConfigDrawer" :height="`min(${Object.keys(textHandlers).length * 50 + 125}px, 100vh)`" placement="bottom">
    <n-drawer-content :closable="true">
      <template #header>
        <n-space align="center">
          <div>功能设置</div>
          <n-button type="info" size="small" round @click="introduceTextHandler">
            <n-icon size="18">
              <HelpCircle/>
            </n-icon>
            &nbsp;使用说明
          </n-button>
        </n-space>
      </template>

      <div class="text-handler-drawer-content">
        <n-space justify="center" align="center" :vertical="true">
          <n-space style="height: 100%" :vertical="true" justify="center" align="end" :size="2">
            <Draggable v-model="refTextHandlerArray" item-key="handlerName">
              <template #item="{element}">
                <div class="text-handler-card" @click="element.activate = !element.activate">
                  <n-space :size="10" justify="start">
                    <n-switch :value="element.activate"/>
                    <div> {{ element.description }}</div>
                  </n-space>
                </div>
              </template>
            </Draggable>
          </n-space>

          <n-space>
            <n-button class="to-default-button" type="info" size="small" @click="setTextHandlerArrayToDefault()">恢复为默认值</n-button>
            <n-button class="turn-off-button" type="warning" size="small" @click="turnOffAllTextHandler()">全部关闭</n-button>
            <n-button class="finish-config-button" type="success" size="small" @click="showConfigDrawer=false">完成设置</n-button>
          </n-space>
        </n-space>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>
.text-handler-card {
  border: #efefef solid 1px;
  margin: 5px;
  padding: 10px 25px;
  cursor: move;
}
</style>
