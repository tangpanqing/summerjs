export default class StringHelper {
    static toHump(name: string) {
        return name.replace(/\_(\w)/g, function (all, letter) {
            return letter.toUpperCase();
        });
    }

    static toLine(name: string) {
        let str = name.replace(/([A-Z])/g, "_$1").toLowerCase();
        if(str.slice(0,1)=="_") str = str.slice(1);
        return str;
    }
}