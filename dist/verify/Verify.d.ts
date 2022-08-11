export default class Verify {
    protected static separator: string;
    protected static tag_email: string;
    protected static tag_gt: string;
    protected static tag_lt: string;
    protected static tag_gte: string;
    protected static tag_lte: string;
    protected static tag_in: string;
    protected static tag_between: string;
    protected static tag_lengthEq: string;
    protected static tag_lengthGt: string;
    protected static tag_lengthLt: string;
    protected static tag_lengthGte: string;
    protected static tag_lengthLte: string;
    protected static tag_lengthIn: string;
    protected static tag_lengthBetween: string;
    static tag_all: string[];
    static email: string;
    static matchEmail: (rule: string) => boolean;
    static isEmail: (val: any, rule: string) => boolean;
    static errEmail: (key_name: string, rule: string) => string;
    static gt: (count: number) => string;
    static matchGt: (rule: string) => boolean;
    static isGt: (val: any, rule: string) => boolean;
    static errGt: (key_name: string, rule: string) => string;
    static lt: (count: number) => string;
    static matchLt: (rule: string) => boolean;
    static isLt: (val: any, rule: string) => boolean;
    static errLt: (key_name: string, rule: string) => string;
    static gte: (count: number) => string;
    static matchGte: (rule: string) => boolean;
    static isGte: (val: any, rule: string) => boolean;
    static errGte: (key_name: string, rule: string) => string;
    static lte: (count: number) => string;
    static matchLte: (rule: string) => boolean;
    static isLte: (val: any, rule: string) => boolean;
    static errLte: (key_name: string, rule: string) => string;
    static in: (...nums: number[]) => string;
    static matchIn: (rule: string) => boolean;
    static isIn: (val: any, rule: string) => boolean;
    static errIn: (key_name: string, rule: string) => string;
    static between: (min: number, max: number) => string;
    static matchBetween: (rule: string) => boolean;
    static isBetween: (val: any, rule: string) => boolean;
    static errBetween: (key_name: string, rule: string) => string;
    static lengthEq: (count: number) => string;
    static matchLengthEq: (rule: string) => boolean;
    static isLengthEq: (val: any, rule: string) => boolean;
    static errLengthEq: (key_name: string, rule: string) => string;
    static lengthGt: (count: number) => string;
    static matchLengthGt: (rule: string) => boolean;
    static isLengthGt: (val: any, rule: string) => boolean;
    static errLengthGt: (key_name: string, rule: string) => string;
    static lengthLt: (count: number) => string;
    static matchLengthLt: (rule: string) => boolean;
    static isLengthLt: (val: any, rule: string) => boolean;
    static errLengthLt: (key_name: string, rule: string) => string;
    static lengthGte: (count: number) => string;
    static matchLengthGte: (rule: string) => boolean;
    static isLengthGte: (val: any, rule: string) => boolean;
    static errLengthGte: (key_name: string, rule: string) => string;
    static lengthLte: (count: number) => string;
    static matchLengthLte: (rule: string) => boolean;
    static isLengthLte: (val: any, rule: string) => boolean;
    static errLengthLte: (key_name: string, rule: string) => string;
    static lengthIn: (...nums: number[]) => string;
    static matchLengthIn: (rule: string) => boolean;
    static isLengthIn: (val: any, rule: string) => boolean;
    static errLengthIn: (key_name: string, rule: string) => string;
    static lengthBetween: (min: number, max: number) => string;
    static matchLengthBetween: (rule: string) => boolean;
    static isLengthBetween: (val: any, rule: string) => boolean;
    static errLengthBetween: (key_name: string, rule: string) => string;
}
//# sourceMappingURL=Verify.d.ts.map