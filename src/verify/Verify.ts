export default class Verify {
    static required: string = "required";

    static email: string = "email";

    static max(count: number) {
        return "max:" + count.toString();
    }
}
