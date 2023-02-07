import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";

import Markdown from "vite-plugin-vue-markdown";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {ElementPlusResolver, NaiveUiResolver, VantResolver} from "unplugin-vue-components/resolvers";

import {viteSingleFile} from "vite-plugin-singlefile";

// https://vitejs.dev/config/
export default defineConfig(config => {
    return {
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver(), NaiveUiResolver(), VantResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver(), NaiveUiResolver(), VantResolver()],
            }),
            vue({include: [/\.vue$/, /\.md$/]}),
            Markdown(),
            config.mode === "single-file" ? viteSingleFile() : undefined,
        ],
    };
});
