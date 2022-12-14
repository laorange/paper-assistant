<script setup lang="ts">
import useClipboard from "vue-clipboard3";
import {computed, nextTick, ref, watch} from "vue";
import {useMessage} from "naive-ui";
import {TextHandler, textHandlers} from "../../assets/ts/article-copy-tool/handlers";
import GrammarlyEditor from "../../components/GrammarlyEditor.vue";
import {useStore} from "../../store/useStore";
// @ts-ignore
import introJs from "intro.js";
import UpdateLogDisplayUnit from "../../components/UpdateLogDisplayUnit.vue";

const message = useMessage();
const {toClipboard} = useClipboard();
const store = useStore();

const handlerAmount = Array.from(Object.keys(textHandlers)).length;

interface TextHandlerWithName extends TextHandler {
  handlerName: string;
}

function getTextHandlerArray(): TextHandlerWithName[] {
  return Object.entries(textHandlers).map(([handlerName, handler], index) => {
    return {
      handlerName: handlerName,
      handler: {...handler, activate: store.storage.handlerOptions[handlerName]?.activate ?? handler.activate},
      order: store.storage.handlerOptions[handlerName]?.order ?? handlerAmount + index,
    };
  }).sort((a, b) => a.order - b.order).map(data => {
    return {...data.handler, handlerName: data.handlerName};
  });
}

const refTextHandlerArray = ref<TextHandlerWithName[]>(getTextHandlerArray());
const inputText = ref<string>("");
const outputText = ref<string>("");

function transformText() {
  outputText.value = refTextHandlerArray.value
      .filter(textHandler => textHandler.activate)
      .reduce((text, textHandler) => textHandler.executor(text), inputText.value);
}

watch(() => inputText.value, transformText);
watch(() => refTextHandlerArray.value, (ths) => {
  transformText();
  let handlerOptions: typeof store.storage.handlerOptions = {};
  ths.map((th, index) => handlerOptions[th.handlerName] = {order: index, activate: th.activate});
  store.storage.handlerOptions = handlerOptions; // 将顺序和激活状态写入localstorage
}, {deep: true, immediate: true});

function setTextHandlerArrayToDefault() {
  refTextHandlerArray.value = Object.entries(textHandlers).map(([handlerName, handler]) => {
    return {...handler, handlerName};
  });
}

async function copyInputText(info: string = "复制成功") {
  await toClipboard(inputText.value);
  message.success(info);
}

async function cutInputText() {
  let outputTextTemp = outputText.value;
  await copyInputText("剪切成功");
  inputText.value = "";
  await nextTick(() => outputText.value = outputTextTemp);
}

function clearInputText() {
  let outputTextTemp = outputText.value;
  inputText.value = "";
  nextTick(() => outputText.value = outputTextTemp);
}

async function copyOutputText(info: string = "复制成功") {
  await toClipboard(outputText.value);
  message.success(info);
}

async function cutOutputText() {
  await copyOutputText("剪切成功");
  outputText.value = "";
}

const showConfigDrawer = ref(false);
const tooManyInput = computed(() => inputText.value.length > 500);

function introduce() {
  let steps: { element?: Element | null, title?: string, intro?: string, position?: string }[] = [
    {
      element: document.querySelector(".preference-button-area"),
      title: "偏好设置",
      intro: `按需启用功能。目前您可以选择:<p>${refTextHandlerArray.value.map((h, i) => `${i + 1}. ` + h.description).join("<br/>")}</p>`,
    },
    {
      element: document.querySelector(".show-update-log-button"),
      title: "更新日志",
      intro: "查看本网站的版本迭代过程",
    },
    {
      element: document.querySelector(".input-area"),
      title: "输入框",
      intro: `请在这里输入内容，程序将根据<strong>偏好设置</strong>进行文本处理。<hr/>此外，如果您:<br/>①输入的是英文<br/>②使用电脑访问<br/>将为您检测语法(基于Grammarly)`,
    },
    {
      element: document.querySelector(".output-area"),
      title: "输出框",
      intro: "将在这里输出处理结果",
    },
  ];

  introJs().setOptions({
    showBullets: false,
    keyboardNavigation: true,
    disableInteraction: true,
    exitOnOverlayClick: true,
    prevLabel: "上一步",
    nextLabel: "下一步",
    doneLabel: "完成",
    autoPosition: true,
    steps,
  }).start();
}

function movePositionOfHandler(type: "up" | "down", index: number) {
  let temp: TextHandlerWithName = refTextHandlerArray.value[index];
  let indexTarget = type === "up" ? index - 1 : index + 1;
  refTextHandlerArray.value[index] = refTextHandlerArray.value[indexTarget];
  refTextHandlerArray.value[indexTarget] = temp;
}
</script>

<template>
  <div class="article-copy-tool">
    <header>
      <h1>学术小工具</h1>
      <n-space>
        <n-button id="intro-button" @click="introduce" type="info" :dashed="true">使用说明</n-button>

        <div class="preference-button-area">
          <n-badge :value="`${refTextHandlerArray.filter(h=>h.activate).length}/${refTextHandlerArray.length}`" type="success">
            <n-button id="config-button" @click="showConfigDrawer = true" type="success" :dashed="true">偏好设置</n-button>
          </n-badge>
        </div>

        <UpdateLogDisplayUnit v-model:show="store.showUpdateLog"/>
      </n-space>
    </header>

    <n-grid :cols="tooManyInput?`1`:`1 800:2`" x-gap="10" y-gap="20">
      <n-gi>
        <n-space :vertical="true">
          <div class="input-area">
            <GrammarlyEditor v-model:value="inputText" placeholder="输入文本"/>
          </div>

          <div class="button-area">
            <n-space :size="30">
              <n-button @click="copyInputText()" type="info" :disabled="!inputText">复制</n-button>
              <n-button @click="cutInputText()" type="warning" :disabled="!inputText">剪切</n-button>
              <n-button @click="clearInputText()" color="#3f3f3f" :disabled="!inputText">清空</n-button>
            </n-space>
          </div>
        </n-space>
      </n-gi>

      <n-gi>
        <n-space :vertical="true">
          <div class="output-area">
            <n-input type="textarea" placeholder="输出文本" :show-count="true" size="large" :autosize="true" v-model:value="outputText"></n-input>
          </div>
          <div class="button-area">
            <n-space :size="30">
              <n-button @click="copyOutputText()" type="success" :disabled="!outputText">复制</n-button>
              <n-button @click="cutOutputText()" type="warning" :disabled="!outputText">剪切</n-button>
              <n-button @click="outputText=''" color="#3f3f3f" :disabled="!outputText">清空</n-button>
            </n-space>
          </div>
        </n-space>
      </n-gi>
    </n-grid>
  </div>

  <n-drawer v-model:show="showConfigDrawer" :height="`${Object.keys(textHandlers).length * 40 + 100}px`" placement="bottom">
    <n-drawer-content title="偏好设置" :closable="true">
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
h1 {
  text-align: center;
}

header {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}

.button-area {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
