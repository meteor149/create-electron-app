import {mLogger} from "../utils/log_utils";
import {appControllers} from "./app_controller";
import {Dispatcher} from "../../common/helper/dispatcher";
import {Message, Result, Status} from "../../common/model/ipc";

export class SendDispatcher extends Dispatcher<string, Message<any>, Result<any>>{
    private static readonly FAIL_RESPONSE: Result<void> = { status: Status.Fail };
    public async dispatch(key: string, data: Message<string>) {
        mLogger.info(`dispatch -> uri: ${key}, msg: ${data.type} ${data.data}`);
        return super.dispatch(key, data, () => SendDispatcher.FAIL_RESPONSE);
    }
}

export const sendDispatcher = new SendDispatcher();
sendDispatcher.register(appControllers);
