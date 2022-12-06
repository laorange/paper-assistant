<script setup lang="ts">
import useClipboard from "vue-clipboard3";
import {computed, reactive, ref, watch} from "vue";
import {useMessage} from "naive-ui";
import {textHandlers, TextHandlers} from "../../assets/ts/article-copy-tool/handlers";

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

async function copyInputText() {
  await toClipboard(inputText.value);
  message.info("复制成功");
}

function clearInputText() {
  inputText.value = "";
}

async function copyOutputText() {
  await toClipboard(outputText.value);
  message.success("复制成功");
}

function clearOutputText() {
  outputText.value = "";
}
</script>

<template>
  <div class="article-copy-tool">
    <h1>文本复制工具</h1>

    <n-grid cols="1 1000:3" x-gap="10" y-gap="20">
      <n-gi>
        <n-grid cols="1">
          <n-gi>
            <n-input type="textarea" placeholder="输入文本" :clearable="true" size="large" :autosize="true" v-model:value.lazy="inputText"></n-input>
          </n-gi>
          <n-gi>
            <div class="button-area">
              <n-space>
                <n-button @click="copyInputText" size="large" type="info" :disabled="!inputText">复制:输入文本</n-button>
                <n-button @click="clearInputText" size="large" type="warning" :disabled="!inputText">清空:输入文本</n-button>
              </n-space>
            </div>
          </n-gi>
        </n-grid>
      </n-gi>

      <n-gi>
        <n-space :vertical="true" justify="center" align="center">
          <n-form-item v-for="textHandler of refTextHandlers" :key="`textHandler-${textHandler.description}`"
                       :label="textHandler.description" :show-feedback="false" label-placement="left">
            <n-switch v-model:value="textHandler.activate"/>
          </n-form-item>
        </n-space>
      </n-gi>

      <n-gi>
        <n-grid cols="1">
          <n-gi>
            <n-input type="textarea" placeholder="输出文本" :clearable="true" size="large" :autosize="true" v-model:value="outputText"></n-input>
          </n-gi>
          <n-gi>
            <div class="button-area">
              <n-space>
                <n-button @click="copyOutputText" size="large" type="success" :disabled="!outputText">复制:输出文本</n-button>
                <n-button @click="clearOutputText" size="large" type="warning" :disabled="!outputText">清空:输出文本</n-button>
              </n-space>
            </div>
          </n-gi>
        </n-grid>
      </n-gi>
    </n-grid>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

.button-area {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
