<script setup lang="ts">
// v0.1.6
import {nextTick, ref, watch} from "vue";
import {NButton, NSpace, NIcon} from "naive-ui";

// region - Long text html
const githubIconHtml = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 0 0 3.8.4c8.3 0 11.5-6.1 11.5-11.4c0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 0 1-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5c-10.2-26.5-24.9-33.6-24.9-33.6c-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8c11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0 0 25.6-6c2-14.8 7.8-24.9 14.2-30.7c-49.7-5.8-102-25.5-102-113.5c0-25.1 8.7-45.6 23-61.6c-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 0 1 5-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 0 1 112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 0 1 5 .5c12.2 31.6 4.5 55 2.2 60.8c14.3 16.1 23 36.6 23 61.6c0 88.2-52.4 107.6-102.3 113.3c8 7.1 15.2 21.1 15.2 42.5c0 30.7-.3 55.5-.3 63c0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 0 0 4-.4C415.9 449.2 480 363.1 480 261.7C480 134.9 379.7 32 256 32z" fill="currentColor"></path></svg>`;
const closeIconHtml = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12s-5.4 12-12 12z" fill="currentColor"></path><path d="M21.4 23L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z" fill="currentColor"></path></svg>`;
const sponsorIconHtml = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 576 512"><path d="M275.3 250.5c7 7.4 18.4 7.4 25.5 0l108.9-114.2c31.6-33.2 29.8-88.2-5.6-118.8c-30.8-26.7-76.7-21.9-104.9 7.7L288 36.9l-11.1-11.6C248.7-4.4 202.8-9.2 172 17.5c-35.3 30.6-37.2 85.6-5.6 118.8l108.9 114.2zm290 77.6c-11.8-10.7-30.2-10-42.6 0L430.3 402c-11.3 9.1-25.4 14-40 14H272c-8.8 0-16-7.2-16-16s7.2-16 16-16h78.3c15.9 0 30.7-10.9 33.3-26.6c3.3-20-12.1-37.4-31.6-37.4H192c-27 0-53.1 9.3-74.1 26.3L71.4 384H16c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h356.8c14.5 0 28.6-4.9 40-14L564 377c15.2-12.1 16.4-35.3 1.3-48.9z" fill="currentColor"></path></svg>`;
const bilibiliHtml = `<svg t="1670840120760" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2340" width="200" height="200"><path d="M777.514667 131.669333a53.333333 53.333333 0 0 1 0 75.434667L728.746667 255.829333h49.92A160 160 0 0 1 938.666667 415.872v320a160 160 0 0 1-160 160H245.333333A160 160 0 0 1 85.333333 735.872v-320a160 160 0 0 1 160-160h49.749334L246.4 207.146667a53.333333 53.333333 0 1 1 75.392-75.434667l113.152 113.152c3.370667 3.370667 6.186667 7.04 8.448 10.965333h137.088c2.261333-3.925333 5.12-7.68 8.490667-11.008l113.109333-113.152a53.333333 53.333333 0 0 1 75.434667 0z m1.152 231.253334H245.333333a53.333333 53.333333 0 0 0-53.205333 49.365333l-0.128 4.010667v320c0 28.117333 21.76 51.157333 49.365333 53.162666l3.968 0.170667h533.333334a53.333333 53.333333 0 0 0 53.205333-49.365333l0.128-3.968v-320c0-29.44-23.893333-53.333333-53.333333-53.333334z m-426.666667 106.666666c29.44 0 53.333333 23.893333 53.333333 53.333334v53.333333a53.333333 53.333333 0 1 1-106.666666 0v-53.333333c0-29.44 23.893333-53.333333 53.333333-53.333334z m320 0c29.44 0 53.333333 23.893333 53.333333 53.333334v53.333333a53.333333 53.333333 0 1 1-106.666666 0v-53.333333c0-29.44 23.893333-53.333333 53.333333-53.333334z" p-id="2341"></path></svg>`;

withDefaults(
    defineProps<{
      /**
       * Author name, with the default value "GitHub@laorange"
       */
      author?: string,

      /**
       * The url of your project repository on GitHub.
       */
      projectUrl?: string,

      /**
       * The license of the project, with the default value "AGPL-3.0 License"
       */
      license?: string,

      /**
       * The url of the sponsor QR, with the default value of mine.
       */
      qrUrl?: string,

      /**
       * The version of your project.
       */
      version?: string,

      /**
       * The additional text that you want to display in the footer. Meanwhile, you can use the default slot.
       */
      addition?: string,

      /**
       * The text in the button to redirect to your repository, with the default value "查看源代码".
       */
      repoButtonText?: string,

      /**
       * The text in the button to OPEN the sponsor QR, with the default value "鼓励开发者".
       */
      openDialogText?: string,

      /**
       * The text in the button to CLOSE the sponsor QR, with the default value "关闭赞赏码".
       */
      closeDialogText?: string,

      bilibiliUrl?: string
      bilibiliText?: string
    }>(),
    {
      author: "GitHub@laorange",
      license: "AGPL-3.0 License",
      repoButtonText: "查看源代码",
      openDialogText: "鼓励开发者",
      closeDialogText: "关闭赞赏码",
      bilibiliText: "视频介绍",
    },
);
// endregion

