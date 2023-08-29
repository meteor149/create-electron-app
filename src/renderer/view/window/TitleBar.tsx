import * as React from 'react'
import { WindowControls } from './WindowControls'
import {URI_WINDOWS} from "../../../common/api/app";
import {useSelector, useStore} from "react-redux";
import {appState, AppStore, EnvStore} from "../../store/app_store";
import Icon from '@ant-design/icons';
import KFCIcon from '../../res/svg/KFC.svg';
import "../../style/component/title-bar.less";
import {sendProxy} from "../../utils/net_utils";
import {isDarwin, isLinux, isWin32} from "../../utils/common_utils";

export function getTitleBarHeight() {
    if (isDarwin()) {
        return 26;
    }
    return 28
}

const getTitleBarStyle = (windowZoomFactor: number | undefined) => {
    const style: React.CSSProperties = { height: getTitleBarHeight() }

    if (isDarwin() && windowZoomFactor !== undefined) {
        style.zoom = 1 / windowZoomFactor
    }

    return style
}

interface ITitleBarProps {
    readonly titleBarStyle: 'light' | 'dark'
    readonly showAppIcon: boolean
    readonly windowZoomFactor?: number,
    readonly children?: React.ReactNode
}

export function TitleBar(props: ITitleBarProps) {
    const env = useSelector<AppStore, EnvStore>(state => state.envData);

    const onTitlebarDoubleClickDarwin = async () => {
        const actionOnDoubleClick = await sendProxy<string>(URI_WINDOWS, "double-click");

        switch (actionOnDoubleClick.data) {
            case 'Minimize':
                await sendProxy(URI_WINDOWS, "minimize", appState.getMainWinId());
                break
            case 'None':
                return
            default:
                const isMax = (await sendProxy(URI_WINDOWS, "is-maximized", appState.getMainWinId())).data;
                if (isMax) {
                    await sendProxy(URI_WINDOWS, "unmaximize", appState.getMainWinId());
                } else {
                    await sendProxy(URI_WINDOWS, "maximize", appState.getMainWinId());
                }
        }
    }

    const inFullScreen = env.winState === 'full-screen'
    const isMaximized = env.winState === 'maximized'

    const winControls = (isWin32() || isLinux()) && !inFullScreen ? <WindowControls /> : null

    const topResizeHandle =
        (isWin32() || isLinux()) && !isMaximized ? <div className="resize-handle top" /> : null

    const leftResizeHandle =
        (isWin32() || isLinux()) && !isMaximized ? <div className="resize-handle left" /> : null

    const titleBarClass =
        props.titleBarStyle === 'light' ? 'light-title-bar' : ''

    const appIcon = props.showAppIcon ? (
        <KFCIcon style={{width: "20px", height: "20px", margin: "6px"}} viewBox="0 0 300 300" />
    ) : null

    const onTitlebarDoubleClick = isDarwin()
        ? onTitlebarDoubleClickDarwin
        : undefined

    return (
        <div
            className={titleBarClass}
            id="desktop-app-title-bar"
            onDoubleClick={onTitlebarDoubleClick}
            style={getTitleBarStyle(props.windowZoomFactor)}
        >
            {topResizeHandle}
            {leftResizeHandle}
            {appIcon}
            {props.children}
            {winControls}
        </div>
    );
}
