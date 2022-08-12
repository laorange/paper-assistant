<script setup lang="ts">
import useClipboard from "vue-clipboard3";
import {ref, watch} from "vue";
import {useMessage} from "naive-ui";

const message = useMessage();
const {toClipboard} = useClipboard();

const inputText = ref<string>("");
const outputText = ref<string>("");

watch(() => inputText.value, (text) => {
  if (text) {
    let output: string = text;

    // 全角转半角 (参考: https://unicode-table.com/cn/search/?q=%E5%85%A8%E5%BD%A2%E6%95%B0%E5%AD%97)
    output = handlers.convertFullWidthCharactersToHalfWidth(output);

    // 替换换行符为空格 (参考：https://blog.csdn.net/lfod1997/article/details/121095287)
    output = output.replace(/\r?\n|(?<!\n)\r/, " ");

    // 替换多个空格为单个
    output = output.replace(/\s+/g, " ");

    // 删除非英文字母间的空格
    output = output.replace(/([^A-Za-z"':])\s/g, "$1");
    output = output.replace(/\s([^A-Za-z"':])/g, "$1");

    outputText.value = output;
  }
});

const handlers = {
  async copyInputText() {
    await toClipboard(inputText.value);
    message.info("复制成功");
  },
  clearInputText() {
    inputText.value = "";
  },
  async copyOutputText() {
    await toClipboard(outputText.value);
    message.success("复制成功");
  },
  clearOutputText() {
    outputText.value = "";
  },
  /** 全角转半角, 参考：https://www.cnblogs.com/html55/p/10298569.html */
  convertFullWidthCharactersToHalfWidth(text: string) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      let char = text.charCodeAt(i);
      // 中文空格替换为英文空格
      if (char == 12288) {
        result += String.fromCharCode(char - 12256);
        continue;
      }
      if (char > 65280 && char < 65375
          // 对，：；·！#￥%…这样的全角字符不做转换
          && [..."，：；·！#￥%…"].indexOf(text[i]) === -1) {
        console.log([..."，：；·！#￥%…"].indexOf(text[i]));
        result += String.fromCharCode(char - 65248);
      } else result += String.fromCharCode(text.charCodeAt(i));
    }
    return result;
  },
};
</script>

<template>
  <div class="article-copy-tool">
    <h1>文本复制工具</h1>

    <n-grid cols="1 800:2" x-gap="10" y-gap="20">
      <n-gi>
        <n-grid cols="1">
          <n-gi>
            <n-input type="textarea" placeholder="输入文本" :clearable="true" size="large" :autosize="true" v-model:value.lazy="inputText"></n-input>
          </n-gi>
          <n-gi>
            <div class="button-area">
              <n-space>
                <n-button @click="handlers.copyInputText" size="large" type="info" :disabled="!inputText">复制:输入文本</n-button>
                <n-button @click="handlers.clearInputText" size="large" type="warning" :disabled="!inputText">清空:输入文本</n-button>
              </n-space>
            </div>
          </n-gi>
        </n-grid>
      </n-gi>

      <n-gi>
        <n-grid cols="1">
          <n-gi>
            <n-input type="textarea" placeholder="输出文本" :clearable="true" size="large" :autosize="true" v-model:value="outputText"></n-input>
          </n-gi>
          <n-gi>
            <div class="button-area">
              <n-space>
                <n-button @click="handlers.copyOutputText" size="large" type="success" :disabled="!outputText">复制:输出文本</n-button>
                <n-button @click="handlers.clearOutputText" size="large" type="warning" :disabled="!outputText">清空:输出文本</n-button>
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
