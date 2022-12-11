import { OPERATION_ERROR } from "../utils/const.js";

export async function up ( ) {
    try {
        process.chdir('..');
    } catch (error) {
        console.error(OPERATION_ERROR);
    }
}