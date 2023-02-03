import {defineStore} from "pinia";

export interface Storage {
    copy: {
        handlerOptions: {
            [handlerName: string]: {
                activate: boolean,
                order: number
            }
        };
    };
    version: string;
}

export interface State {
    storage: Storage,
    showUpdateLog: boolean,
    copy: {
        inputText: string,
        outputText: string,
    }
}

export const useStore = defineStore("store", {
    state: (): State => {
        return {
            storage: {
                copy: {
                    handlerOptions: {},
                },
                version: "",
            },
            showUpdateLog: false,
            copy: {
                inputText: "",
                outputText: "",
            },
        };
    },
    getters: {},
    actions: {},
});
