import { contextBridge, ipcRenderer } from 'electron';
import {IPC_LISTEN_CHANNEL_NAME, IPC_SEND_CHANNEL_NAME} from "../common/api/app";
import {Message, Result} from "../common/model/ipc";

contextBridge.exposeInMainWorld('nativeAPI', {
  listen: (callback: any) => {
    ipcRenderer.on(IPC_LISTEN_CHANNEL_NAME, callback);
  },
  removeListen: (callback: any) => {
    ipcRenderer.removeListener(IPC_LISTEN_CHANNEL_NAME, callback);
  },
  send: (uri: string, req: Message<any>): Promise<Result<any>> => {
    return ipcRenderer.invoke(IPC_SEND_CHANNEL_NAME, uri, req);
  }
});
