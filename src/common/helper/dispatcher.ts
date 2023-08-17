export class Dispatcher<key, Msg, Res> {
    private controllers: Map<key, Controller<key, Msg, Res>> = new Map();
    constructor(controllers?: Controller<key, Msg, Res>[]) {
        if (controllers !== undefined) this.register(controllers);
    }
    public register (controllers: Controller<key, Msg, Res>[]) {
        controllers.forEach((controller) => {
            this.controllers.set(controller.key, controller);
        })
    }
    public async dispatch(key: key, data: Msg, fail: () => Res): Promise<Res> {
        const controller = this.controllers.get(key);
        return controller !== undefined ? await controller.fun(data): fail();
    }
}

export interface Controller<T, U, V> {
    key: T;
    fun: (u: U) => Promise<V>
}
