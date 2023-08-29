import path from 'path';
import {app, BrowserWindow, ipcMain, Menu, session} from 'electron';
import '../renderer/store/app_store';
import { sendDispatcher } from "./ipc/send_dispatcher";
import {formatDate, mLogger} from "./utils/log_utils";
import {WinService} from "./service/win_service";
import {isDarwin, isDev, isLinux, isWin32, listenWinStateEvents} from "./utils/env_utils";
import {createDir, createFileSync} from "./utils/io_utils";
import {IPC_SEND_CHANNEL_NAME} from "../common/api/app";
import {Message} from "../common/model/ipc";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
    // 安装时退出
    app.quit();
}

let willQuitApp = false;  // 控制退出方式
export let mainWindow: BrowserWindow;

listen();

function listen() {
    process.on('uncaughtException', function (error) {
        mLogger.error(error)
    });

    ipcMain.handle(IPC_SEND_CHANNEL_NAME, async (_e, uri: string, req: Message<any>) => {
        return await sendDispatcher.dispatch(uri, req);
    });

    app.on('activate', () => {
        mainWindow.show()
    })

    app.on('window-all-closed', () => {
        // macOS 除非用 Cmd + Q 才退出，
        if (!isDarwin()) {
            app.quit()
        }
    });

    app.on('before-quit', () => {
        willQuitApp = true
    });

    app.whenReady().then(() => {
        // 隐藏菜单栏
        const { Menu } = require('electron');
        Menu.setApplicationMenu(null);

        initLog();
        initWindows();
        initService();
    });
}

function initLog() {
    const appName = app.getName();
    const appDir = path.join(app.getPath('appData'), appName);
    const logDir = path.join(appDir, '/logs');
    const mainLogFile = path.join(logDir, 'main_' + formatDate(new Date()) + '.log');
    createDir(logDir);
    createFileSync(mainLogFile, 'a');
    mLogger.setLogPath(mainLogFile);
}

function initWindows() {
    const windowOptions: Electron.BrowserWindowConstructorOptions = {
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            nodeIntegration: true
        },
        width: 1600,
        height: 900,
        resizable: true
    };

    if (isDarwin()) {
        windowOptions.titleBarStyle = 'hidden';
    } else if (isWin32() || isLinux()) {
        windowOptions.frame = false;
    }

    mainWindow = new BrowserWindow(windowOptions);

    if (isDev()) {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
        // react 开发工具
        /*    const reactDevToolsPath = path.join(
            // chrome 插件在电脑上的绝对路径
            ''
        )
        app.whenReady().then(async () => {
          await session.defaultSession.loadExtension(reactDevToolsPath, {allowFileAccess: true,});
          mainWindow.webContents.on('did-frame-finish-load', () => {
            mainWindow.webContents.once('devtools-opened', () => {
              mainWindow.webContents.focus();
            })
            mainWindow.webContents.openDevTools();
          });
        }).catch((err) => {});*/
    }

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // 点击关闭窗口按钮
    mainWindow.on('close', (e) => {
        if (process.platform === 'darwin' && !willQuitApp) {
            e.preventDefault();
            mainWindow.hide();
        }
    });
    // 其它状态变化
    listenWinStateEvents(mainWindow);
}

function initService () {
    WinService.getInstance().add(mainWindow);
}
