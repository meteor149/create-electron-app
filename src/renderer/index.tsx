import React from 'react';
import ReactDOM from 'react-dom/client';

import {appState, EnvStore} from "./store/app_store";
import {App} from "./view/app/App";
import {URI_CONSTANT, URI_WINDOWS} from "../common/api/app";
import {sendProxy} from "./utils/net_utils";
import {StoreActionType} from "./store/app_store_constant";

const whyDidYouRender = require('@welldone-software/why-did-you-render');

/**
 * 渲染进程入口
 */
(async () => {
    await init();
    await render();
})();

async function init() {
    // 初始化常量
    const constantRes = await sendProxy<Partial<EnvStore>>(URI_CONSTANT);
    if(constantRes.data !== undefined) await appState.dispatchEnv({ type: StoreActionType.ENV, data: constantRes.data });
    // 获取主窗口id
    const idRes = await sendProxy<Partial<EnvStore>>(URI_WINDOWS, "main-window-id");
    if(idRes.data !== undefined) await appState.dispatchEnv({ type: StoreActionType.ENV, data: idRes.data });
    // 初始化窗口状态
    const res = await sendProxy<Partial<EnvStore>>(URI_WINDOWS, "window-state", appState.getMainWinId());
    if (res.data !== undefined) await appState.dispatchEnv({ type: StoreActionType.ENV, data: res.data});
}

async function render () {
    if (appState.getState().envData.constant.IS_DEV) {
        whyDidYouRender(React, {
            trackAllPureComponents: true,
        });
    }

    try {
        ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
    } catch (e) {
        console.error('ReactDOM.createRoot ->', e);
    }
}
