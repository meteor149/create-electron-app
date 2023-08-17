import {appState} from "../store/app_store";

export function isDarwin () {
    return appState.getState().envData.constant.PLATFORM === "darwin";
}

export function isWin32 () {
    return appState.getState().envData.constant.PLATFORM === "win32";
}

export function isLinux () {
    return appState.getState().envData.constant.PLATFORM === "linux";
}

export function isDev () {
    return appState.getState().envData.constant.IS_DEV;
}
