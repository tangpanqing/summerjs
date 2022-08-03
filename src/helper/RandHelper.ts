export default class RandHelper {
    static rand(min: number, max: number) {
        return min + Math.floor(Math.random() * (max - min));
    }
}