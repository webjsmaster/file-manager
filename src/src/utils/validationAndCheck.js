import { stat, readFile, access } from "fs/promises";

export async function validationAndCheck(dir1, dir2, file) {
    try {
        await readFile(dir1);
        await access(dir2);
        return await stat(file);
    } catch (error) {
        return error?.syscall;
    } 
}