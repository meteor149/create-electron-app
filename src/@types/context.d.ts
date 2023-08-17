import {Message, Result} from "../common/model/ipc";

export interface IElectronAPI {
  // server to client
  listen: (callback: any) => void;
  removeListen: (callback: any) => void;
  // client to server
  send: <U, V>(uri: string, msg: Message<U>) => Promise<Result<V>>;
}

declare global {
  interface Window {
    nativeAPI: IElectronAPI;
  }
}

declare namespace Electron {
  type AppleActionOnDoubleClickPref = 'Maximize' | 'Minimize' | 'None'
  // 获取双击标题栏的默认行为
  interface SystemPreferences {
    getUserDefault(
        key: 'AppleActionOnDoubleClick',
        type: 'string'
    ): AppleActionOnDoubleClickPref
  }
}
