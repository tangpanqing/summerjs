import * as fs from "fs";
import {PathLike} from "fs";

export default class FileHelper {
    static async move(fromPath: PathLike, toPath: PathLike) {
        let handle = function () {
            return new Promise((resolve, reject) => {
                let rs = fs.createReadStream(fromPath);
                let ws = fs.createWriteStream(toPath);
                rs.pipe(ws);
                rs.on("end", function () {
                    fs.unlinkSync(fromPath);
                    resolve(true);
                });
            });
        }

        return await handle();
    }
}
