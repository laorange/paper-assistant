import {Storage, useStore} from "../../store/useStore";
import {useStorage} from "vue3-storage";
import {watch} from "vue";
import packageJson from "../../../package.json";

export default function useInitiator() {
    function initialize() {
        const store = useStore();
        const storage = useStorage();
        const LOCAL_STORAGE_KEY = "PA";

        watch(() => store.storage, (newStorage) => {
            storage.setStorageSync(LOCAL_STORAGE_KEY, newStorage);
        }, {deep: true});

        let storageNow = storage.getStorageSync<Storage>(LOCAL_STORAGE_KEY);
        if (!!storageNow && storageNow?.version !== packageJson.version) {
            // 1. 本地缓存不为空  2.更新版本时 => 1.清除本地缓存 2.弹出更新日志
            console.log(`版本更新：${storageNow?.version} → ${packageJson.version}`);
            storageNow = store.storage;
            store.showUpdateLog = true;
        }
        store.storage = {...store.storage, ...storageNow, version: packageJson.version};
    }

    return {initialize};
};
