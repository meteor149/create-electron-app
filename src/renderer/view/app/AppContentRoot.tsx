import React, {useEffect} from "react";
import {
    HashRouter,
    Routes,
    Route,
    Navigate, useLocation
} from "react-router-dom";
import {ConfigProvider, Layout, message, notification} from "antd";
import {NavContent} from "../body/NavContent";

export function AppContentRoot() {
    return (
        <ConfigProvider
            theme={{
                token: {},
                components:{
                    Menu: {
                    }
                }
            }}
        >
            <div>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/app" />} />
                        <Route path="/app" element={<Navigate to={`/app/nav/:side_menu_first`} />} />
                        <Route path="/app/nav/:menu_key" element={ <NavContent /> } />
                    </Routes>
                </HashRouter>
            </div>
        </ConfigProvider>
    );
}
