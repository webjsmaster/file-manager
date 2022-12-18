import { rename as renaming } from 'fs/promises'
import { OPERATION_ERROR } from '../utils/const.js';
import { transformArgs } from "../utils/transformArgs.js";

export async function rename (args) {
    const dir = transformArgs(args);

    try {
        await renaming(dir.one_file, dir.two_file);
        console.log(`File renamed to "${dir.arg_two}"`);
    } catch (error) {
        console.error(OPERATION_ERROR);
    }    
}