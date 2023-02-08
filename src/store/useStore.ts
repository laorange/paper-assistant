import {defineStore} from "pinia";
import {textHandlers, TextHandlerWithName} from "../assets/ts/article-copy-tool/handlers";
import {useOsTheme} from "naive-ui";

export type SelectionReplaceCouple = { from: string, to: string, active: boolean, addTime?: number }

export interface Storage {
    copy: {
        handlerOptions: {
            [handlerName: string]: {
                activate: boolean,
                order: number
            }
        },
        autoOutput: boolean,
        clearInputWhenLeave: boolean,
        copyOutputWhenLeave: boolean,
        horizontalLayout: boolean,
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
        selection: {
            temp: SelectionReplaceCouple,
            couples: SelectionReplaceCouple[],
        },
    },
}

export const useStore = defineStore("store", {
    state: (): State => {
        return {
            storage: {
                copy: {
                    handlerOptions: {},
                    autoOutput: true,
                    clearInputWhenLeave: false,
                    copyOutputWhenLeave: true,
                    horizontalLayout: true,
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
                selection: {
                    temp: {from: "", to: "", active: false},
                    couples: [],
                },
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
            let outputText = this.copy.inputText;

            this.copy.selection.couples.filter(c => c.active).forEach(c => {
                outputText = outputText.replaceAll(c.from, c.to);
            });

            Object.values(this.textHandlerArray)
                .filter(textHandler => textHandler.activate)
                .forEach(textHandler => outputText = textHandler.executor(outputText), outputText);

            this.copy.outputText = outputText;
        },
    },
});
