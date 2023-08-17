import { Provider } from "react-redux";
import { appState } from "../../store/app_store";
import { AppTitleBar } from "./AppTitleBar";
import { AppContentContainer } from "./AppContentContainer";
import React, { useEffect } from "react";
import {Message} from "../../../common/model/ipc";
import {listenDispatcher} from "../../ipc/listen_dispathcer";
import {StoreActionType} from "../../store/app_store_constant";

const onWinResize = async (e: any) => {
    let width = e.target.innerWidth;
    let height = e.target.innerHeight;
    await appState.dispatchEnv({
        type: StoreActionType.ENV,
        data: { winSize: { winWidth: width, winHeight: height } }
    });
}

async function eventCallBack (_: Electron.IpcRendererEvent,
                        key: string, msg: Message<any>) {
    await listenDispatcher.dispatch(key, msg);
}

export function App() {
    useEffect(() => {
        window.addEventListener('resize', onWinResize);
        window.nativeAPI.listen(eventCallBack);

        return () => {
            window.removeEventListener('resize', onWinResize);
            window.nativeAPI.removeListen(eventCallBack);
        }
    }, []);

    return (
        <React.StrictMode>
            <Provider store={appState.getReduxStore()}>
                <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    <AppTitleBar />
                    <AppContentContainer />
                </div>
            </Provider>
        </React.StrictMode>
    );
}
