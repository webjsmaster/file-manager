import { writeFile } from "fs/promises"
import { OPERATION_ERROR } from "../utils/const.js";
import { transformArgs} from '../utils/transformArgs.js';

export async function add (args) {

    const dir = transformArgs(args)

    try {
        await writeFile(dir, '', { flag: 'wx'});
        console.log('File created');
    } catch (e) {
        console.error(OPERATION_ERROR);
    }
}