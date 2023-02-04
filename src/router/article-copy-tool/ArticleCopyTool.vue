<script setup lang="ts">
import {computed} from "vue";
import {useStore} from "../../store/useStore";
import UpdateLogDisplayUnit from "../../components/UpdateLogDisplayUnit.vue";
import InputArea from "./components/InputArea.vue";
import InputFuncButtons from "./components/InputFuncButtons.vue";
import OutputArea from "./components/OutputArea.vue";
import OutputFuncButtons from "./components/OutputFuncButtons.vue";
import PreferenceConfig from "./components/PreferenceConfig.vue";
import {textHandlers} from "../../assets/ts/article-copy-tool/handlers";
// @ts-ignore
import introJs from "intro.js";

const store = useStore();

const tooManyInput = computed(() => store.copy.inputText.length > 500);

function introduce() {
  let steps: { element?: Element | null, title?: string, intro?: string, position?: string }[] = [
    {
      element: document.querySelector(".preference-config"),
      title: "偏好设置",
      intro: `按需启用功能。目前您可以选择:<p>${Object.values(textHandlers).map((h, i) => `${i + 1}. ` + h.description).join("<br/>")}</p>`,
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
</script>

<template>
  <div class="article-copy-tool">
    <header>
      <h1>文本复制工具</h1>
      <n-space>
        <n-button id="intro-button" @click="introduce" type="info" :dashed="true">使用说明</n-button>
        <PreferenceConfig/>
        <UpdateLogDisplayUnit v-model:show="store.showUpdateLog"/>
      </n-space>
    </header>

    <n-grid :cols="tooManyInput?`1`:`1 800:2`" x-gap="10" y-gap="20">
      <n-gi>
        <InputArea/>
        <InputFuncButtons/>
      </n-gi>

      <n-gi>
        <OutputArea/>
        <OutputFuncButtons/>
      </n-gi>
    </n-grid>
  </div>
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
</style>
