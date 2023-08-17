import {URI_CONSTANT, URI_WINDOWS} from "../../common/api/app";
import {WinService} from "../service/win_service";
import {Controller} from "../../common/helper/dispatcher";
import {Message, Result, Status} from "../../common/model/ipc";
import { app } from 'electron';
import path from "path";
import {isDev} from "../utils/env_utils";
import * as process from "process";

export const appControllers : Controller<string, Message<number>, Result<any>>[] = [
    {
        key: URI_WINDOWS,
        fun: async  (msg: Message<number>) => {
            let res: any;
            switch (msg.type) {
                case "close":
                    WinService.getInstance().closeWindows(msg.data!);
                    break;
                case "minimize":
                    WinService.getInstance().minimizeWindow(msg.data!);
                    break;
                case "maximize":
                    WinService.getInstance().maximizeWindow(msg.data!);
                    break;
                case "unmaximize":
                    WinService.getInstance().unmaximizeWindow(msg.data!);
                    break;
                case "destroy":
                    WinService.getInstance().destroy(msg.data!);
                    break;
                case "main-window-id":
                    res = { winId: WinService.getInstance().getMainWindowId() };
                    break;
                case "window-state":
                    res = { winState: WinService.getInstance().getWindowState(msg.data!) };
                    break;
                case "double-click":
                    res = WinService.getInstance().getDefaultDoubleClick();
                    break;
                case "is-maximized":
                    WinService.getInstance().isMaximized(msg.data!);
                    break;
            }
            return { status: Status.OK, data: res }
        }
    },
    {
        key: URI_CONSTANT,
        fun: async  (msg: Message<any>) => {
            return {
                status: Status.OK,
                data: {
                    constant: {
                        HOME_DIR: app.getPath('home'),
                        APP_DATA_DIR: path.join(app.getPath('appData'), app.getName()),
                        IS_DEV: isDev(),
                        PLATFORM: process.platform
                    }
                }
            }
        }
    }
];
