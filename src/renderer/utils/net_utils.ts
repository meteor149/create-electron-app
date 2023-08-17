
export function sendProxy<Res>(uri: string, type?: string, data?: any) {
    return window.nativeAPI.send<string, Res>(uri, { type, data })
}
