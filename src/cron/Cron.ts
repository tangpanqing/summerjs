import CronItem from "./CronItem";
import * as schedule from 'node-schedule';
import Context from "../Context";
import Request from "../request/Request";

export default class Cron {

    cron_list = [] as CronItem[];

    protected static instance: Cron;

    static getInstance = function (): Cron {
        if (Cron.instance) {
            return Cron.instance;
        } else {
            Cron.instance = new Cron();
            return Cron.instance;
        }
    }

    push(period: string, param: any, call: Function) {
        let cronItem = new CronItem(period, param, call);
        this.cron_list.push(cronItem);
    }

    run(exception_handle: Function) {
        let cron_list = Cron.getInstance().cron_list;
        for (let i = 0; i < cron_list.length; i++) {
            let period = cron_list[i].period;
            let param = cron_list[i].param;
            let call = cron_list[i].call;
            schedule.scheduleJob(period, async () => {
                //将参数加入请求
                let req = new Request();
                req.param = param;

                //构建上下文
                let ctx = new Context();
                ctx.request = req;

                try {
                    await call(ctx);
                    ctx.releaseConn();
                } catch (e) {
                    if (exception_handle) {
                        exception_handle(e, ctx);
                    } else {
                        throw new Error(e);
                    }
                }
            });
        }
    }

}
