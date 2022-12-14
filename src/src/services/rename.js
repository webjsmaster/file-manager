import { rename as renaming } from 'fs/promises'
import { OPERATION_ERROR } from '../utils/const.js';
import { transformArgsAdd } from "../utils/transformArgs.js";

export async function rename (args) {
    const dir = transformArgsAdd(args);

    try {
        await renaming(dir.one_path, dir.two_path);
    } catch (error) {
        console.error(OPERATION_ERROR);
    }    
}