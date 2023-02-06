import {defineStore} from "pinia";
import {textHandlers, TextHandlerWithName} from "../assets/ts/article-copy-tool/handlers";
import {useOsTheme} from "naive-ui";

export interface Storage {
    copy: {
        handlerOptions: {
            [handlerName: string]: {
                activate: boolean,
                order: number
            }
        },
        singleColumn: boolean,
        autoOutput: boolean,
    },
    version: string,
    darkMode: boolean,
    releasedInfo: {
        time: number,
        version: string,
        body: string,
    },
}

export interface State {
    storage: Storage,
    showUpdateLog: boolean,
    copy: {
        inputText: string,
        outputText: string,
    },
}

export const useStore = defineStore("store", {
    state: (): State => {
        return {
            storage: {
                copy: {
                    handlerOptions: {},
                    singleColumn: false,
                    autoOutput: false,
                },
                version: "",
                darkMode: useOsTheme().value === "dark",
                releasedInfo: {
                    time: 0,
                    version: "",
                    body: "",
                },
            },
            showUpdateLog: false,
            copy: {
                inputText: "",
                outputText: "",
            },
        };
    },
    getters: {
        textHandlerArray(): TextHandlerWithName[] {
            return Object.entries(textHandlers).map(([handlerName, handler], index) => {
                return {
                    handlerName: handlerName,
                    handler: {...handler, activate: this.storage.copy.handlerOptions[handlerName]?.activate ?? handler.activate},
                    order: this.storage.copy.handlerOptions[handlerName]?.order ?? Object.keys(textHandlers).length + index,
                };
            }).sort((a, b) => a.order - b.order).map(data => {
                return {...data.handler, handlerName: data.handlerName};
            });
        },
    },
    actions: {
        transformText(): void {
            this.copy.outputText = Object.values(this.textHandlerArray)
                .filter(textHandler => textHandler.activate)
                .reduce((text, textHandler) => textHandler.executor(text), this.copy.inputText);
        },
    },
});
