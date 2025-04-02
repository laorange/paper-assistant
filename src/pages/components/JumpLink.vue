<script setup lang="ts">
import {CloseOutlined} from "@vicons/material";
import {Icon} from "@vicons/utils";

defineProps({
  showNoticeBanner: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["update:showNoticeBanner"]);

const closeBanner = () => {
  emit("update:showNoticeBanner", false);
};
</script>

<template>
  <div v-if="showNoticeBanner" class="upgrade-banner">
    <!-- 中间的文本和按钮部分 -->
    <div class="banner-content">
      <p class="banner-text">
        "论文工具"即将升级为"拷贝鸭"，现已开始公测😉 快来试试吧~
      </p>
      <div class="banner-buttons">
        <a
            href="https://copya.online/v2/"
            class="banner-button"
            target="_blank"
            rel="noopener noreferrer"
        >
          体验新版
        </a>
      </div>
    </div>
    <!-- 关闭按钮，绝对定位到右侧 -->
    <Icon
        size="18"
        class="close-button cursor-pointer"
        @click="closeBanner"
    >
      <CloseOutlined/>
    </Icon>
  </div>
</template>

<style scoped>
.upgrade-banner {
  position: relative; /* 以便内部绝对定位 */
  width: 100%;
  padding: 2px 16px;
  background: linear-gradient(270.11deg, rgba(68, 47, 253, .8) -2.45%, rgba(0, 85, 242, .8) 38.81%, rgba(15, 135, 255, .8) 75.63%, #3de6f5 108.2%);
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}

/* 将文本和按钮放在一起，居中显示 */
.banner-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 文字样式 */
.banner-text {
  margin: 0;
  line-height: 1.6;
  color: #fff;
  white-space: nowrap;
  font-size: 12px;
}

/* 按钮容器 */
.banner-buttons {
  margin-left: 16px;
  font-size: 12px;
}

/* 按钮样式 */
.banner-button {
  display: inline-block;
  padding: 4px 8px;
  color: #fff;
  background: hsla(0, 0%, 100%, .1);
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.banner-button:hover {
  background-color: #66b1ff;
}

/* 关闭按钮样式，绝对定位到右侧 */
.close-button {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  color: #fff;
  cursor: pointer;
}
</style>
