import { transformArgs } from "../utils/transformArgs.js";
import { readFile } from "fs/promises"
import { errorMessage } from "../utils/const.js";
import { createHash } from "crypto"

export async function hash (args) {
    const dir = transformArgs(args);

    try {
        const file = await readFile(dir);
        const hash = createHash('sha256').update(file).digest('hex');
        console.log(hash);
    } catch (error) {
        errorMessage('File not find');
    }
}