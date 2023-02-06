<script setup lang="ts">
// @ts-ignore
import MarkdownIt from "markdown-it";
import {computed} from "vue";

const props = withDefaults(
    defineProps<{
      markdown: string,
      html?: boolean,
      linkify?: boolean,
      typographer?: boolean,
      breaks?: boolean,
    }>(),
    {
      html: true,
      linkify: true,
      typographer: false,
      breaks: false,
    });

const markdownIt = new MarkdownIt({
  html: props.html,
  linkify: props.linkify,
  typographer: props.typographer,
  breaks: props.breaks,
});

const result = computed(() => markdownIt.render(props.markdown));
</script>

<template>
  <div class="markdown-parser">
    <div v-html="result"/>
  </div>
</template>

<style lang="scss">
.markdown-parser {
  margin: 10px 5px;
  font-size: 12px;

  * {
    margin: 0;
    padding: 0;
  }

  ul {
    margin: -20px auto;
  }

  li {
    margin-left: 15px;
  }
}
</style>
