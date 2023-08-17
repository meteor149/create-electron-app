import {WindowState} from "../../common/model/env";
import {sendToClient} from "./ipc_utils";
import {IPC_LISTEN_CHANNEL_NAME, MSG_WIN_STATE_CHANGED} from "../../common/api/app";

export function getWindowState(window: Electron.BrowserWindow): WindowState {
    if (window.isFullScreen()) {
        return 'full-screen'
    } else if (window.isMaximized()) {
        return 'maximized'
    } else if (window.isMinimized()) {
        return 'minimized'
    } else if (!window.isVisible()) {
        return 'hidden'
    } else {
        return 'normal'
    }
}

function sendWindowStateEvent(
    window: Electron.BrowserWindow,
    state: WindowState
) {
    sendToClient(window.webContents, IPC_LISTEN_CHANNEL_NAME, MSG_WIN_STATE_CHANGED, { data: state });
}


export function listenWinStateEvents(
    window: Electron.BrowserWindow
) {
    window.on('enter-full-screen', () => sendWindowStateEvent(window, 'full-screen'))
    window.on('leave-full-screen', () => sendWindowStateEvent(window, 'normal'))
    window.on('maximize', () => sendWindowStateEvent(window, 'maximized'))
    window.on('minimize', () => sendWindowStateEvent(window, 'minimized'))
    window.on('unmaximize', () => sendWindowStateEvent(window, 'normal'))
    window.on('restore', () => sendWindowStateEvent(window, 'normal'))
    window.on('hide', () => sendWindowStateEvent(window, 'hidden'))
    window.on('show', () => sendWindowStateEvent(window, getWindowState(window)))
}

export function isWin32() {
    return process.platform === 'win32';
}

export function isDarwin() {
    return process.platform === 'darwin';
}

export function isLinux() {
    return process.platform === 'linux';
}

export function isDev () {
    return process.env.NODE_ENV === 'development';
}
