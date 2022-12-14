import { createReadStream } from 'fs';
import path from "path";
import { OPERATION_ERROR } from '../utils/const.js';

export async function cat (args) {
    return new Promise((resolve) => {
        const trimArgs = args.join(' ').trim();
        const dir = path.resolve(trimArgs.toString())
        
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