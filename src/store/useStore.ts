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
    storage: Storage;
}

export const useStore = defineStore("store", {
    state: (): State => {
        return {
            storage: {
                handlerOptions: {},
                version: "",
            },
        };
    },
    getters: {},
    actions: {},
});
