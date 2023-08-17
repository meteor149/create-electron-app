import { WebContents } from "electron";
import {mLogger} from "./log_utils";

export function sendToClient(
    webContents: WebContents,
    channel: string,
    ...arg: any[]
): void {
    if (webContents.isDestroyed()) {
        const msg = `failed to send on ${channel}, webContents was destroyed`;
        mLogger.error(msg);
    } else {
        webContents.send(channel, ...arg);
    }
}
