import {TitleBar} from "../window/TitleBar";
import React from "react";

export function AppTitleBar () {
    return (
        <TitleBar
            showAppIcon={true}
            titleBarStyle={"dark"}
            windowZoomFactor={1}
        >
        </TitleBar>
    );
}
