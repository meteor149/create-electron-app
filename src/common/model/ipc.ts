export interface Message<T> {
    type?: string,
    data?: T
}

export interface Result<T> {
    status: Status,
    data?: T
}

export enum Status {
    OK = 'OK',
    Fail = 'FAIL'
}
