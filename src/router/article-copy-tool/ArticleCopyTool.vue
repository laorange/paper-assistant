<script setup lang="ts">
import useClipboard from "vue-clipboard3";
import {computed, reactive, ref, watch} from "vue";
import {useMessage} from "naive-ui";
import {textHandlers, TextHandlers} from "../../assets/ts/article-copy-tool/handlers";
import GrammarlyEditor from "../../components/GrammarlyEditor.vue";
// @ts-ignore
import introJs from "intro.js";

const message = useMessage();
const {toClipboard} = useClipboard();

const refTextHandlers = reactive<TextHandlers>(textHandlers);

const inputText = ref<string>("");
const outputText = ref<string>("");
const outputTextTemp = computed(() => {
  let text = inputText.value;
  for (let textHandler of Object.values(refTextHandlers)) {
    if (textHandler.activate) {
      text = textHandler.executor(text);
    }
  }
  return text;
});
watch(() => outputTextTemp.value, (output) => outputText.value = output);

async function copyInputText(info: string = "复制成功") {
  await toClipboard(inputText.value);
  message.success(info);
}

async function cutInputText() {
  await copyInputText("剪切成功");
  inputText.value = "";
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
  introJs().setOptions({
    showBullets: false,
    disableInteraction: true,
    exitOnOverlayClick: false,
    prevLabel: "上一步",
    nextLabel: "下一步",
    doneLabel: "完成",
  }).start();
}
</script>

<template>
  <div class="article-copy-tool">
    <header>
      <h1>学术小工具</h1>
      <n-space>
        <n-button id="intro-button" @click="introduce" type="info" :dashed="true" size="large">使用说明</n-button>

        <div data-title="偏好设置" data-intro="按需启用功能">
          <n-badge :value="Object.values(textHandlers).filter(h=>h.activate).length" type="success" :show-zero="true">
            <n-button id="config-button" @click="showConfigDrawer = true" type="success" :dashed="true" size="large">偏好设置</n-button>
          </n-badge>
        </div>
      </n-space>
    </header>

    <n-grid :cols="tooManyInput?`1`:`1 800:2`" x-gap="10" y-gap="20">
      <n-gi>
        <n-space :vertical="true">
          <div data-title="输入框"
               data-intro="请在这里输入内容，程序将根据<strong>偏好设置</strong>进行文本处理。<hr/>此外，如果您:<br/>①输入的是英文<br/>②使用电脑访问<br/>将为您检测语法(基于Grammarly)">
            <GrammarlyEditor v-model:value="inputText" placeholder="输入文本"/>
          </div>

          <div class="button-area">
            <n-space>
              <n-button @click="copyInputText" type="info" :disabled="!inputText">复制</n-button>
              <n-button @click="cutInputText" type="warning" :disabled="!inputText">剪切</n-button>
            </n-space>
          </div>
        </n-space>
      </n-gi>

      <n-gi>
        <n-space :vertical="true">
          <div data-title="输出框" data-intro="将在这里输出处理结果">
            <n-input type="textarea" placeholder="输出文本" :show-count="true" :clearable="true" size="large" :autosize="true" v-model:value="outputText"></n-input>
          </div>
          <div class="button-area">
            <n-space>
              <n-button @click="copyOutputText" type="success" :disabled="!outputText">复制</n-button>
              <n-button @click="cutOutputText" type="warning" :disabled="!outputText">剪切</n-button>
            </n-space>
          </div>
        </n-space>
      </n-gi>
    </n-grid>
  </div>

  <n-drawer v-model:show="showConfigDrawer" :height="`${Object.keys(textHandlers).length * 40 + 100}px`" placement="bottom">
    <n-drawer-content title="偏好设置" :closable="true">
      <n-space style="height: 100%" :vertical="true" justify="center" align="center" :size="2">
        <n-form-item v-for="textHandler of refTextHandlers" :key="`textHandler-${textHandler.description}`"
                     :label="textHandler.description" :show-feedback="false" label-placement="left">
          <n-switch v-model:value="textHandler.activate"/>
        </n-form-item>
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
