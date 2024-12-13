<script setup lang="ts">
import { onMounted } from "vue";

// 初始化广告的逻辑
onMounted(() => {
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (e) {
    console.error("AdSense 加载错误:", e);
  }
});
</script>

<template>
  <div class="ads-container">
    <!-- AdSense 广告位 -->
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-9308205054045831"
         data-ad-slot="9308205054045831"
         data-ad-format="auto"></ins>
  </div>
</template>

<style>
.ads-container {
  text-align: center;
  margin: 20px 0;
}
</style>
