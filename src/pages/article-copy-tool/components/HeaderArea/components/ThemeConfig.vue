<script setup lang="ts">
import {useStore} from "../../../../../store/useStore";
import {Moon, Sunny} from "@vicons/ionicons5";

const store = useStore();
</script>

<template>
  <n-button class="theme-config-button" type="primary" :dashed="true"
            @click="store.storage.darkMode = !store.storage.darkMode">
    <template #icon>
      <n-icon>
        <Moon v-if="store.storage.darkMode" />
        <Sunny v-else/>
      </n-icon>
    </template>
    变更主题
  </n-button>
</template>

<style scoped>

</style>
