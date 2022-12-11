import { resolve } from 'path'
import { INVALID_ERROR, OPERATION_ERROR } from '../utils/const.js';

export function cd(args) {
    let dir = args.join(' ')
    if (dir && dir !== 'cd'){
        try {
            process.chdir(resolve( process.cwd(), `${dir}`));
        } catch (error) {
            console.error(OPERATION_ERROR);
        }
    } else {
        console.error(INVALID_ERROR);
    }
}

