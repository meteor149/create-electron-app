import {Action, combineReducers, createStore} from 'redux';
import {WindowState} from "../../common/model/env";
import {AppConstant} from "../models/app_constant";
import {Store} from "@reduxjs/toolkit";
import {StoreActionType} from "./app_store_constant";

export interface AppAction<T> extends Action<StoreActionType> {
    data: T
}

export interface EnvStore {
    winSize: {
        winWidth: number,
        winHeight: number,
    },
    winState: WindowState,
    winId: number,
    constant: AppConstant
}

const defaultEnvStore: EnvStore = {
    winSize: {
        winWidth: 0,
        winHeight: 0,
    },
    winState: "normal",
    winId: 0,
    constant: {
        APP_DATA_DIR: "",
        HOME_DIR: "",
        IS_DEV: false,
        PLATFORM: ""
    }
}

function envReducer(state: EnvStore = defaultEnvStore, action: AppAction<Partial<EnvStore>>) {
    return action.type === StoreActionType.ENV ? Object.assign({}, state, action.data) : state;
}

export interface AppStore {
    envData: EnvStore,
}

let appReducer = combineReducers({
    envData: envReducer,
})

export class AppState {
    private readonly appReduxStore: Store<AppStore, AppAction<any>>;
    public constructor() {
        this.appReduxStore = createStore(appReducer);
    }
    public getReduxStore () {
        return this.appReduxStore;
    }
    public getState (): AppStore {
        return this.appReduxStore.getState();
    }
    public dispatchEnv (action: AppAction<Partial<EnvStore>>) {
        this.appReduxStore.dispatch(action);
    }
    public getMainWinId () {
        return this.appReduxStore.getState().envData.winId;
    }
}

export const appState = new AppState();
