import {defineStore} from "pinia";

export interface Storage {
    handlerOptions: {
        [handlerName: string]: {
            activate: boolean,
            order: number
        }
    };
    version: string;
}

export interface State {
    storage: Storage,
    showUpdateLog: boolean,
}

export const useStore = defineStore("store", {
    state: (): State => {
        return {
            storage: {
                handlerOptions: {},
                version: "",
            },
            showUpdateLog: false,
        };
    },
    getters: {},
    actions: {},
});
