export default class VerifyChs {

    static errEmail = (key_name: string) => key_name + "必须是邮箱格式";

    static errGt = (key_name: string, num: number) => key_name + "必须大于" + num.toString();

    static errLt = (key_name: string, num: number) => key_name + "必须小于" + num.toString();

    static errGte = (key_name: string, num: number) => key_name + "必须大于等于" + num.toString();

    static errLte = (key_name: string, num: number) => key_name + "必须小于等于" + num.toString();

    static errIn = (key_name: string, str: string) => key_name + "必须在" + str + "之中";

    static errBetween = (key_name: string, min: number, max: number) => key_name + "必须大于等于" + min.toString() + "，并且小于等于" + max.toString();

    static errLengthGt = (key_name: string, num: number) => key_name + "的长度必须大于" + num.toString();

    static errLengthLt = (key_name: string, num: number) => key_name + "的长度必须小于" + num.toString();

    static errLengthGte = (key_name: string, num: number) => key_name + "的长度必须大于等于" + num.toString();

    static errLengthLte = (key_name: string, num: number) => key_name + "的长度必须小于等于" + num.toString();

    static errLengthIn = (key_name: string, str: string) => key_name + "的长度必须在" + str + "之中";

    static errLengthBetween = (key_name: string, min: number, max: number) => key_name + "的长度必须大于等于" + min.toString() + "，并且小于等于" + max.toString();

}