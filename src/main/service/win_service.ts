import {WindowState} from "../../common/model/env";
import {autoUpdater, BrowserWindow, systemPreferences} from "electron";
import {mainWindow} from "../index";

export class WinService {
    private static INSTANCE: WinService = new WinService();
    private windows: Map<number, BrowserWindow>;
    private constructor() {
        this.windows = new Map<number, BrowserWindow>();
    }
    public static getInstance (): WinService {
        return WinService.INSTANCE;
    }
    public getMainWindowId () {
        return mainWindow.id;
    }
    public add(window: BrowserWindow) {
        this.windows.set(window.id, window);
    }
    public closeWindows (id: number) {
        this.windows.get(id)?.close();
    }
    public hideWindows (id: number) {
        this.windows.get(id)?.hide();
    }

    public getWindowState(id: number): WindowState {
        if (this.windows.get(id)?.isFullScreen()) {
            return 'full-screen';
        } else if (this.windows.get(id)?.isMaximized()) {
            return 'maximized';
        } else if (this.windows.get(id)?.isMinimized()) {
            return 'minimized';
        } else if (!this.windows.get(id)?.isVisible()) {
            return 'hidden';
        } else {
            return 'normal';
        }
    }

    public destroy(id: number) {
        this.windows.get(id)?.destroy()
    }

    public quitAndInstallUpdate() {
        autoUpdater?.quitAndInstall()
    }

    public minimizeWindow(id: number) {
        this.windows.get(id)?.minimize()
    }

    public maximizeWindow(id: number) {
        this.windows.get(id)?.maximize()
    }

    public unmaximizeWindow(id: number) {
        this.windows.get(id)?.unmaximize()
    }

    public isMaximized(id: number) {
        return this.windows.get(id)?.isMaximized()
    }

    public getCurrentWindowZoomFactor(id: number) {
        return this.windows.get(id)?.webContents.zoomFactor
    }

    public setWindowZoomFactor(id: number, zoomFactor: number) {
        const window = this.windows.get(id);
        if (window !== undefined) window.webContents.zoomFactor = zoomFactor
    }

    public getDefaultDoubleClick (){
        return systemPreferences.getUserDefault('AppleActionOnDoubleClick', 'string');
    }
}
