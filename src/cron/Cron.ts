import CronItem from "./CronItem";
import * as schedule from 'node-schedule';
import DbPoolMap from "../db/DbPoolMap";

export default class Cron {

    cron_list = [] as CronItem[];

    static instance: Cron;

    static getInstance = function (): Cron {
        if (Cron.instance) {
            return Cron.instance;
        } else {
            Cron.instance = new Cron();
            return Cron.instance;
        }
    }

    push(period: string, call: Function) {
        let cronItem = new CronItem(period, call);
        this.cron_list.push(cronItem);
    }

    run(db_pool_map:DbPoolMap) {
        let cron_list = Cron.getInstance().cron_list;
        for (let i = 0; i < cron_list.length; i++) {
            let period = cron_list[i].period;
            let call = cron_list[i].call;
            schedule.scheduleJob(period, async () => await call(db_pool_map));
        }
    }

}
