import * as React from 'react'
import classNames from 'classnames'
import {URI_WINDOWS} from "../../../common/api/app";
import {useSelector} from "react-redux";
import {appState, AppStore, EnvStore} from "../../store/app_store";
import {sendProxy} from "../../utils/net_utils";
import {isWin32} from "../../utils/common_utils";

const closePath =
  'M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z'
const restorePath =
  'm 2,1e-5 0,2 -2,0 0,8 8,0 0,-2 2,0 0,-8 z m 1,1 6,0 0,6 -1,0 0,-5 -5,0 z m -2,2 6,0 0,6 -6,0 z'
const maximizePath = 'M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z'
const minimizePath = 'M 0,5 10,5 10,6 0,6 Z'

const renderButton = (
    name: string,
    onClick: React.EventHandler<React.MouseEvent<any>>,
    path: string
) => {
  const className = classNames('window-control', name)
  const title = name[0].toUpperCase() + name.substring(1)

  return (
      <button
          aria-label={name}
          title={title}
          tabIndex={-1}
          className={className}
          onClick={onClick}
          aria-hidden="true"
      >
        <svg aria-hidden="true" version="1.1" width="10" height="10">
          <path d={path} />
        </svg>
      </button>
  )
}

export function WindowControls () {
  const env = useSelector<AppStore, EnvStore>(state => state.envData);

  const onMinimize = () => {
    sendProxy(URI_WINDOWS, "minimize", appState.getMainWinId());
  }

  const onMaximize = () => {
    sendProxy(URI_WINDOWS, "maximize", appState.getMainWinId());
  }

  const onRestore = () => {
    sendProxy(URI_WINDOWS, "unmaximize", appState.getMainWinId());
  }

  const onClose = () => {
    sendProxy(URI_WINDOWS, "close", appState.getMainWinId());
  }

  if (!isWin32()) {
    return <span />
  }

  const min = renderButton('minimize', onMinimize, minimizePath)
  const maximizeOrRestore =
      env.winState === 'maximized'
          ? renderButton('restore', onRestore, restorePath)
          : renderButton('maximize', onMaximize, maximizePath)
  const close = renderButton('close', onClose, closePath)

  return (
      <div className="window-controls">
        {min}
        {maximizeOrRestore}
        {close}
      </div>
  )
}
