export default class TimeHelper {
    static time() {
        let timestamp = new Date().getTime();
        return Math.floor(timestamp / 1000);
    }

    static milliTime() {
        let timestamp = new Date().getTime();
        return timestamp;
    }
}
