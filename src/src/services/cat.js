import { createReadStream } from 'fs';
import path from "path";
import { OPERATION_ERROR } from '../utils/const.js';




export async function cat (pathToDirectory) {
    return new Promise((resolve) => {
        const dir = path.isAbsolute(pathToDirectory)
            ? pathToDirectory
            : path.join(process.cwd(), pathToDirectory);
        
        const rs = createReadStream(dir, { encoding: "utf-8" });
        
        rs.on("data", async (chunk) => {
            process.stdout.write(chunk)
            console.log('');
        });
        
        rs.on("error", () => {
            resolve(console.log(OPERATION_ERROR));
        });

        rs.on("end", () => {
            resolve();
        });
    });
}