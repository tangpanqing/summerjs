export default class Env {
    protected param_map: any;
    protected static instance: Env;
    static getInstance: () => Env;
    load(): void;
    protected getSep(): string;
    getParamMap(): any;
    getParam(key: string): any;
}
//# sourceMappingURL=Env.d.ts.map