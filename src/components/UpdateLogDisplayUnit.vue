<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{ show: boolean }>();
const emits = defineEmits(["update:show"]);

const showLocal = computed<boolean>({
  get: () => props.show,
  set: (newValue) => emits("update:show", newValue),
});

const updateLog = `
<div>
  <p>若您遇到问题或有好的建议😊欢迎在<a target="_blank" href="https://www.bilibili.com/video/BV1T24y1X78w/">B站评论区</a>或<a target="_blank" href="https://github.com/laorange/paper-assistant/issues">GitHub</a>留言</p>

  <hr/>

  <h1>更新日志</h1>
  <h3>v0.3.6 (2023-01-08)</h3>
  <p>优化：剪切和清空输入文本时不再清空输出框
    <a style="text-decoration: none" target="_blank" href="https://www.bilibili.com/video/BV1T24y1X78w/#reply145757356944" title="来自评论区小伙伴的建议">🏷️</a>
  </p>

  <h3>v0.3.5 (2023-01-07)</h3>
  <p>优化：文本框下新增清空按钮
    <a style="text-decoration: none" target="_blank" href="https://www.bilibili.com/video/BV1T24y1X78w/#reply145609989120" title="来自评论区小伙伴的建议">🏷️</a>
  </p>

  <h3>v0.3.4 (2023-01-06)</h3>
  <p>新增功能：删除小数点、冒号与数字之间的空格
    <a style="text-decoration: none" target="_blank" href="https://www.bilibili.com/video/BV1T24y1X78w/#reply145368905056" title="感谢评论区小伙伴的找到的bug">🏷️</a>
  </p>
  <p>新增：更新日志展示页面</p>
  <p>优化：对输入文本的监测方式</p>

  <h3>v0.3.3 (2022-12-27)</h3>
  <p>修复：部分替换只能激活一次</p>

  <h3>v0.3.2 (2022-12-22)</h3>
  <p>新增功能：中英文标点互转</p>
  <p>新增功能：在字母与数字之间添加空格</p>

  <h3>v0.3.1 (2022-12-21)</h3>
  <p>优化：在偏好设置处显示"启用的功能数量/总数"</p>
  <p>修复：复制成功的提示未能正确显示</p>

  <h3>v0.3.0 (2022-12-12)</h3>
  <p>新增功能：可缓存功能的激活状态</p>
  <p>新增功能：可调整功能激活顺序</p>

  <h3>v0.2 (2022-12-07)</h3>
  <p>新增：可在偏好设置中按需启用功能</p>
  <p>新增：在输入框中内置 Grammarly 语法检测功能</p>

  <h3>v0.1 (2022-08-12)</h3>
  <p>新增功能：可去除空格、换行符</p>
</div>`;
</script>

<template>
  <n-button class="show-update-log-button" @click="showLocal=true" color="#3f3f3f" :dashed="true">更新日志</n-button>

  <n-drawer v-model:show="showLocal" height="80%" placement="bottom">
    <n-drawer-content title="更新日志" :closable="true">
      <n-space justify="center" align="center" :vertical="true">
        <n-space style="height: 100%" :vertical="true" justify="center" align="end" :size="2">
          <div class="update-log-display-area" v-html="updateLog"/>
        </n-space>
      </n-space>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>
