import {Controller} from "../../common/helper/dispatcher";
import {Message} from "../../common/model/ipc";
import {MSG_WIN_SIZE_CHANGED, MSG_WIN_STATE_CHANGED, URI_CONSTANT} from "../../common/api/app";
import {appState} from "../store/app_store";
import {WindowState} from "../../common/model/env";
import {StoreActionType} from "../store/app_store_constant";

export const winController: Controller<string, Message<any>, void>[] = [
    {
        key: MSG_WIN_STATE_CHANGED,
        fun: async (msg: Message<WindowState>) => {
            if(msg.data === undefined) return;
            appState.dispatchEnv({type: StoreActionType.ENV, data: {winState: msg.data}});
        }
    },
    {
        key: MSG_WIN_SIZE_CHANGED,
        fun: async (msg: Message<any>) => {
            appState.dispatchEnv({type: StoreActionType.ENV, data: {winSize: msg.data}});
        }
    }
]
