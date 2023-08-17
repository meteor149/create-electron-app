import {Dispatcher} from "../../common/helper/dispatcher";
import {winController} from "./win_controller";
import {Message} from "../../common/model/ipc";

export class ListenDispatcher extends Dispatcher<string, Message<any>, void>{
    public async dispatch(key: string, msg: Message<any>) {
        await super.dispatch(key, msg, () => undefined);
    }
}

export const listenDispatcher = new ListenDispatcher();
listenDispatcher.register(winController);
