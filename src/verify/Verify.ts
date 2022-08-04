export default class Verify {

    protected static separator: string = "|";

    protected static tag_email: string = "email";

    protected static tag_gt: string = "gt";
    protected static tag_lt: string = "lt";
    protected static tag_gte: string = "gte";
    protected static tag_lte: string = "lte";
    protected static tag_in: string = "in";
    protected static tag_between: string = "between";

    protected static tag_lengthGt: string = "lengthGt";
    protected static tag_lengthLt: string = "lengthLt";
    protected static tag_lengthGte: string = "lengthGte";
    protected static tag_lengthLte: string = "lengthLte";
    protected static tag_lengthIn: string = "lengthIn";
    protected static tag_lengthBetween: string = "lengthBetween";

    static tag_all: string[] = [
        Verify.tag_email,

        Verify.tag_gt,
        Verify.tag_lt,
        Verify.tag_gte,
        Verify.tag_lte,
        Verify.tag_in,
        Verify.tag_between,

        Verify.tag_lengthGt,
        Verify.tag_lengthLt,
        Verify.tag_lengthGte,
        Verify.tag_lengthLte,
        Verify.tag_lengthIn,
        Verify.tag_lengthBetween,
    ];

    static email = Verify.tag_email;
    static matchEmail = (rule: string) => rule == Verify.email;
    static isEmail = (val: any, rule: string) => val.toString().indexOf("@") != -1;
    static errEmail = (key_name: string, rule: string) => key_name + "必须是邮箱格式";

    static gt = (count: number) => Verify.tag_gt + Verify.separator + count.toString();
    static matchGt = (rule: string) => rule.split(Verify.separator)[0] == Verify.tag_gt;
    static isGt = (val: any, rule: string) => Number(val) > Number(rule.split(Verify.separator)[1]);
    static errGt = (key_name: string, rule: string) => key_name + "必须大于" + Number(rule.split(Verify.separator)[1]);

    static lt = (count: number) => Verify.tag_lt + Verify.separator + count.toString();
    static matchLt = (rule: string) => rule.split(Verify.separator)[0] == Verify.tag_lt;
    static isLt = (val: any, rule: string) => Number(val) < Number(rule.split(Verify.separator)[1]);
    static errLt = (key_name: string, rule: string) => key_name + "必须小于" + Number(rule.split(Verify.separator)[1]);

    static gte = (count: number) => Verify.tag_gte + Verify.separator + count.toString();
    static matchGte = (rule: string) => rule.split(Verify.separator)[0] == Verify.tag_gte;
    static isGte = (val: any, rule: string) => Number(val) >= Number(rule.split(Verify.separator)[1]);
    static errGte = (key_name: string, rule: string) => key_name + "必须大于等于" + Number(rule.split(Verify.separator)[1]);

    static lte = (count: number) => Verify.tag_lte + Verify.separator + count.toString();
    static matchLte = (rule: string) => rule.split(Verify.separator)[0] == Verify.tag_lte;
    static isLte = (val: any, rule: string) => Number(val) <= Number(rule.split(Verify.separator)[1]);
    static errLte = (key_name: string, rule: string) => key_name + "必须小于等于" + Number(rule.split(Verify.separator)[1]);

    static in = (...nums: number[]) => Verify.tag_in + Verify.separator + nums.join(Verify.separator);
    static matchIn = (rule: string) => rule.split(Verify.separator)[0] == Verify.tag_in;
    static isIn = (val: any, rule: string) => {
        let arr = rule.split(Verify.separator);
        arr.shift();
        return arr.indexOf(val.toString()) != -1;
    };
    static errIn = (key_name: string, rule: string) => {
        let arr = rule.split(Verify.separator);
        arr.shift();
        return key_name + "必须在" + arr.join(",") + "之中";
    };

    static between = (min: number, max: number) => Verify.tag_between + Verify.separator + min.toString() + Verify.separator + max.toString();
    static matchBetween = (rule: string) => rule.split(Verify.separator)[0] == Verify.tag_between;
    static isBetween = (val: any, rule: string) => Number(val) >= Number(rule.split(Verify.separator)[1]) && val <= Number(rule.split(Verify.separator)[2]);
    static errBetween = (key_name: string, rule: string) => key_name + "必须大于等于" + Number(rule.split(Verify.separator)[1]) + "，并且小于等于" + Number(rule.split(Verify.separator)[2]);

    static lengthGt = (count: number) => Verify.tag_lengthGt + Verify.separator + count.toString();
    static matchLengthGt = (rule: string) => rule.split(Verify.separator)[0] == Verify.tag_lengthGt;
    static isLengthGt = (val: any, rule: string) => val.toString().length > Number(rule.split(Verify.separator)[1]);
    static errLengthGt = (key_name: string, rule: string) => key_name + "的长度必须大于" + Number(rule.split(Verify.separator)[1]);

    static lengthLt = (count: number) => Verify.tag_lengthLt + Verify.separator + count.toString();
    static matchLengthLt = (rule: string) => rule.split(Verify.separator)[0] == Verify.tag_lengthLt;
    static isLengthLt = (val: any, rule: string) => val.toString().length < Number(rule.split(Verify.separator)[1]);
    static errLengthLt = (key_name: string, rule: string) => key_name + "的长度必须小于" + Number(rule.split(Verify.separator)[1]);

    static lengthGte = (count: number) => Verify.tag_lengthGte + Verify.separator + count.toString();
    static matchLengthGte = (rule: string) => rule.split(Verify.separator)[0] == Verify.tag_lengthGte;
    static isLengthGte = (val: any, rule: string) => val.toString().length >= Number(rule.split(Verify.separator)[1]);
    static errLengthGte = (key_name: string, rule: string) => key_name + "的长度必须大于等于" + Number(rule.split(Verify.separator)[1]);

    static lengthLte = (count: number) => Verify.tag_lengthLte + Verify.separator + count.toString();
    static matchLengthLte = (rule: string) => rule.split(Verify.separator)[0] == Verify.tag_lengthLte;
    static isLengthLte = (val: any, rule: string) => val.toString().length <= Number(rule.split(Verify.separator)[1]);
    static errLengthLte = (key_name: string, rule: string) => key_name + "的长度必须小于等于" + Number(rule.split(Verify.separator)[1]);

    static lengthIn = (...nums: number[]) => Verify.tag_lengthIn + Verify.separator + nums.join(Verify.separator);
    static matchLengthIn = (rule: string) => rule.split(Verify.separator)[0] == Verify.tag_lengthIn;
    static isLengthIn = (val: any, rule: string) => {
        let arr = rule.split(Verify.separator);
        arr.shift();
        return arr.indexOf(val.length) != -1;
    };
    static errLengthIn = (key_name: string, rule: string) => {
        let arr = rule.split(Verify.separator);
        arr.shift();
        return key_name + "的长度必须在" + arr.join(",") + "之中";
    };

    static lengthBetween = (min: number, max: number) => Verify.tag_lengthBetween + Verify.separator + min.toString() + Verify.separator + max.toString();
    static matchLengthBetween = (rule: string) => rule.split(Verify.separator)[0] == Verify.tag_lengthBetween;
    static isLengthBetween = (val: any, rule: string) => val.toString().length >= Number(rule.split(Verify.separator)[1]) && val.length <= Number(rule.split(Verify.separator)[2]);
    static errLengthBetween = (key_name: string, rule: string) => key_name + "的长度必须大于等于" + Number(rule.split(Verify.separator)[1]) + "，并且小于等于" + Number(rule.split(Verify.separator)[2]);

}