const showQR = ref(false);
watch(() => showQR.value, (newShowQr) => {
  if (!newShowQr) nextTick(() => document.documentElement.scrollTop += 9999);
});

const isShaking = ref(false);
watch(() => isShaking.value, (newShakeStatus) => {
  if (newShakeStatus) {
    setTimeout(() => isShaking.value = false, 2000);
  }
});

const year = (new Date()).getFullYear();

function goTo(url: string) {
  window.open(url);
}
</script>

<template>
  <div class="copyright-div">
    <div class="copyright-div-content">
      <teleport to="#app">
        <transition name="qr">
          <div v-if="showQR">
            <div class="dialog" @click="isShaking=true">
              <div class="dialog-content" @click.stop>
                <img alt="qr.jpg" :src="qrUrl"/>
                <n-space class="copyright-text-content" :size="10" :vertical="true" justify="center" align="center">
                  <n-space :size="30">
                    <n-button type="info" dashed size="tiny" v-if="projectUrl" @click="goTo(projectUrl ?? '')">
                      {{ repoButtonText }}
                      <template #icon>
                        <n-icon v-html="githubIconHtml"/>
                      </template>
                    </n-button>
                    <n-button type="info" dashed size="tiny" @click="showQR=!showQR" v-if="showQR" :class="{shaking: isShaking}">
                      {{ closeDialogText }}
                      <template #icon>
                        <n-icon v-html="closeIconHtml"/>
                      </template>
                    </n-button>
                    <n-button type="info" dashed size="tiny" @click="showQR=!showQR" v-if="!showQR">
                      {{ openDialogText }}
                      <template #icon>
                        <n-icon v-html="sponsorIconHtml"/>
                      </template>
                    </n-button>
                  </n-space>
                  <n-space :size="5" :vertical="true" justify="center" align="center">
                    <slot/>
                    <div v-if="addition">{{ addition }}</div>
                    <div>
                      <span v-if="version">v{{ version }}</span>
                      <span v-if="!!version && !!license">丨</span>
                      <span v-if="license">Released under {{ license }}</span></div>
                    <div v-if="author">Copyright © {{ year }} {{ author }}</div>
                  </n-space>
                </n-space>
              </div>
            </div>
          </div>
        </transition>
      </teleport>

      <n-space v-if="!showQR" class="copyright-text-content" :size="10" :vertical="true" justify="center" align="center">
        <n-space :size="30">
          <n-button type="info" dashed size="tiny" v-if="projectUrl" @click="goTo(projectUrl ?? '')">
            {{ repoButtonText }}
            <template #icon>
              <n-icon v-html="githubIconHtml"/>
            </template>
          </n-button>
          <n-button type="info" dashed size="tiny" @click="showQR=!showQR" v-if="showQR" :class="{shaking: isShaking}">
            {{ closeDialogText }}
            <template #icon>
              <n-icon v-html="closeIconHtml"/>
            </template>
          </n-button>
          <n-button type="info" dashed size="tiny" @click="goTo(bilibiliUrl ?? ``)" v-if="bilibiliUrl">
            {{ bilibiliText }}
            <template #icon>
              <n-icon v-html="bilibiliHtml"/>
            </template>
          </n-button>
          <n-button type="info" dashed size="tiny" @click="showQR=!showQR" v-if="!showQR && qrUrl">
            {{ openDialogText }}
            <template #icon>
              <n-icon v-html="sponsorIconHtml"/>
            </template>
          </n-button>
        </n-space>
        <n-space :size="5" :vertical="true" justify="center" align="center">
          <slot/>
          <div v-if="addition">{{ addition }}</div>
          <div>
            <span v-if="version">v{{ version }}</span>
            <span v-if="!!version && !!license">丨</span>
            <span v-if="license">Released under {{ license }}</span></div>
          <div v-if="author">Copyright © {{ year }} {{ author }}</div>
        </n-space>
      </n-space>
    </div>
  </div>
</template>

<style scoped>
.copyright-div {
  font-size: 12px;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: space-between;
}

img {
  max-width: 90vw;
  max-height: 50vh;
  margin-bottom: 20px;
  border-radius: 0 0 10% 10%;
}

.dialog {
  position: fixed;
  display: flex;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  justify-content: center;
  justify-items: center;
  align-items: center;
  z-index: 999;
  background-color: #efefefcc;
  backdrop-filter: blur(10px);
}

a:link, a:visited {
  text-decoration: none;
  color: black;
  cursor: pointer;
}

a:hover {
  color: #00af50;
}

.qr-enter-from, .qr-leave-to {
  transform: scale(0);
}

.qr-enter-to, .qr-leave-from {
  transform: scale(1);
}

.qr-enter-active, .qr-leave-active {
  transition: all 0.3s linear;
  transform-origin: center;
  position: fixed;
  display: flex;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}

.shaking {
  animation: shake 1s ease-in infinite;
}

@keyframes shake {
  10% {
    transform: rotate(10deg) scale(1.3);
    background-color: #00af50;
  }
  20% {
    transform: rotate(-10deg) scale(1.3);
    background-color: #00af50;
  }
  30% {
    transform: rotate(5deg) scale(1.3);
    background-color: #00af50;
  }
  40% {
    transform: rotate(-5deg) scale(1.3);
    background-color: #00af50;
  }
  50%,
  100% {
    transform: rotate(0deg);
  }
}
</style>
