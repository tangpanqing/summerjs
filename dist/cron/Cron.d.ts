import CronItem from "./CronItem";
export default class Cron {
    cron_list: CronItem[];
    protected static instance: Cron;
    static getInstance: () => Cron;
    push(period: string, param: any, call: Function): void;
    run(exception_handle: Function): void;
}
//# sourceMappingURL=Cron.d.ts.map