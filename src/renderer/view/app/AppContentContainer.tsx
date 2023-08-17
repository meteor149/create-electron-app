import React, {Component} from "react";
import { AppContentRoot } from "./AppContentRoot";
import { ErrorInfo } from "react-dom/client";


interface IViewContainerState {
    error: false,
    stack: ''
}

export class AppContentContainer extends Component<any, IViewContainerState>{
    constructor(props: any) {
        super(props)
        this.state = {
            error: false,
            stack: '',
        }
    }

    public componentWillMount() {
    }

    /**
     * 异常边界
     * @param error
     * @param errorInfo
     */
    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('componentDidCatch ->', `error msg: ${error.message}, error stack: ${error.stack}, errorInfo: ${errorInfo}`);
    }

    public componentWillUnmount() {
    }

    render() {
        return (
            <div style={{ display: "flex", width: "100%", position: "relative", overflow: "auto" }}>
                <AppContentRoot />
            </div>
        );
    }
}
