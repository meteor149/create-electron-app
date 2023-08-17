import log from 'electron-log';

export abstract class LogApi {
    public abstract log(...params: any[]) : void;
    public abstract warn(...params: any[]) : void;
    public abstract error(...params: any[]) : void;
    public abstract debug(...params: any[]) : void;
    public abstract info(...params: any[]) : void;
    public abstract verbose(...params: any[]) : void;
    public abstract silly(...params: any[]) : void;
}

export enum LogType {
    LOG,
    WARN,
    ERROR,
    DEBUG,
    INFO,
    VERBOSE,
    SILLY
}

export class MainLog extends LogApi {
    constructor(logPath?: string) {
        super();
        this.setLogPath(logPath);
    }
    public setLogPath (logPath?: string) {
        if (logPath !== undefined) log.transports.file.file = logPath;
    }
    public log(...params: any[]) : void {
        log.log(...params);
    }

    public warn(...params: any[]) : void {
        log.warn(...params);
    }
    public error(...params: any[]) : void{
        log.error(...params);
    }
    public debug(...params: any[]) : void {
        log.debug(...params);
    }
    public info(...params: any[]) : void {
        log.info(...params);
    }
    public verbose(...params: any[]) : void {
        log.verbose(...params);
    }
    public silly(...params: any[]) : void {
        log.silly(...params);
    }
}

export let mLogger = new MainLog();

export function formatDate(date: Date) {
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        '_' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join('-')
    );
}

function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}
